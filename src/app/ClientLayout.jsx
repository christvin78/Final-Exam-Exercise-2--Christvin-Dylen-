"use client";
import { ConfigProvider, theme as antdTheme } from "antd";
import { AppContextProvider } from "./Context/AppContext";

export default function ClientLayout({ children }) {
  return (
    <AppContextProvider>
      <ConfigProvider
        theme={{
          algorithm: antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </AppContextProvider>
  );
}
