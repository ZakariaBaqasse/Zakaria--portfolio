import { Badge } from "@/components/ui/badge";

export default function TechChip({ tech }: { tech: string }) {
  return (
    <Badge className="lg:px-3 lg:py-2 px-2 py-1 bg-dark text-light lg:text-sm text-xs font-medium hover:scale-105 transition-all duration-300">
      {tech}
    </Badge>
  );
}
