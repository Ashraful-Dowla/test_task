import { useEffect } from "react";
import { Checkbox, Form, Input, DatePicker, Button, Card } from "antd";
import "./style.css";
import { api } from "../../../Utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    let url = `/user?email=${values.email}&password=${values.password}`;
    api
      .get(url)
      .then((res) => {
        if (res.data.length > 0) {
          localStorage.setItem("userData", JSON.stringify(res.data[0]));
          toast.success("Successfully login");
          navigate("/dashboard");
        } else {
          toast.error("Invalid Email or Password");
        }
      })
      .catch((error) => {
        toast.error("Invalid Email or Password");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {/* <div className="illustration-wrapper">
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div> */}
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Please input your valid email!",
              },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
