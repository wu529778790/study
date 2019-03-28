import React from 'react'
import {
  Card,
  Form,
  Input,
  Button
} from 'antd'
const FormItem = Form.Item

export default class FormLogin extends React.Component {
  render() {
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem>
              <Input placeholder="请输入用密码"></Input>
            </FormItem>
            <FormItem>
              <Button>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}