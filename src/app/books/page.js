import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BookTable from "../components/BookTable.jsx";

export default async function BooksPage() {
  const res = await fetch("https://dummyjson.com/products?limit=100", { cache: "no-store" });
  const { products } = await res.json();

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* HEADER SECTION */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📚 Books Collection
            </h2>

            <span style={{ opacity: 0.6, fontSize: "14px" }}>
              Updated {new Date().toLocaleDateString()}
            </span>
          </div>

          {/* TABLE SECTION */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <BookTable data={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
