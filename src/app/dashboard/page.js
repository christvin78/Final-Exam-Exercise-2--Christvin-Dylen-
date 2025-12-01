"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { Row, Col, Card, Statistic, List, Progress } from "antd";

export default function DashboardPage() {
  const [total, setTotal] = useState(null);
  const [categories, setCategories] = useState([]);
  const [randomBook, setRandomBook] = useState(null);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(r => r.json())
      .then(d => {
        setTotal(d.total);
        setTopProducts(
          d.products
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5)
        );
      });

    fetch("https://dummyjson.com/products/categories")
      .then(r => r.json())
      .then(d => setCategories(d));

    fetch("https://dummyjson.com/products/1")
      .then(r => r.json())
      .then(d => setRandomBook(d));
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fa" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* HEADER */}
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>📊 Dashboard Overview</h2>
            <span style={{ opacity: 0.6 }}>Updated {new Date().toLocaleDateString()}</span>
          </div>

          {/* MAIN STATISTICS */}
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card hoverable style={{ borderRadius: 12 }}>
                <Statistic
                  title="📚 Total Books"
                  value={total ?? 0}
                  styles={{ content: { color: "#1677ff", fontSize: 32, fontWeight: 700 } }}
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card hoverable style={{ borderRadius: 12 }}>
                <Statistic
                  title="🏷️ Total Categories"
                  value={categories.length ?? 0}
                  styles={{ content: { color: "#eb2f96", fontSize: 32, fontWeight: 700 } }}
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card hoverable style={{ borderRadius: 12 }}>
                <Statistic
                  title="🔥 Random Book Rating"
                  value={randomBook?.rating ?? 0}
                  precision={1}
                  suffix="/5"
                  styles={{ content: { color: "#52c41a", fontSize: 32, fontWeight: 700 } }}
                />
              </Card>
            </Col>
          </Row>

          {/* TOP PRODUCTS & ACTIVITY */}
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Card title="🏆 Top 5 Highest Rated Products" style={{ borderRadius: 12 }}>
                {topProducts.length > 0 ? (
                  <List
                    dataSource={topProducts}
                    renderItem={(p) => (
                      <List.Item style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <b>{p.title}</b>
                        <Progress
                          percent={(p.rating / 5) * 100}
                          showInfo={false}
                          style={{ width: "100%" }}
                        />
                        ⭐ Rating: {p.rating}/5
                      </List.Item>
                    )}
                  />
                ) : (
                  "Loading..."
                )}
              </Card>
            </Col>

            <Col span={8}>
              <Card title="🕒 Activity Log" style={{ borderRadius: 12 }}>
                <List
                  dataSource={[
                    "Fetched products from API",
                    "Loaded categories list",
                    "Generated random book preview",
                    "Dashboard rendered successfully",
                  ]}
                  renderItem={(item) => <List.Item>• {item}</List.Item>}
                />
              </Card>
            </Col>
          </Row>

          {/* RANDOM BOOK PREVIEW */}
          <Card hoverable title="📖 Random Book Preview" style={{ borderRadius: 12 }}>
            {randomBook ? (
              <>
                <h3 style={{ margin: 0 }}>{randomBook.title}</h3>
                <p style={{ opacity: 0.8 }}>{randomBook.description}</p>
              </>
            ) : (
              "Loading..."
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
