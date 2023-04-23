export interface User{
  email: string
  password: string
  // returnSecureToken - property from Firebase (should be always true).After in result I'll have key:expiresIn of token
  returnSecureToken?: boolean
}
// interface of response from firebase(котрий отримуємо при успішній аворизації)
export interface FbAuthResponse{
  idToken: string
  // expiresIn - час, через який закінчиться сесія токену і потрібна буде повторна авторизація.
  expiresIn: string
}
export interface Post {
  id?: string,
  title: string,
  text: string,
  author: string
  date: Date
}
export interface FbCreateResponse {
  name: string
}
