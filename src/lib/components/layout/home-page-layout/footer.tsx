import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full md:px-6 md:py-12 px-3 py-6 border-t">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="md:text-sm text-xs text-dark">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span>Built with ❤️ by</span>
          <Link
            href="#"
            className="font-medium hover:text-dark text-xs md:text-sm"
          >
            Zakaria Baqasse
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
