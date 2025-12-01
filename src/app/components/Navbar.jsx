"use client";
import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/dashboard" },
    { name: "Books", url: "/books" },
  ];

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {navItems.map((item) => (
        <Link key={item.url} href={item.url}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
