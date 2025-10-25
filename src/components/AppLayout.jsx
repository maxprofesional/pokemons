import { Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./AppLayout.module.css";
const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: "/", label: "Главная" },
    { key: "/pokemons", label: "Покемоны" },
    { key: "/arena", label: "Арена" },
  ];

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoWhite}>Pokemons</span>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={(e) => navigate(e.key)}
          className={styles.menu}
        />
      </Header>

      <Content className={styles.content}>
        <div className={styles.contentBox}>
          <Outlet />
        </div>
      </Content>

      <Footer className={styles.footer}>Pokemons Bakytov Ulan 2025</Footer>
    </Layout>
  );
};

export default AppLayout;
