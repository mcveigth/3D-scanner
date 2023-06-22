import React, {useEffect, useState} from 'react'
import {RouteComponentProps, useHistory} from 'react-router-dom'
import {getClient, killSession, restartSession, startSession, createClient} from '../api'
import {SessionPictures} from '../components/SessionPictures'
import {StatusChip} from '../components/StatusChip'

//for future testing
import {getStatus} from '../api'
//

import {
    Button,
    Input,
    InputNumber,
    message,
    Popconfirm,
    Row,
    Typography,
} from 'antd'
import {Content} from 'antd/lib/layout/layout'
import {HomeOutlined, CameraOutlined, PlusCircleOutlined, CloseCircleOutlined, ReloadOutlined} from '@ant-design/icons';
import {Client} from '../types'
import {clients} from "../data";

type Props = RouteComponentProps<{ clientId: string }>

export const Session = (props: Props) => {
    const history = useHistory()
    const {clientId} = props.match.params
    const [client, setClient] = useState<Client | null>(null)
    const [active, setActive] = useState(false)
    const [lightTime, setLightTime] = useState(
        parseInt(window.localStorage.getItem('lightTime') || '5000'),
    )
    //testing
    const [shot, setShot] = useState(false)
    const [status, setStatus] = useState(0)
    //
    const handleTimingUpdate = (n: number) => {
        window.localStorage.setItem('lightTime', n.toString())
        setLightTime(n)
    }

    const handleStartSession = async () => {
        message.loading('Photo sequence starting! Stand by...')
        await startSession(clientId, {light_time: lightTime})
        setActive(true)
    }

    const handleRestartSession = async () => {
        setActive(false)
        message.loading(
            'Deleting photos & restarting capture sequence! Stand by...',
        )
        await restartSession(clientId, {light_time: lightTime})
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

    const handleNew = async () => {
        const clientData = await getClient(clientId)
        const newClient_id = await createClient(clientData)

        const newTab = window.open(`/sessions/${newClient_id}`, '_blank')
        if (newTab) {
            newTab.focus()
        }
    }

    useEffect(() => {
        const get = async () => {
            const client = await getClient(clientId)
            setClient(client)
            if (client.has_photos) setActive(true)
            // testing
            const status = await getStatus()
            setStatus(status)
            if (status !== 0) setShot(true)
            // testing
        }

        get()
    }, [clientId, active]) //testing active

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
                    <Button key="finish" onClick={handleExit} icon={<HomeOutlined rev="home"/>}>
                        Back To Dashboard
                    </Button>
                    <Button
                        key="startsession"
                        disabled={active}
                        type="primary"
                        onClick={handleStartSession}
                        icon={<CameraOutlined rev="camera"/>}
                    >
                        Capture
                    </Button>
                    <Popconfirm
                        disabled={!active}
                        key="retry"
                        title="Re-capture set?"
                        onConfirm={handleRestartSession}
                    >
                        <Button type="default" disabled={!active} icon={<ReloadOutlined rev="reload"/>}>
                            Retry Capture
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        key="nuke"
                        disabled={!active}
                        title="Delete all photos and return to dashboard?"
                        onConfirm={handleNuke}
                    >
                        <Button danger disabled={!active} icon={<CloseCircleOutlined rev="close"/>}>
                            Abort Session
                        </Button>
                        <Button
                            onClick={handleNew}
                            icon={<PlusCircleOutlined rev="circle"/>}
                            //testing
                            disabled={shot}
                            // testing
                        >
                            New Shot
                        </Button>
                    </Popconfirm>

                    <StatusChip poll={true}/>
                </Row>
            </div>
            <Row className="controls">
                {active && <SessionPictures clientId={clientId}/>}
            </Row>
        </Content>
    )
}
