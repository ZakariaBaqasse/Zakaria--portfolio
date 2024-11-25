import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleCheckIcon } from "lucide-react";

export default function SkillCard({
  category,
  skills,
  children,
}: {
  category: string;
  skills: string[];
  children: React.ReactNode;
}) {
  return (
    <Card className="w-full max-w-sm p-4 bg-light border border-gray-200 rounded-lg shadow sm:p-8">
      <CardHeader>
        <div className="mb-4 text-3xl font-medium text-dark w-full flex justify-center">
          {children}
        </div>
        <div className="flex items-baseline justify-center text-center text-gray-900 dark:text-white">
          <h5 className="lg:text-5xl text-3xl font-extrabold tracking-tight">
            {category}
          </h5>
        </div>
      </CardHeader>
      <CardContent>
        <ul role="list" className="space-y-5 my-7">
          {skills.map((skill) => (
            <li className="flex items-center" key={skill}>
              <CircleCheckIcon className="w-4 h-4 text-dark" />
              <span className="text-base font-normal leading-tight text-dark capitalize ms-3">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
