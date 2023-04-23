// info for this interface I got from token after success auth.Then environment and environment prod.
export interface Environment {
  apiKey: string
  production: boolean
  // url from database on firebase
  fbDbUrl: string
}
