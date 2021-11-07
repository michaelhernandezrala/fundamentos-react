import React from "react";
import Header from "./Header/Header";
import LayoutStyles from "./Layout.module.css";

function Layout({ children, title, ...props }) {
  return (
    <div className={LayoutStyles.layout}>
      <Header {...props} />
      <main>
        <div className="wrapper">
          <div className={LayoutStyles.layoutContent}>
            <h2>{title}</h2>
            <section>{children}</section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
