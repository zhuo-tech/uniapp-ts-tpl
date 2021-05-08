export interface UserInfo {
  avatar: string | null
  nickname: string | null
  phone: string | null
}

export interface ApiResponseType<T> {
  code: number
  data: T
  msg: string
}
