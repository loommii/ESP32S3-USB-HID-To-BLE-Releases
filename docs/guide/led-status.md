# LED Status Reference

The on-board WS2812 RGB LED indicates the device status through color and blinking patterns.

## LED States

| State | Color | Description |
|-------|-------|-------------|
| USB disconnected | **Solid red** | No USB device plugged in or not ready |
| BLE advertising | **Blinking purple** | USB ready, waiting for host to connect |
| Connected | **Solid green** | USB + at least 1 BLE host connected, normal operation |
| Pairing code entry | **Solid purple** | Waiting for user to type the pairing code |
| Error | **Solid red** | USB communication error |

## Quick Reference

| Color | Meaning |
|-------|---------|
| 🔴 Red | USB issue (unplugged or error) |
| 🟣 Purple | Bluetooth activity (blinking = advertising, solid = pairing) |
| 🟢 Green | Normal operation (USB + BLE connected) |

> **Note**: Solid red can mean either "USB disconnected" or "error" — check if your USB device is properly connected and compatible.
