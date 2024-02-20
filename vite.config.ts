import {defineConfig} from 'vite'
import {VitePWA} from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({
      mode: "production",
      manifest: {
        // caches the assets/icons mentioned (assets/* includes all the assets present in your src/ directory)
        //includeAssets: ["favicon.ico", "apple-touch-icon.png", "assets/*"],
        name: 'Silinet HelpDesk',
        short_name: 'Silinet HD',
        start_url: '.',
        id: '/',
        "display": "standalone",
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/images/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/images/maskable_icon.png',
            sizes: '192x192',
            type: 'image/png',
            "purpose": "maskable"
          }
        ],
        screenshots: [
      {
        "src": "/images/screenshot.png",
        "type": "image/png",
        "sizes": "540x720",
        "form_factor": "narrow"
      },
          {
            "src": "/images/screenshot.png",
            "type": "image/png",
            "sizes": "540x720",
            "form_factor": "wide"
          }
    ]
      },
        registerType: 'autoUpdate',
        workbox: {
            clientsClaim: true,
            skipWaiting: true,
            globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,txt,woff,woff2,webmanifest}"]
        }
    })],
})
