---
layout: home

hero:
  name: USB HID 转 BLE 桥接器
  text: 有线变无线
  tagline: 基于 ESP32-S3 的固件，将 USB 有线键盘和鼠标转换为蓝牙（BLE）无线键鼠组合设备
  image:
    src: /logo.png
    alt: Logo
  actions:
    - theme: brand
      text: 开始使用
      link: /zh/guide/getting-started
    - theme: alt
      text: Web 烧录
      link: /zh/flasher

features:
  - title: USB 转 BLE 转换
    details: 将任意 USB 有线键盘或鼠标插入 ESP32-S3 — 它就变成了一个无线蓝牙 LE HID 设备
  - title: 键鼠组合桥接
    details: 同时支持 USB 键盘和鼠标，BLE 端呈现为单一组合 HID 设备
  - title: 多设备同时连接
    details: 单一 BLE 身份，最多 3 台主机同时连接，热键瞬间切换 — 无需重启或重新配对
  - title: 鼠标运动平滑
    details: 环形缓冲区 + 定时器重采样 + 残差补偿，确保鼠标移动流畅无卡顿
  - title: LED 状态指示
    details: RGB LED 实时显示连接、广播和配对状态，亮度 0-100% 可调
  - title: 键盘输入配对码
    details: 配对码直接在 USB 键盘上输入 — 无需屏幕或其他按键
---
