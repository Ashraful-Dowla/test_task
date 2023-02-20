import React, { useEffect, useState } from "react";

import {
  Checkbox,
  Form,
  Input,
  DatePicker,
  Button,
  Card,
  Select,
  Tree,
} from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formItemLayout, formItemLayoutWithOutLabel } from "../style";

import sectorData from "../../../Utils/sectorData.json";

import { api } from "../../../Utils/api";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Create = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [sector, setSector] = useState([]);

  const onSubmit = async (fieldsValue) => {
    fieldsValue.sector = sector;

    api
      .post("/list", fieldsValue)
      .then((res) => {
        toast.success("Successfully created");
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Failed");
      });
  };

  const onCheck = (checkedKeys, info) => {
    setSector(checkedKeys);
  };

  //   if (loading) return <Spinner />;
  return (
    <div className="form-layout">
      <div className="form-design-view">
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: "80%",
          }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Card
            title="Create"
            style={{ marginBottom: 10 }}
            className="resume__basic"
          >
            <Form.Item
              label="Name"
              name="name"
              {...formItemLayout}
              rules={[
                {
                  required: true,
                  message: "Please input your name",
                },
              ]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              label="Sector"
              name="sector"
              {...formItemLayout}
              rules={[
                {
                  validator: (_, value) => {
                    if (sector.length > 0) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Please select your sector");
                    }
                  },
                },
              ]}
            >
              <Tree checkable onCheck={onCheck} treeData={sectorData} />
            </Form.Item>
            <Form.Item
              label="Agree to Terms"
              name="terms_agreed"
              {...formItemLayout}
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: "Please agree the terms & conditions!",
                },
              ]}
            >
              <Checkbox />
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default Create;
