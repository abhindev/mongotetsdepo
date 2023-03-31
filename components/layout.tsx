import Navbar from "./template/navbar";
import Footer from "./template/footer";
import { useRouter } from "next/router";
const Layout = ({ children }: any) => {
  const router = useRouter();
  return (
    <>
      <div style={{ width: "100vw" }}>
        <div style={{ position: "fixed", width: "100vw", zIndex: 9, top: 0 }}>
          <Navbar />
        </div>
        <div
          style={{ marginTop: "100px" }}
          className={`page ${router.route === "/" ? "home" : ""}`}
        >
          {children}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
