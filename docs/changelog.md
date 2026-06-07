---
title: Changelog
---

# Changelog

## V3.0.0

**Architecture rewrite — BLE provisioning + activation:**
- First-time setup now uses ESP-IDF `network_provisioning` over BLE (Security 1 + PoP)
- Desktop app handles the entire provisioning flow: activation code (ECDSA P-256) + WiFi credentials
- Device enters provisioning mode automatically on first boot or factory reset
- Provisioning completes → device reboots → enters normal HID mode
- BLE advertisement Manufacturer Data embeds real MAC + activation/WiFi status flags (macOS workaround)

**New features:**
- ECDSA P-256 activation system — each device is bound to a unique activation code signed against its MAC address
- WiFi STA mode — automatic connection using stored credentials after provisioning
- `act-status` protocomm endpoint — desktop app can query activation state before sending code
- Desktop app provisioning flow: BLE discovery → protocomm handshake → activation → WiFi config

**Improvements:**
- Startup sequence restructured: NVS → PSA Crypto → provisioning check → BLE HID init
- WiFi credentials stored in custom NVS namespace (not ESP-IDF defaults)
- Provisioning BLE stack auto-released after completion (~110KB memory freed)
- Post-provisioning reboot ensures clean NimBLE state for HID initialization

**Migration from V2.x:**
- Factory reset required when upgrading from V2.x (provisioning and activation data are incompatible)
- Desktop app required for first-time setup (no longer possible to pair directly from OS Bluetooth settings)

---

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
