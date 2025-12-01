import { Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";

<Button
  icon={<PrinterOutlined />}
  onClick={() => window.print()}
  style={{ marginBottom: 16 }}
>
  Print Page
</Button>
