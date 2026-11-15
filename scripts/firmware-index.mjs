#!/usr/bin/env node
/**
 * 固件版本索引工具
 * ------------------------------------------------------------
 * 把编译产物按版本落盘，并维护烧录页所需的 manifest 与版本索引。
 *
 *   node scripts/firmware-index.mjs add \
 *     --tag V3.1.0 --bin build/out.bin --source-commit <sha> [--built-at <iso>]
 *
 * 设计约定（见 issue #1）：
 *   - 固件文件名固定为  <stem>-<tag>.bin，版本段必须与 tag 逐字一致
 *   - 同一 tag 重复发布会覆盖该版本文件（issue #3），不影响 latest
 *   - 历史版本永久保留，不清理
 *   - 只接受合法的 ESP 合并镜像（offset 0），避免无法烧录
 */

import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FW_DIR = join(ROOT, 'docs/public/firmware')
const FLASHER_DIR = join(ROOT, 'docs/public/flasher')
const BIN_STEM = 'esp32s3-usb-hid-ble'
const DEVICE_NAME = 'ESP32S3 USB HID to BLE Bridge'

const TAG_RE = /^V\d+(\.\d+)+$/
const BIN_NAME_RE = new RegExp('^' + BIN_STEM + '-(V\\d+(?:\\.\\d+)+)\\.bin$')

// ESP 镜像校验常量
const ESP_IMAGE_MAGIC = 0xe9          // 首个字节
const PARTITION_MAGIC = 0x50aa        // 0x8000 处 2 字节（0xAA 0x50 的小端读数）
const APP_DESC_MAGIC = 0xabcd5432     // app 镜像 +0x20 处的 esp_app_desc_t magic
const APP_OFFSET = 0x10000

function die(msg) {
  console.error('::error::' + msg)
  process.exit(1)
}

function parseArgs(argv) {
  const out = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (next === undefined || next.startsWith('--')) out[key] = true
      else { out[key] = next; i++ }
    } else out._.push(a)
  }
  return out
}

/** 校验是否为可直接在 offset 0 烧录的合并镜像 */
export function assertMergedImage(buf, label = 'bin') {
  if (buf.length < APP_OFFSET + 0x40) die(label + ': 文件过小，不是合并镜像（' + buf.length + ' 字节）')
  if (buf[0] !== ESP_IMAGE_MAGIC) die(label + ': 首字节 0x' + buf[0].toString(16) + ' 不是 ESP 镜像 magic 0xe9')
  const pt = buf.readUInt16LE(0x8000)
  if (pt !== PARTITION_MAGIC) die(label + ': 0x8000 处不是分区表（读到 0x' + pt.toString(16) + '），可能是 app-only 镜像')
  const desc = buf.readUInt32LE(APP_OFFSET + 0x20)
  if (desc !== APP_DESC_MAGIC) die(label + ': 0x10020 处不是 app descriptor（读到 0x' + desc.toString(16) + '）')
  const version = buf.subarray(APP_OFFSET + 0x30, APP_OFFSET + 0x50).toString('utf8').split('\u0000')[0]
  return { version }
}

const tuple = (tag) => tag.replace(/^V/, '').split('.').map((n) => parseInt(n, 10))
function cmpDesc(a, b) {
  const ta = tuple(a.tag), tb = tuple(b.tag)
  const len = Math.max(ta.length, tb.length)
  for (let i = 0; i < len; i++) {
    const x = ta[i] ?? 0, y = tb[i] ?? 0
    if (x !== y) return y - x
  }
  return 0
}

function readJson(file, fallback) {
  if (!existsSync(file)) return fallback
  try { return JSON.parse(readFileSync(file, 'utf8')) } catch (e) { die(file + ' 解析失败: ' + e.message) }
}
function writeJson(file, data) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

function manifestFor(tag, binRelPath) {
  return {
    name: DEVICE_NAME,
    version: tag,
    builds: [
      {
        chipFamily: 'ESP32-S3',
        parts: [{ path: binRelPath, offset: 0 }],
      },
    ],
  }
}

function cmdAdd(args) {
  const tag = args.tag
  const bin = args.bin
  const sourceCommit = args['source-commit'] || ''
  const builtAt = args['built-at'] || new Date().toISOString()

  if (!tag || tag === true) die('缺少 --tag')
  if (!bin || bin === true) die('缺少 --bin')
  if (!TAG_RE.test(tag)) die('tag 格式非法（应形如 V3.1.0）: ' + tag)

  const binName = BIN_STEM + '-' + tag + '.bin'
  const m = BIN_NAME_RE.exec(binName)
  if (!m) die('固件文件名不符合规范: ' + binName)
  if (m[1] !== tag) die('文件名中的版本(' + m[1] + ')与 tag(' + tag + ')不一致')

  const buf = readFileSync(resolve(bin))
  const info = assertMergedImage(buf, binName)

  mkdirSync(FW_DIR, { recursive: true })
  mkdirSync(FLASHER_DIR, { recursive: true })

  const dest = join(FW_DIR, binName)
  copyFileSync(resolve(bin), dest)
  const sha256 = createHash('sha256').update(buf).digest('hex')

  // 该版本的独立 manifest
  writeJson(join(FLASHER_DIR, 'manifest-' + tag + '.json'), manifestFor(tag, '../firmware/' + binName))

  // 版本索引：同一 tag 覆盖，按版本号倒序
  const indexFile = join(FLASHER_DIR, 'versions.json')
  const index = readJson(indexFile, { latest: '', versions: [] })
  const entry = {
    tag,
    date: builtAt.slice(0, 10),
    built_at: builtAt,
    manifest: '/flasher/manifest-' + tag + '.json',
    bin: '/firmware/' + binName,
    sha256,
    source_commit: sourceCommit,
  }
  const others = (index.versions || []).filter((v) => v.tag !== tag)
  const versions = [...others, entry].sort(cmpDesc)
  const latest = versions[0].tag

  writeJson(indexFile, { latest, updated: builtAt, versions })
  // 未带版本的入口始终指向语义最新版，重建旧 tag 不会改变它
  writeJson(join(FLASHER_DIR, 'manifest.json'), manifestFor(latest, '../firmware/' + BIN_STEM + '-' + latest + '.bin'))

  const out = {
    tag,
    latest,
    file: 'docs/public/firmware/' + binName,
    sha256,
    embedded_version: info.version,
    versions_count: versions.length,
    overwritten: others.length !== (index.versions || []).length,
  }
  console.log(JSON.stringify(out, null, 2))
  if (info.version && info.version !== tag) {
    console.error('::warning::固件内嵌版本 ' + info.version + ' 与 tag ' + tag + ' 不一致')
  }
}

function cmdList() {
  const index = readJson(join(FLASHER_DIR, 'versions.json'), { latest: '', versions: [] })
  console.log('latest: ' + index.latest)
  for (const v of index.versions) console.log('  ' + v.tag + '  ' + v.date + '  ' + v.sha256.slice(0, 16) + '  ' + v.bin)
}

const args = parseArgs(process.argv.slice(2))
const cmd = args._[0]
if (cmd === 'add') cmdAdd(args)
else if (cmd === 'list') cmdList()
else {
  console.error('用法: node scripts/firmware-index.mjs <add|list> ...')
  process.exit(1)
}
