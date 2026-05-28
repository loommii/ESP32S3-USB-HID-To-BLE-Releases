# Troubleshooting

Common issues and how to resolve them.

## LED Shows Solid Red

**Possible causes:**
- No USB device is connected
- The USB device is not compatible
- USB communication error

**Try:**
1. Check that your keyboard/mouse is firmly connected
2. Try a different USB device
3. Power cycle the board (disconnect and reconnect power)

## Cannot Find "Loommii-HID-01" in Bluetooth Settings

**Possible causes:**
- The board is not in advertising mode
- The board is already connected to another host
- Bluetooth interference

**Try:**
1. Wait for the LED to change from solid red to a blinking pattern
2. If the LED is solid green/blue/yellow, the board is already connected — disconnect from the paired host first
3. Power cycle the board to force it into advertising mode
4. Move closer to the board

## Pairing Code Not Appearing

Some hosts may take a few seconds to generate the pairing code. If it doesn't appear:

1. Make sure you selected the correct device name
2. Cancel and try pairing again
3. Try pairing with a different host (e.g., your phone) to isolate the issue

## Keyboard Input Not Working After Pairing

**Try:**
1. Unpair and re-pair the device
2. Check the LED status — is it showing a connected state?
3. Switch to a different slot and switch back using `Scroll Lock + 1`

## Mouse Movement Is Jerky or Laggy

- Ensure you have a clear line of sight between the board and the host
- Reduce distance between the board and the host
- Check for Bluetooth interference from other devices

## Connection Drops Frequently

- Try moving the board closer to the host
- Check for USB power stability — a poor power supply can cause intermittent issues
- Try switching to a different slot and back (firmware auto-recovery will attempt reconnection)

## Web Flasher Shows "Failed to Fetch Manifest"

- Make sure you're using **Chrome or Edge** (Firefox and Safari do not support Web Serial)
- Ensure you're accessing the page over **HTTPS** (or localhost)
- Try a different USB cable — some cables are power-only and don't carry data

## Still Having Issues?

If you've tried the steps above and are still experiencing problems, please [open an issue](https://github.com/loommii/ESP32S3-USB-HID-To-BLE-Releases/issues) on GitHub.
