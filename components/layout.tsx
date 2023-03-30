import Navbar from "./template/navbar";
import Footer from "./template/footer"

const Layout = ({ children }: any) => {
  return (
    <>
      <div style={{width:"100vw"}}>
        <div style={{position:"fixed", width:"99vw",zIndex: 9,top: 0}}>
          <Navbar />
        </div>
        <div style={{ marginTop:"100px"}}>
        {children}
        </div>
        <div>
        <Footer/>
        </div>
      </div>
    </>
  );
};

export default Layout;
