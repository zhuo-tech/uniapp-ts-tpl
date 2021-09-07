export interface UserInfo {
  avatar: string
  nickname: string
  phone: string
}

export interface ApiResponseType<T> {
  code: number
  data: T
  msg: string
}
