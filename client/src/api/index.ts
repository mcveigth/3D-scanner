import { Client, Timings } from '../types'
import axios from 'axios'
import { message } from 'antd'
import { Status } from '../components/StatusChip'

const dev = process.env.NODE_ENV === 'development'

if (dev) {
  const host = 'http://192.168.1.114'
  axios.defaults.baseURL = host
}

const mock = false

export const createClient = async (body: Omit<Client, 'has_photos'>) => {
  if (mock) return 'test'
  const res = await axios.post<{ client_id: string }>(`/api/clients`, body)
  return res.data.client_id
}

export const getClient = async (id: string): Promise<Client> => {
  if (mock)
    return {
      name: 'Test Client',
      has_photos: false,
      email: 'test@test.test',
      phone: 1234567890,
      address: '20 test',
      passcode: '123456',
    }
  const res = await axios.get<Client>(`/api/clients/${id}`)
  return res.data
}  
export const startSession = async (clientId: string, timings: Timings) => {
  try {
    const res = await axios.post(`/api/clients/${clientId}/session`, timings)
    return res.data
  } catch (err) {
    message.error('Something went wrong, check connection with the machine')
    return err
  }
}

export const getSession = async (clientId: string) => {
  const res = await axios.get<{ photos: string[] }>(
    `/api/clients/${clientId}/session`,
  )
  return res.data // session data
}

export const killSession = async (clientId: string) => {
  await axios.delete(`/api/clients/${clientId}/session`)
}

export const restartSession = async (clientId: string, timings: Timings) => {
  await killSession(clientId)
  await startSession(clientId, timings)
}

// TOOD: Get status

export const getStatus = async (): Promise<Status> => {
  const res = await axios.get<{ status: Status }>('/api/status')
  return res.data.status
}

// Someday

export const getClients = async (): Promise<Client[]> => {
  const res = await axios.get<Client[]>(`/api/clients`)
  return res.data
}

export const cleanup = () => {
  // send
}
