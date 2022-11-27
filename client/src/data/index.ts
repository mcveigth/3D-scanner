import { Client } from '../types'

export const clients: Client[] = [
  {
    name: 'Elijah',
    email: 'elijah@elijah.com',
    phone: 4039876543,
    has_photos: false,
    address: '20 ave',
  },
  {
    name: 'Tanner',
    email: 'tanner@tanner.com',
    phone: 4031234567,
    has_photos: true,
    address: '20 ave',
  },
]
export const client: Client = clients[0]

export const session: { photos: string[] } = {
  photos: ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg'],
}
