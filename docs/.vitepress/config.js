import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/ESP32S3-USB-HID-To-BLE-Releases/',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'esp-web-install-button'
        }
      }
    }
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'USB HID to BLE Bridge',
      description: 'Turn wired USB keyboards & mice into wireless BLE combo HID',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'Web Flasher', link: '/flasher' },
          { text: 'Changelog', link: '/changelog' }
        ],
        sidebar: {
          '/guide/': [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'LED Status', link: '/guide/led-status' },
            { text: 'Pairing & Switching', link: '/guide/pairing' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' }
          ]
        },
        editLink: {
          pattern: 'https://github.com/loommii/ESP32S3-USB-HID-To-BLE-Releases/edit/main/docs/:path'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'USB HID 转 BLE 桥接器',
      description: '将 USB 有线键盘鼠标通过 ESP32-S3 转换为蓝牙无线键鼠组合设备',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '指南', link: '/zh/guide/getting-started' },
          { text: 'Web 烧录', link: '/zh/flasher' },
          { text: '更新日志', link: '/zh/changelog' }
        ],
        sidebar: {
          '/zh/guide/': [
            { text: '首次使用', link: '/zh/guide/getting-started' },
            { text: 'LED 状态', link: '/zh/guide/led-status' },
            { text: '配对与切换', link: '/zh/guide/pairing' },
            { text: '常见问题', link: '/zh/guide/troubleshooting' }
          ]
        },
        editLink: {
          pattern: 'https://github.com/loommii/ESP32S3-USB-HID-To-BLE-Releases/edit/main/docs/:path'
        }
      }
    }
  },

  themeConfig: {
    logo: '/logo.png',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/loommii/ESP32S3-USB-HID-To-BLE-Releases' }
    ],

    footer: {
      message: 'Powered by ESP32-S3 + NimBLE',
      copyright: '© loommii'
    },

    search: {
      provider: 'local'
    }
  }
})
