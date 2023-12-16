/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly APP_TITLE: string
    readonly VITE_APP_API_URL: string
    readonly VITE_APP_API_KEY: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }