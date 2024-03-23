import "./globals.css";
import { EthereumProvider } from "../context/EthereumContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className=" bg-[#00a9f5] bg-sky-600">
        <EthereumProvider>{children}</EthereumProvider>
      </body>
    </html>
  );
}
