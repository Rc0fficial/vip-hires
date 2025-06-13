// components/DeviceTracker.js
"use client";

import axios from "axios";

export const trackDevice = async (userId, rememberDevice = false, token, existingDevices = []) => {
  try {
    // Get more detailed device information
    const ipAddress = await getIPAddress();
    const deviceInfo = {
      deviceName: navigator.userAgent,
      browser: getBrowser(), // New function to detect specific browser
      deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) 
        ? "Mobile" 
        : "Desktop",
      os: getOS(),
      location: "Unknown",
      ipAddress: ipAddress,
      lastActive: new Date().toISOString(),
      isRemembered: rememberDevice,
      user: userId,
      uniqueId: await generateDeviceFingerprint() // New unique identifier
    };

    // Check if device already exists using multiple criteria
    const deviceExists = existingDevices.some(device => {
      // Match by uniqueId if available (most reliable)
      if (device.uniqueId && deviceInfo.uniqueId) {
        return device.uniqueId === deviceInfo.uniqueId;
      }
      
      // Fallback to combination of browser, OS and IP
      return (
        device.browser === deviceInfo.browser &&
        device.os === deviceInfo.os &&
        device.ipAddress === deviceInfo.ipAddress
      );
    });

    if (!deviceExists) {
      // Create new device if doesn't exist
      await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/devices`,
        { data: deviceInfo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      // Update existing device
      const existingDevice = existingDevices.find(device => 
        (device.uniqueId && device.uniqueId === deviceInfo.uniqueId) ||
        (device.browser === deviceInfo.browser && 
         device.os === deviceInfo.os &&
         device.ipAddress === deviceInfo.ipAddress)
      );

      if (existingDevice) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/devices/${existingDevice.documentId}`,
          { 
            data: { 
              lastActive: deviceInfo.lastActive,
              isRemembered: rememberDevice,
              ipAddress: deviceInfo.ipAddress // Update IP in case it changed
            } 
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    }
  } catch (error) {
    console.error("Device tracking error:", error);
  }
};

// New helper function to detect specific browser
const getBrowser = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  if (userAgent.includes("Edg")) return "Edge";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Firefox")) return "Firefox";
  return "Unknown";
};

// New helper function to generate device fingerprint
const generateDeviceFingerprint = async () => {
  try {
    const components = [
      navigator.userAgent,
      navigator.platform,
      navigator.hardwareConcurrency,
      screen.width + 'x' + screen.height,
      await getIPAddress()
    ];
    return components.join('|');
  } catch (e) {
    console.error("Fingerprint generation error:", e);
    return null;
  }
};

// Helper functions remain the same
const getOS = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac")) return "MacOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iOS") || userAgent.includes("iPhone")) return "iOS";
  return "Unknown";
};

const getIPAddress = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Failed to get IP address:", error);
    return "Unknown";
  }
};