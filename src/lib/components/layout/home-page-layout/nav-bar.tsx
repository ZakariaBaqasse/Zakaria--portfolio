"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Twitter, Github, Linkedin } from "lucide-react";
import SocialLink from "../../shared/social-links";
import { GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from "@/lib/utils/const";
import MobileNav from "./mobile-nav";
import { usePathname } from "next/navigation";

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

export const SOCIAL_LINKS = [
  { link: TWITTER_LINK, icon: Twitter },
  { link: GITHUB_LINK, icon: Github },
  { link: LINKEDIN_LINK, icon: Linkedin },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="w-full md:px-32 md:py-8 px-10 py-4 flex items-center justify-between mb-3 relative">
      <nav className="hidden lg:flex items-center space-x-8">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium hover:text-primary ${
              pathname === item.href
                ? "text-primary border-b-2 border-primary"
                : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        className="lg:hidden z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="hidden lg:flex items-center space-x-4">
        {SOCIAL_LINKS.map((link) => (
          <SocialLink key={link.link} link={link.link}>
            <link.icon className="h-5 w-5 text-dark" />
          </SocialLink>
        ))}
      </div>
    </header>
  );
}
