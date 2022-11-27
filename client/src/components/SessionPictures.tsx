import React, { useEffect, useState } from 'react'
import { Card, Modal, Row, Select, Typography } from 'antd'
import { getSession } from '../api'
import { ScrollToTop } from './ScrollToTop'

type Props = {
  clientId: string
}

export const SessionPictures = ({ clientId }: Props) => {
  const [urls, setUrls] = useState<string[] | null>(null)
  const [activeUrl, setActiveUrl] = useState<string | null>(null)
  const [focusPhotos, setFocusPhotos] = useState<string[]>(
    JSON.parse(window.localStorage.getItem('focusPhotos') || '[]'),
  )

  useEffect(() => {
    const get = async () => {
      if (urls && urls.length >= 89 * 1) {
        return
      }

      const { photos } = await getSession(clientId)
      if (photos.length) setUrls(photos)
    }

    const interval = setInterval(get, 250)

    return () => clearInterval(interval)
  }, [clientId, urls])

  const closeModal = () => setActiveUrl(null)

  const host =
    process.env.NODE_ENV === 'development' ? 'http://192.168.1.107:5000' : ''

  if (!urls?.length) return null

  const photos = urls.sort((a, b) =>
    a.split('_')[0].localeCompare(b.split('_')[0]),
  )

  const u = urls.length / 89

  const handleSelect = (v: string[]) => {
    console.log('SEelcted', v)
    window.localStorage.setItem('focusPhotos', JSON.stringify(v))
    setFocusPhotos(v)
  }

  const filteredPhotos = photos.filter((name) => {
    const num = name.split('_')[0]
    return focusPhotos.includes(num)
  })

  return (
    <>
      <Modal
        visible={!!activeUrl}
        onOk={closeModal}
        footer={null}
        onCancel={closeModal}
        width="50%"
      >
        <img
          width="100%"
          onClick={closeModal}
          src={`${host}/output/${clientId}/${activeUrl}`}
          alt="large modal"
        ></img>
      </Modal>
      <Row
        align="middle"
        justify="space-around"
        style={{ display: 'flex', width: '100%' }}
      >
        <Typography.Title style={{ margin: '0.5rem 1rem 0.7rem' }} level={3}>
          Session Pictures
        </Typography.Title>
        <Typography.Text>{urls.length}/ 89 loaded</Typography.Text>
        <Typography.Text>Select Featured Photos:</Typography.Text>

        <Select
          mode="multiple"
          allowClear
          placeholder="Please select featured"
          style={{ width: '35%' }}
          defaultValue={focusPhotos}
          value={focusPhotos}
          onChange={handleSelect}
        >
          {photos.map((name) => {
            const val = name.split('_')[0]
            return <Select.Option value={val}>{val}</Select.Option>
          })}
        </Select>
      </Row>

      <div className="loading-bar-container">
        <div
          className="loading-bar"
          style={{
            width: `${u * 100}%`,
            background: `hsl(${Math.floor(u * 120)}, 90%, 70%)`,
          }}
        ></div>
      </div>
      <div className="featured-photos" style={{ marginTop: '2rem' }}>
        {filteredPhotos.map((src) => (
          <img
            onClick={() => setActiveUrl(src)}
            src={`${host}/output/${clientId}/${src}`}
            alt="lol"
          />
        ))}
      </div>
      <div className="photo-wall">
        {photos.map((src) => (
          <Card key={src} className="photo" title={src.split('_')[0]}>
            <img
              onClick={() => setActiveUrl(src)}
              src={`${host}/output/${clientId}/${src}`}
              alt="lol"
            />
          </Card>
        ))}
      </div>
      <ScrollToTop />
    </>
  )
}
