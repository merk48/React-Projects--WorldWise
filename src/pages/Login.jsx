import { useEffect, useState } from "react";
import styles from "./styles/Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/authentication/fakeAuthenticationContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("mery@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    email && password && login(email, password);
  }

  useEffect(() => {
    isAuthenticated && navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={(e) => handleSubmit(e)}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
