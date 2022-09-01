import Header from "./header";
import Navbar from "./sidebar";

export default function Layout({ childen }) {
  return (
    <>
      <Header />
      <Navbar />
      {childen}
    </>
  );
}
