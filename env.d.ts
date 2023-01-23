declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string
      DISCLOUD_API_TOKEN: string
      OWNER_IDS: string[]
      LOGS: string
    }
  }
}

export { }