export interface ServersType {
  remote: string
  local: string
  timeout: number
}

export const SERVERS_MAIN: ServersType = {
  remote: 'https://yourails.com',
  local: 'http://127.0.0.1:3000',
  timeout: 10000,
}
