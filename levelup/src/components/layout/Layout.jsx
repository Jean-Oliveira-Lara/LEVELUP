import Sidebar from "./Sidebar";
import Header from "./Header";

import "../../styles/layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;