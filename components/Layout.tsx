import Nav from "./Nav";
import Footer from "./Footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const showNavFooter =
    router.asPath !== "/login" && router.asPath !== "/register";

  return (
    <div>
      {showNavFooter ? <Nav /> : ""}
      <div className="children">{children}</div>
      {showNavFooter ? <Footer /> : ""}
    </div>
  );
}
