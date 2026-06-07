---
layout: home

hero:
  name: USB HID to BLE Bridge
  text: Turn wired into wireless
  tagline: ESP32-S3 based firmware that converts USB HID keyboards and mice into Bluetooth LE combo devices — now with BLE provisioning and device activation
  image:
    src: /logo.png
    alt: Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Web Flasher
      link: /flasher

features:
  - title: USB to BLE Conversion
    details: Plug any wired USB keyboard or mouse into the ESP32-S3 — it becomes a wireless Bluetooth LE HID device
  - title: Combo HID Bridge
    details: Supports both USB keyboard and mouse simultaneously, presented as a single composite HID device over BLE
  - title: Multi-Host Connection
    details: Single BLE identity, up to 3 hosts connected simultaneously, hotkey switching — no reboot or re-pairing needed
  - title: BLE Provisioning & Activation
    details: First-time setup via desktop app over BLE — ECDSA P-256 device activation + WiFi credential provisioning
  - title: Smooth Mouse Motion
    details: Ring buffer + timer-based resampling + residual compensation for lag-free, smooth cursor movement
  - title: LED Status Indicators
    details: RGB LED shows connection, advertising, and pairing status in real time, brightness adjustable 0-100%
---
