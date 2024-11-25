import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SocialLink from "../../shared/social-links";
import { NAV_ITEMS, SOCIAL_LINKS } from "./nav-bar";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="md:w-[70vw] w-[95vw] flex justify-between items-center flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-32 bg-dark/90 dark:bg-light/75 rounded-lg z-50 backdrop-blur-md min-h-[50vh]"
        >
          <nav className="w-full mt-8 space-y-6 flex flex-col items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-medium text-light ${
                  pathname === item.href ? "border-b-2 border-light" : ""
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="flex items-center space-x-4 mt-8">
            {SOCIAL_LINKS.map((link) => (
              <SocialLink key={link.link} link={link.link}>
                <link.icon className="h-7 w-7 text-light" />
              </SocialLink>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
