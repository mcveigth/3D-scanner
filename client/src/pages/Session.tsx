import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { getClient, killSession, restartSession, startSession } from '../api'
import { SessionPictures } from '../components/SessionPictures'
import { StatusChip } from '../components/StatusChip'

import {
  Button,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Row,
  Typography,
} from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { Client } from '../types'

type Props = RouteComponentProps<{ clientId: string }>

export const Session = (props: Props) => {
  const history = useHistory()
  const { clientId } = props.match.params
  const [client, setClient] = useState<Client | null>(null)
  const [active, setActive] = useState(false)
  const [lightTime, setLightTime] = useState(
    parseInt(window.localStorage.getItem('lightTime') || '5000'),
  )

  const handleTimingUpdate = (n: number) => {
    window.localStorage.setItem('lightTime', n.toString())
    setLightTime(n)
  }

  const handleStartSession = async () => {
    message.loading('Photo sequence starting! Stand by...')
    await startSession(clientId, { light_time: lightTime })
    setActive(true)
  }

  const handleRestartSession = async () => {
    setActive(false)
    message.loading(
      'Deleting photos & restarting capture sequence! Stand by...',
    )
    await restartSession(clientId, { light_time: lightTime })
    setActive(true)
  }

  const handleExit = async () => {
    history.push('/')
  }

  const handleNuke = async () => {
    await killSession(clientId)
    message.success('Photos Deleted! Going back to dashboard')
    history.push('/')
  }

  useEffect(() => {
    const get = async () => {
      const client = await getClient(clientId)
      setClient(client)
      if (client.has_photos) setActive(true)
    }

    get()
  }, [clientId])

  return (
    <Content>
      <Typography.Title className="page-head" level={3}>
        Session View
      </Typography.Title>

      <Row className="client-info">
        <Typography.Text>
          <strong>Name:</strong> {client?.name}
        </Typography.Text>
        <Typography.Text>
          <strong>Email:</strong> {client?.email}
        </Typography.Text>
        <Typography.Text>
          <strong>Phone:</strong> {client?.phone}
        </Typography.Text>
        <Typography.Text>
          <strong>Address:</strong> {client?.address}
        </Typography.Text>
      </Row>
      <div className="toolbar">
        <Row justify="center" className="session-toolbar">
          <Button key="finish" onClick={handleExit}>
            Back To Dashboard
          </Button>
          <Button
            key="startsession"
            disabled={active}
            type="primary"
            onClick={handleStartSession}
          >
            Capture
          </Button>
          <Popconfirm
            disabled={!active}
            key="retry"
            title="Re-capture set?"
            onConfirm={handleRestartSession}
          >
            <Button type="default" disabled={!active}>
              Retry Capture
            </Button>
          </Popconfirm>
          <Popconfirm
            key="nuke"
            disabled={!active}
            title="Delete all photos and return to dashboard?"
            onConfirm={handleNuke}
          >
            <Button danger disabled={!active}>
              Abort Session
            </Button>
          </Popconfirm>

          <StatusChip poll={true} />
        </Row>
        <Row className="session-toolbar">
          <h3>Light Duration (ms)</h3>
          <InputNumber value={lightTime} onChange={handleTimingUpdate} />
          <Input
            className="slider"
            type="range"
            onChange={(e) => handleTimingUpdate(parseInt(e.target.value))}
            value={lightTime}
            min={500}
            max={10000}
            step={500}
          />
        </Row>
      </div>
      <Row className="controls">
        {active && <SessionPictures clientId={clientId} />}
      </Row>
    </Content>
  )
}
