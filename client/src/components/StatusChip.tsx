import { Tag } from 'antd'
import { PresetColorType } from 'antd/lib/_util/colors'
import { useEffect, useState } from 'react'
import { getStatus } from '../api'

export enum Status {
  'Standing By...',
  'Warming Up...',
  'Capturing Photo',
  'Capturing Grid',
  'Writing To Disk',
  'Downloading!',
}

const colors: Partial<PresetColorType>[] = [
  'lime',
  'gold',
  'volcano',
  'magenta',
  'geekblue',
]

type Props = {
  poll: boolean
}

export const StatusChip = ({ poll }: Props) => {
  const [status, setStatus] = useState<Status>(Status['Standing By...'])

  useEffect(() => {
    const get = async () => {
      if (!poll) return
      const status = await getStatus()
      setStatus(status)
    }

    const interval = setInterval(get, 1000 / 4)

    return () => clearInterval(interval)
  }, [poll])

  return (
    <Tag color={colors[status]} style={{ display: 'flex' }}>
      <span style={{ margin: 'auto' }}>{Status[status]}</span>
    </Tag>
  )
}
