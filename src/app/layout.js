import "./globals.css";
import { EthereumProvider } from "../context/EthereumContext";
import { ModalProvider } from "../context/ModalContext";
import Modal from "@/components/Modal";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-sky-600">
        <ModalProvider>
          <EthereumProvider>
            <Modal />
            {children}
          </EthereumProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
