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
import { useNavigate, useParams } from "react-router-dom";
import { formItemLayout, formItemLayoutWithOutLabel } from "../style";

import sectorData from "../../../Utils/sectorData.json";

import { api } from "../../../Utils/api";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Edit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  const [sector, setSector] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const onSubmit = async (fieldsValue) => {
    fieldsValue.sector = sector;
    fieldsValue.user_id = userData.id;

    let url = `/list/${id}`;
    api
      .put(url, fieldsValue)
      .then((res) => {
        toast.success("Successfully updated");
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Failed");
      });
  };

  const getDataById = async (id) => {
    let url = `/list?id=${id}`;
    api
      .get(url)
      .then((res) => {
        let val = res.data[0];
        form.setFieldsValue({
          name: val?.name,
          terms_agreed: val?.terms_agreed,
        });
        setSector(val?.sector);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataById(id);
  }, []);

  const onCheck = (checkedKeys) => {
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
            title="Edit"
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
              <Tree
                checkable
                onCheck={onCheck}
                treeData={sectorData}
                checkedKeys={sector}
              />
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

export default Edit;
