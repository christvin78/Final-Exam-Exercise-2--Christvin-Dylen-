"use client";
import { useState, useMemo } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  InputNumber,
  Tag,
  Popconfirm,
  Descriptions,
  message,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

export default function BookTable({ data }) {
  const [search, setSearch] = useState("");
  const [softDeleted, setSoftDeleted] = useState([]);
  const [editing, setEditing] = useState(null);
  const [details, setDetails] = useState(null);
  const [form] = Form.useForm();

  /** FILTER DATA */
  const filtered = useMemo(() => {
    return data
      .filter((item) => !softDeleted.some((b) => b.id === item.id))
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  }, [search, softDeleted, data]);

  /** VIEW + EDIT */
  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue(record);
  };

  const saveEdit = () => {
    const values = form.getFieldsValue();
    const index = data.findIndex((b) => b.id === editing.id);
    Object.assign(data[index], values);
    setEditing(null);
    message.success("Book updated successfully");
  };

  /** SOFT DELETE */
  const deleteBook = (record) => {
    setSoftDeleted((prev) => [...prev, record]);
    message.warning(`"${record.title}" moved to history delete`);
  };

  /** RESTORE */
  const restoreBook = (id) => {
    setSoftDeleted((prev) => prev.filter((item) => item.id !== id));
    message.success("Book restored successfully");
  };

  /** TABLE COLUMNS */
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    { title: "Author", dataIndex: "brand" },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => (
        <Tag color="blue" style={{ fontSize: 14, padding: 5 }}>
          ${value}
        </Tag>
      ),
    },
    {
      title: "Actions",
      align: "center",
      width: 180,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Button icon={<EyeOutlined />} onClick={() => setDetails(record)} />

          <Button type="primary" icon={<EditOutlined />} onClick={() => openEdit(record)} />

          <Popconfirm
            title={`Delete "${record.title}"?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteBook(record)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* SEARCH BAR */}
      <Input
        placeholder="Search book by title..."
        allowClear
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ height: 40 }}
        prefix={<SearchOutlined />}
      />

      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        bordered
        style={{ borderRadius: 8 }}
      />

      {/* VIEW DETAIL MODAL */}
      <Modal
        title="Book Detail"
        open={!!details}
        onCancel={() => setDetails(null)}
        footer={null}
      >
        {details && (
          <Descriptions bordered size="middle" column={1}>
            <Descriptions.Item label="Title">{details.title}</Descriptions.Item>
            <Descriptions.Item label="Author">{details.brand}</Descriptions.Item>
            <Descriptions.Item label="Price">
              <Tag color="blue">${details.price}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="ID">{details.id}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color="green">Active</Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        title="Edit Book"
        open={!!editing}
        okText="Save Changes"
        onCancel={() => setEditing(null)}
        onOk={saveEdit}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input placeholder="Book Title" />
          </Form.Item>
          <Form.Item label="Author" name="brand" rules={[{ required: true }]}>
            <Input placeholder="Author Name" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="Price" />
          </Form.Item>
        </Form>
      </Modal>

      {/* HISTORY DELETE */}
      {softDeleted.length > 0 && (
        <div style={{ paddingTop: 10 }}>
          <h3>
            🗂 History Deleted{" "}
            <Tag color="volcano" style={{ fontSize: 13 }}>
              {softDeleted.length} items
            </Tag>
          </h3>

          <Table
            dataSource={softDeleted}
            rowKey="id"
            bordered
            pagination={false}
            columns={[
              { title: "Title", dataIndex: "title" },
              { title: "Author", dataIndex: "brand" },
              {
                title: "Price",
                dataIndex: "price",
                render: (v) => <Tag color="orange">${v}</Tag>,
              },
              {
                title: "Action",
                align: "center",
                render: (_, rec) => (
                  <Popconfirm
                    title="Restore this book?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => restoreBook(rec.id)}
                  >
                    <Button icon={<RollbackOutlined />}>Restore</Button>
                  </Popconfirm>
                ),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
