"use client";
import { Menu } from "antd";
import { BookOutlined, DashboardOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const items = [
    {
      key: "/dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      onClick: () => router.push("/dashboard"),
    },
    {
      key: "/books",
      label: "Books",
      icon: <BookOutlined />,
      onClick: () => router.push("/books"),
    },
  ];

  return (
    <div
      style={{
        width: 230,
        background: "white",
        minHeight: "100vh",
        borderRight: "1px solid #eee",
        boxShadow: "2px 0 6px rgba(0,0,0,0.04)",
      }}
    >
      <Menu
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
        items={items}
      />
    </div>
  );
}
