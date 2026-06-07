# Troubleshooting

Common issues and how to resolve them.

## Device Won't Enter Normal Mode (Stuck in Provisioning)

**Possible causes:**
- Device not activated (no valid activation code)
- WiFi credentials not configured
- Provisioning failed or incomplete

**Try:**
1. Open the desktop app — it will detect the device and guide you through provisioning
2. If activation fails, verify you have the correct activation code for this device
3. If WiFi connection fails, check that the network is 2.4GHz (ESP32-S3 does not support 5GHz)
4. The device will keep retrying in provisioning mode — no timeout

## LED Shows Solid Red

**Possible causes:**
- No USB device is connected
- The USB device is not compatible
- USB communication error

**Try:**
1. Check that your keyboard/mouse is firmly connected
2. Try a different USB device
3. Power cycle the board (disconnect and reconnect power)

## Cannot Find "Loommii-HID" in Bluetooth Settings

**Possible causes:**
- The device is still in provisioning mode (blinking purple) — it must be provisioned first via the desktop app
- Maximum connections reached (3 hosts)
- Bluetooth interference

**Try:**
1. Check the LED — if it's blinking purple, the device needs provisioning. Open the desktop app to complete setup
2. If the LED is solid green, the board already has connections — you can still connect a new host (up to 3 total)
3. Power cycle the board
4. Move closer to the board

## Desktop App Cannot Discover Device

**Possible causes:**
- Device not in provisioning mode (not advertising BLE provisioning service)
- Bluetooth on your computer is disabled
- BLE range issue

**Try:**
1. Ensure the LED is blinking purple (provisioning mode)
2. Enable Bluetooth on your computer
3. Move the board closer to your computer
4. If the LED is solid green, the device is already provisioned — you can access it via WiFi LAN instead

## Pairing Code Not Appearing

Some hosts may take a few seconds to generate the pairing code. If it doesn't appear:

1. Make sure you selected the correct device name
2. Cancel and try pairing again
3. Try pairing with a different host (e.g., your phone) to isolate the issue

## Keyboard Input Not Working After Pairing

**Try:**
1. Unpair and re-pair the device
2. Check the LED status — is it showing a connected state?
3. Switch to a different connected host and back using `Scroll Lock + 1` / `2` / `3`

## Mouse Movement Is Jerky or Laggy

- Ensure you have a clear line of sight between the board and the host
- Reduce distance between the board and the host
- Check for Bluetooth interference from other devices

## Connection Drops Frequently

- Try moving the board closer to the host
- Check for USB power stability — a poor power supply can cause intermittent issues
- Try switching to a different connected host and back

## WiFi Not Connecting After Provisioning

**Possible causes:**
- Wrong WiFi password entered during provisioning
- 5GHz network (ESP32-S3 only supports 2.4GHz)
- Router too far from the board

**Try:**
1. Factory reset the device and re-provision with the correct WiFi credentials
2. Ensure you're connecting to a 2.4GHz network
3. Move the board closer to the router

## Web Flasher Shows "Failed to Fetch Manifest"

- Make sure you're using **Chrome or Edge** (Firefox and Safari do not support Web Serial)
- Ensure you're accessing the page over **HTTPS** (or localhost)
- Try a different USB cable — some cables are power-only and don't carry data

## Still Having Issues?

If you've tried the steps above and are still experiencing problems, please [open an issue](https://github.com/loommii/ESP32S3-USB-HID-To-BLE-Releases/issues) on GitHub.
