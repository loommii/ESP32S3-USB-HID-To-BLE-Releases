---
title: 更新日志
---

# 更新日志

## V3.0.2

**USB 冻结缓解 — 环缓冲 + 分发任务：**
- 确认为 ESP32-S3 DWC2 USB 控制器硬件设计缺陷（GitHub espressif/esp-idf#14996）
- HID 回调缩减到极致：只读原始数据 → memcpy 到无锁环缓冲，不做任何 IPC
- 新增 `hid_report_dispatcher` 分发任务，在独立上下文调用 bridge/mouse_accumulator
- 健康指标（report_count、max_interval_ms）移至分发任务更新
- 降低长时间运行时 USB IN 传输静默冻结的概率
- 版本号更新至 V3.0.2

---

## V3.0.1

**BLE 多连接稳定性修复：**
- `BT_NIMBLE_MSYS_1_BLOCK_COUNT` 从 12 恢复为 24（ESP32-S3 默认值），防止 mbuf 池耗尽
- 启用 `BT_NIMBLE_OPTIMIZE_MULTI_CONN`（乐鑫官方 ESP32-S3 多连接优化）
- 组合键（Scroll Lock + 1/2/3）切换槽位后不再向目标主机泄露数字键
- 移除 `led_poll` 轮询模块 — 跨主机的 CapsLock/NumLock/ScrollLock Output Report 争抢导致 mbuf 耗尽，键鼠转发不受影响
- BLE 连接建立时发送空 HID 报告，防止重连后卡键

---

## V3.0.0

**架构重写 — BLE 配网 + 设备激活：**
- 首次设置改用 ESP-IDF `network_provisioning`（BLE 传输 + Security 1 + PoP）
- 桌面 App 负责完整配网流程：激活码（ECDSA P-256 签名）+ WiFi 凭据
- 设备首次启动或恢复出厂后自动进入配网模式
- 配网完成 → 设备自动重启 → 进入正常 HID 模式
- BLE 广播 Manufacturer Data 嵌入真实 MAC + 激活/WiFi 状态标志（macOS 兼容方案）

**新增功能：**
- ECDSA P-256 激活系统 — 每台设备绑定唯一的激活码（基于 MAC 地址签名）
- WiFi STA 模式 — 配网后自动使用已存储的凭据连接路由器
- `act-status` protocomm 端点 — 桌面 App 可在发送激活码前查询设备激活状态
- 桌面 App 配网流程：BLE 发现 → protocomm 握手 → 激活 → WiFi 配置

**改进：**
- 启动顺序重构：NVS → PSA Crypto → 配网检查 → BLE HID 初始化
- WiFi 凭据存储在自定义 NVS 命名空间（不使用 ESP-IDF 默认路径）
- 配网 BLE 栈完成后自动释放（约 110KB 内存）
- 配网后重启确保 NimBLE 栈干净初始化

**从 V2.x 迁移：**
- 从 V2.x 升级需先恢复出厂设置（配网和激活数据不兼容）
- 首次设置必须使用桌面 App（不再支持从系统蓝牙设置直接配对）

---

## V2.2.0

**架构重写 — 多设备切换：**
- 单一 BLE 身份 "Loommii-HID"，最多 3 台主机同时连接
- 热键切换活跃目标（`Scroll Lock + 1/2/3`），无需重启
- 连接建立后主动请求 7.5ms~10ms 低延迟连接参数
- 鼠标定时器周期随连接间隔自适应，切换目标时同步更新
- LED 状态机简化为 5 种（红/紫闪烁/绿/紫常亮/红常亮）

**改进：**
- 绕过 esp_hidd 层，直接用 `ble_gatts_notify_custom()` 按连接句柄发送 HID 报告
- LED Output Report 轮询在目标切换时强制刷新

---

## V2.1.0

**新增功能：**
- LED 亮度可调（0-100%）
- 滚轮方向按 BLE 设备独立存储（标准/反向）
- OTA 固件升级（通过 WiFi 局域网）

**改进：**
- 移除键盘指示灯手动模式 — LED 始终由主机自动控制
- 架构审查修复（NVS 初始化、OTA 健壮性）

---

## V2.0.1

**提升连接稳定性**：USB 传输中断自动恢复，设备无响应时看门狗自动重启。

---

## V2.0.0

从 ESP32S3-USB-Keyboard-To-BLE 闭源分支，升级为键鼠组合 HID 桥接。

**新增功能：**
- USB 鼠标支持（运动累积引擎、HID Report Descriptor 解析器、Boot/Report 协议自适应）
- LED 状态扩展至 10 种
- 任务调度优化

---

## V1.1.1

错误修复及稳定性改进。

---

## V1.1.0

功能新增。

---

## V1.0.0

ESP32S3-USB-Keyboard-To-BLE 初始发布。

> **说明**：V2.0.0 起闭源。早期版本详情请查看[原始仓库](https://github.com/loommii/ESP32S3-USB-Keyboard-To-BLE)。
