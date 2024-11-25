import { EDUCATIONS } from "@/lib/utils/const";
import CareerList from "@/lib/components/shared/CareerList";

export default function EducationSection() {
  return (
    <section className="mt-48 lg:mt-64 md:mb-96 mb-32">
      <h2 className="text-5xl font-bold text-center mb-24">Education</h2>
      <CareerList careers={EDUCATIONS} type="academic" />
    </section>
  );
}
