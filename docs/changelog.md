---
title: Changelog
---

# Changelog

## V2.2.0

**Architecture rewrite — multi-device switching:**
- Single BLE identity "Loommii-HID", up to 3 hosts connected simultaneously
- Hotkey switching between active targets (`Scroll Lock + 1/2/3`), no reboot required
- Actively requests 7.5ms–10ms low-latency connection parameters on connection
- Mouse timer period adapts to connection interval, synced on target switch
- LED state machine simplified to 5 states (red / blinking purple / green / solid purple / solid red)

**Improvements:**
- Bypasses esp_hidd layer, sends HID reports directly via `ble_gatts_notify_custom()` with per-connection handle
- LED Output Report polling force-refreshes on target switch

---

## V2.1.0

**New features:**
- LED brightness adjustable (0-100%)
- Scroll wheel direction per BLE slot (standard/reversed)
- OTA firmware upgrade over WiFi LAN

**Improvements:**
- Removed keyboard LED manual mode — LEDs always controlled by host automatically
- Architecture review fixes (NVS initialization, OTA robustness)

---

## V2.0.1

**Improved connection stability**: automatic recovery from USB transfer interruptions and unresponsive device watchdog with self-restart.

---

## V2.0.0

Closed-source fork from ESP32S3-USB-Keyboard-To-BLE, upgraded to a combo keyboard+mouse HID bridge.

**New features:**
- USB mouse support (motion accumulator engine, HID Report Descriptor parser, Boot/Report protocol auto-switching)
- LED states expanded to 10
- Task scheduling optimizations

---

## V1.1.1

Bug fixes and stability improvements.

---

## V1.1.0

Feature additions.

---

## V1.0.0

Initial release of ESP32S3-USB-Keyboard-To-BLE.

> **Note**: V2.0.0+ is closed-source. Earlier version details are available in the [original repository](https://github.com/loommii/ESP32S3-USB-Keyboard-To-BLE).
