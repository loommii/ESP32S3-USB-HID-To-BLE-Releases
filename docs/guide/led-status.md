# LED Status Reference

The on-board WS2812 RGB LED indicates the device status with 10 distinct states.

## LED States

| State | Color | Description |
|-------|-------|-------------|
| USB disconnected | **Solid red** | No USB device plugged in or not ready |
| Keyboard only, waiting for BLE | **Blinking purple** | USB keyboard ready, BLE advertising |
| Mouse only, waiting for BLE | **Blinking blue** | USB mouse ready, BLE advertising |
| Keyboard + mouse, waiting for BLE | **Blinking yellow** | Both USB devices ready, BLE advertising |
| Keyboard + BLE connected | **Solid green** | Normal operation |
| Mouse + BLE connected | **Solid blue** | Mouse-only mode |
| Keyboard + mouse + BLE connected | **Solid yellow** | Full connection mode |
| Pairing code entry | **Solid purple** | Waiting for user to type the pairing code |
| Switching | **Solid yellow** | Device slot switching in progress (reboot pending) |
| Error | **Solid red** | USB communication error |

## Quick Reference

| Color | Meaning |
|-------|---------|
| 🔴 Red | USB issue (unplugged or error) |
| 🟣 Purple | Keyboard active (blinking = advertising, solid = pairing) |
| 🔵 Blue | Mouse active (blinking = advertising, solid = connected) |
| 🟡 Yellow | Keyboard + mouse active |
| 🟢 Green | Keyboard connected via BLE |

> **Note**: Solid red can mean either "USB disconnected" or "error" — check if your USB device is properly connected and compatible.
