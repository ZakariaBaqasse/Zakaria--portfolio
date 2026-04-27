import NavBar from "./nav-bar";
import Footer from "./footer";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        {children}
        <Footer />
      </div>
    </>
  );
}
