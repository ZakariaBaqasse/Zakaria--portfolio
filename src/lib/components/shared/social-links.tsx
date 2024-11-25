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
    <a
      aria-label="social link"
      href={link}
      target="_blank"
      className={`${className} hover:translate-y-[-2px] transition-all duration-200 text-muted-foreground hover:text-primary`}
    >
      {children}
    </a>
  );
}
