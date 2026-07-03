import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingQuoteButton from "./FloatingQuoteButton";
import MobileCallBar from "./MobileCallBar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <FloatingQuoteButton />
      <MobileCallBar />
    </div>
  );
};

export default Layout;
