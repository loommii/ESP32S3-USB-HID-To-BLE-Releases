<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  lang: { type: String, default: 'en' },
  versionsPath: { type: String, default: '/flasher/versions.json' },
  fallbackManifest: { type: String, default: '/flasher/manifest.json' },
})

const dict = {
  en: {
    label: 'Firmware version',
    latest: 'latest',
    note: 'Requires Chrome or Edge on desktop with HTTPS.',
    unavailable: 'Could not load the version list — flashing the latest firmware instead.',
  },
  zh: {
    label: '固件版本',
    latest: '最新',
    note: '需要桌面版 Chrome 或 Edge 浏览器，并确保通过 HTTPS 访问。',
    unavailable: '版本列表加载失败 —— 将改为烧录最新固件。',
  },
}
const t = computed(() => dict[props.lang] || dict.en)

const versions = ref([])
const latestTag = ref('')
const selectedTag = ref('')
const status = ref('loading')
const host = ref(null)

// 默认回落到不带版本的入口，保证 versions.json 不可用时仍能烧录
const manifestUrl = computed(() => {
  const hit = versions.value.find((v) => v.tag === selectedTag.value)
  return withBase(hit ? hit.manifest : props.fallbackManifest)
})

// <esp-web-install-button> 是自定义元素，切换版本时必须重建节点才会重新初始化，
// 因此不用模板渲染，直接操作 DOM
async function renderButton() {
  if (!host.value) return
  const url = manifestUrl.value
  try {
    if (!customElements.get('esp-web-install-button')) {
      await Promise.race([
        customElements.whenDefined('esp-web-install-button'),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ])
    }
  } catch {
    /* 元素未定义也要继续，浏览器会在定义后自动升级 */
  }
  host.value.replaceChildren()
  const el = document.createElement('esp-web-install-button')
  el.setAttribute('manifest', url)
  host.value.appendChild(el)
}

watch(manifestUrl, renderButton)
onMounted(renderButton)

onMounted(async () => {
  try {
    const res = await fetch(withBase(props.versionsPath), { cache: 'no-cache' })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const data = await res.json()
    const list = (data.versions || []).filter((v) => v && v.tag && v.manifest)
    if (!list.length) throw new Error('empty version list')
    versions.value = list
    latestTag.value = list.some((v) => v.tag === data.latest) ? data.latest : list[0].tag
    selectedTag.value = latestTag.value
    status.value = 'ready'
  } catch {
    versions.value = []
    latestTag.value = ''
    selectedTag.value = ''
    status.value = 'error'
  }
})
</script>

<template>
  <div class="firmware-picker">
    <div v-if="versions.length > 1" class="picker-row">
      <label :for="'fw-version-' + lang">{{ t.label }}</label>
      <select :id="'fw-version-' + lang" v-model="selectedTag">
        <option v-for="v in versions" :key="v.tag" :value="v.tag">
          {{ v.tag }}{{ v.tag === latestTag ? ' (' + t.latest + ')' : '' }}
        </option>
      </select>
    </div>

    <div ref="host" class="install-host"></div>

    <p v-if="status === 'error'" class="picker-hint">{{ t.unavailable }}</p>
    <p class="picker-note">{{ t.note }}</p>
  </div>
</template>

<style scoped>
.firmware-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
.install-host {
  min-height: 2.5rem;
}
.picker-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: #cbd5e1;
}
.picker-row select {
  background: #0f172a;
  color: #e2e8f0;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  font-size: 0.9rem;
  cursor: pointer;
}
.picker-row select:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}
.picker-note {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: #999;
}
.picker-hint {
  margin: 0;
  font-size: 0.85rem;
  color: #fbbf24;
}
</style>
