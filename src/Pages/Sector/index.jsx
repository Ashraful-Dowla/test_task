import React, { useEffect, useState } from "react";
import { Tag, Button, Table } from "antd";
import { EditFilled, DeleteFilled, DatabaseFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { api } from "../../Utils/api";
import { toast } from "react-toastify";
import nextId from "react-id-generator";

import sectorData from "../../Utils/sectorData.json";

function Index(props) {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));

  const getList = async () => {
    let url = `/list?user_id=${userData.id}`;

    api
      .get(url)
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  const deleleItem = async (id) => {
    api
      .delete(`/list/${id}`)
      .then((res) => {
        toast.success("Successfully deleted");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Failed");
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      width: "65%",
      render: (row) => {
        let result = [];
        row.forEach((element) => {
          let arr = element.split("-");

          let node = sectorData;
          let len = arr.length;
          for (let i = 1; i + 1 < len; ++i) {
            node = node[parseInt(arr[i])].children;
          }
          result.push(node[parseInt(arr[len - 1])].title);
        });

        return result.map((item) => (
          <Tag
            key={nextId()}
            color="orange"
            style={{
              fontSize: 12,
              margin:2
            }}
          >
            {item}
          </Tag>
        ));
      },
    },
    {
      title: "Terms Agreed",
      dataIndex: "terms_agreed",
      key: "terms_agreed",
      width: "5%",
      render: (row) => {
        let text = row ? "Agreed" : "Disagreed";
        let colors = row ? "green" : "red";

        return (
          <Tag color={colors} key={row}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      render: (row) => {
        const { id } = row;
        return (
          <>
            <EditFilled onClick={() => navigate(`/edit/${id}`)} />
            <DeleteFilled
              onClick={() => {
                if (window.confirm("Are you sure you want to delete?")) {
                  deleleItem(id);
                }
              }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div>
        <Button type="primary" onClick={() => navigate("/create")}>
          Create
        </Button>
        <br />
        <br />
        <Table
          columns={columns}
          dataSource={list}
          loading={list == undefined}
          style={{ marginTop: 20 }}
          searchable
          scroll={{
            x: window.innerWidth < 1350 ? window.innerWidth : 0,
          }}
        />
      </div>
    </>
  );
}

export default Index;
