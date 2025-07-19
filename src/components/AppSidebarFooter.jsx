import styles from "./styles/Sidebar.module.css";

function AppSidebarFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
      </p>
    </footer>
  );
}

export default AppSidebarFooter;
