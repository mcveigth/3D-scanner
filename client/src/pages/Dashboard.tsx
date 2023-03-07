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
  passcode: string
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

    try{
    const client_id = await createClient({
      name: values.name,
      email: values.email,
      phone: parseInt(values.phone.replace(/\D/g, '')),
      address: values.address,
      passcode: values.passcode,
    })

    history.push(`/sessions/${client_id}`)
  } catch (error: any) {
    if(error.response && error.response.status === 401) {
      setError('the passcode you have provided has expired or is incorrect, to get a new passcode please contact @(stuff)')
    } else {
      setError(error.message);
    }
  }
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
        Please enter your information and the passcode that was sent to your email.<br></br> <i>If you did not received a passcode please contact us @(contact info)</i>.
        </Typography.Paragraph>
        <FormItem label="Email" name="email">
          <Input type="email" />
        </FormItem>

        <FormItem label="Passcode" name="passcode" rules={[{required: true, message: 'Please input your passcode'}]}>
          <Input maxLength={6}/>
        </FormItem>
        <FormItem label="Name" name="name">
          <Input minLength={3} />
        </FormItem>
        
        <FormItem label="Phone" name="phone">
          <Input type="tel" minLength={10} />
        </FormItem>
        <FormItem label="Address" name="address">
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
