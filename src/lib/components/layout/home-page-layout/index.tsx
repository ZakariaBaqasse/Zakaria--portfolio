import NavBar from "./nav-bar";
import Footer from "./footer";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen">
        <NavBar />
        {children}
        <Footer />
      </div>
    </>
  );
}
