import { Navbar, Main, Product, Footer } from "../../components";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const employeeName = location.state?.employee?.name;
  return (
    <>
      <Navbar />
      <Main employeeName={employeeName} />
    </>
  )
}

export default Home