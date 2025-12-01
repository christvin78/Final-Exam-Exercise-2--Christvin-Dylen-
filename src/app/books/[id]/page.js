import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BookDetail from "../components/BookDetail";

export default async function BookDetailPage({ params }) {
  const { id } = params;
  const res = await fetch(`https://dummyjson.com/products/${id}`, { cache: "force-cache" });
  const product = await res.json();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <BookDetail data={product} />
      </div>
    </div>
  );
}
