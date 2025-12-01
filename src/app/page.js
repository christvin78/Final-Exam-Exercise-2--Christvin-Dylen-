"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { Layout, Button, Typography } from "antd";

export default function Home() {
  return (
    <Layout>
      <Navbar />
      <div style={{ padding: 40, textAlign: "center" }}>
        <Typography.Title>Final Exam Book Dashboard</Typography.Title>
        <Typography.Paragraph>
          Multi-Page • SSR • SSG • Dynamic Routing • Context • Ant Design
        </Typography.Paragraph>

        <Link href="/dashboard">
          <Button type="primary" size="large">Go to Dashboard</Button>
        </Link>
      </div>
    </Layout>
  );
}
