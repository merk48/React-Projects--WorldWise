import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Homepage() {
  return (
    <div>
      <PageNav></PageNav>
      <AppNav />
      <h1>Home</h1>

      <Link to="/app">app</Link>
    </div>
  );
}

export default Homepage;
