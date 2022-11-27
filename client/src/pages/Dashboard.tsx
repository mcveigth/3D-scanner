import React from 'react'
import { Button, Divider, Form, Input, message, Row, Typography } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import { Content } from 'antd/lib/layout/layout'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createClient } from '../api'

type FormData = {
  name: string
  email: string
  phone: string
  address: string //added address
}

export const Dashboard = () => {
  const history = useHistory()
  const [error, setError] = useState<string | null>(null)
  const [form] = Form.useForm<FormData>()

  const handleReset = () => {
    form.resetFields()
  }

  const handleSubmit = async (values: FormData) => {
    if (values.phone.length < 10) {
      // helpful message
      message.error('Check all fields!')
      setError('Phone number needs to be a length of at least 10')
      return
    }

    const client_id = await createClient({
      name: values.name,
      email: values.email,
      phone: parseInt(values.phone.replace(/\D/g, '')),
      address: values.address, //error for some reason omit client something
    })

    history.push(`/sessions/${client_id}`)
  }

  return (
    <Content>
      <Typography.Title className="page-head" level={3}>
        Dashboard
      </Typography.Title>
      <Divider />
      <Form
        form={form}
        className="dashboard-form"
        onFinish={handleSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Typography.Paragraph style={{ textAlign: 'center' }}>
          Enter the name, email and phone number of the subject
        </Typography.Paragraph>
        <FormItem label="name" name="name">
          <Input minLength={3} />
        </FormItem>
        <FormItem label="email" name="email">
          <Input type="email" />
        </FormItem>
        <FormItem label="phone" name="phone">
          <Input type="tel" minLength={10} />
        </FormItem>
        <FormItem label="address" name="address">
          <Input type="address" />
        </FormItem>
        <Row justify="space-between">
          <Button danger onClick={handleReset}>
            Reset
          </Button>
          <Button htmlType="submit" type="primary">
            Start Session
          </Button>
        </Row>
        {error && <p className="error">{error}</p>}
      </Form>
    </Content>
  )
}
