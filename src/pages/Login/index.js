import { useDispatch } from "react-redux";
import { setCookie } from "../../helpers/cookie";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom"
import { checkLogin } from "../../actions/login";
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import "./Login.scss"
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    const email = e.email;
    const password = e.password;
    const response = await login(email, password);
    if (response.length > 0) {
      setCookie("id", response[0].id, 1);
      setCookie("fullName", response[0].fullName, 1);
      setCookie("email", response[0].email, 1);
      setCookie("token", response[0].token, 1);
      dispatch(checkLogin(true));
      navigate("/");
    }
    else {
      alert("Sai tai khoan hoac mat khau");
    }
  }

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };
  return (
    <>
      <Flex gap="middle" vertical align="center">
        <Form
            name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          onFinishFailed=""
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  )
}
export default Login;