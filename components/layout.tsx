import Navbar from "./template/navbar"

const Layout = ({ children}:any) => {
    return (
      <>
        <div >
        <div>
          <Navbar />
        </div>
          {children}
          Footer 
        </div>
      </>
    );
  };
  
  export default Layout;