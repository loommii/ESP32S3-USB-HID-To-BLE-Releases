---
title: Changelog
---

# Changelog

## V3.0.2

**USB freeze mitigation — ring buffer + dispatcher:**
- Identified root cause as ESP32-S3 DWC2 USB controller HW erratum (GitHub espressif/esp-idf#14996)
- HID callback reduced to minimum: raw data read → memcpy to lock-free ring buffer, no IPC calls
- New `hid_report_dispatcher` task consumes ring buffer, calls bridge/mouse_accumulator in dedicated context
- Health metrics (report_count, max_interval_ms) moved out of callback to dispatcher
- Reduced probability of silent USB IN transfer freeze during extended operation
- Version bumped to V3.0.2

---

## V3.0.1

**BLE multi-connection stability fixes:**
- Increased `BT_NIMBLE_MSYS_1_BLOCK_COUNT` from 12 to 24 (restored ESP32-S3 default) to prevent mbuf pool exhaustion
- Enabled `BT_NIMBLE_OPTIMIZE_MULTI_CONN` (Espressif's official multi-connection optimization for ESP32-S3)
- Combo keys (Scroll Lock + 1/2/3) no longer leak digits to the target host after slot switching
- Removed the `led_poll` module — cross-host CapsLock/NumLock/ScrollLock Output Report conflict was causing mbuf exhaustion; keyboard HID forwarding is unaffected
- Empty HID report sent on BLE connection to prevent stuck keys after reconnect

---

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
