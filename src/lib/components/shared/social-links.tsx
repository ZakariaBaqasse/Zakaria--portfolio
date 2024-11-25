"use client";

import { motion } from "framer-motion";

export default function SocialLink({
  link,
  children,
  className,
}: {
  link: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      href={link}
      target="_blank"
      className={`${className} text-muted-foreground hover:text-primary`}
    >
      {children}
    </motion.a>
  );
}
