export type Client = {
  name: string
  email: string
  phone: number
  has_photos: boolean
  address: string
  passcode: string
}

export type Session = {
  timestamp: number
}

export type Timings = {
  light_time: number // 5000
}
