import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import AppSidebarFooter from "./AppSidebarFooter";
import Logo from "./Logo";
import styles from "./styles/Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <AppSidebarFooter />
    </div>
  );
}

export default Sidebar;
