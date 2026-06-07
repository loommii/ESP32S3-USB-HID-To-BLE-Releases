# LED Status Reference

The on-board WS2812 RGB LED indicates the device status through color and blinking patterns.

## LED States

| State | Color | Description |
|-------|-------|-------------|
| USB disconnected | **Solid red** | No USB device plugged in or not ready |
| BLE advertising | **Blinking purple** | USB ready, waiting for host to connect |
| Provisioning mode | **Blinking purple** | Device in BLE provisioning mode (first-time setup or factory reset) |
| Connected | **Solid green** | USB + at least 1 BLE host connected, normal operation |
| Pairing code entry | **Solid purple** | Waiting for user to type the pairing code |
| Target switching | **Green fast blink** | Active target switch in progress (momentary) |
| Error | **Solid red** | USB communication error |

## Quick Reference

| Color | Meaning |
|-------|---------|
| Red | USB issue (unplugged or error) |
| Purple (blinking) | Bluetooth activity — advertising, waiting for connection, or provisioning |
| Purple (solid) | Waiting for pairing code input |
| Green (solid) | Normal operation (USB + BLE connected) |
| Green (fast blink) | Target switch in progress |

> **Note**: Solid red can mean either "USB disconnected" or "error" — check if your USB device is properly connected and compatible.

> **Note**: Blinking purple appears in both normal BLE advertising mode and provisioning mode. If the device just powered on for the first time or after a factory reset, it is in provisioning mode — use the desktop app to complete setup.
