import { CareerCardProps } from "@/lib/utils/types";
import React, { useRef } from "react";
import ListIcon from "./ListIcon";

const CareerTitle = ({
  title,
  institute,
  instituteLink,
  isProfessional,
}: {
  title: string;
  institute: string;
  instituteLink: string | undefined;
  isProfessional: boolean;
}) => (
  <h3 className="capitalize mb-2 font-bold md:text-2xl sm:text-xl text-lg text-dark">
    {title} &nbsp;
    {isProfessional && (
      <a
        href={instituteLink}
        target="_blank"
        className="capitalize text-lightBlue"
      >
        @{institute}
      </a>
    )}
  </h3>
);

const CareerDetails = ({
  startDate,
  endDate,
  location,
  institute,
  isProfessional,
}: {
  startDate: string;
  endDate: string;
  location: string | undefined;
  institute: string;
  isProfessional: boolean;
}) => (
  <span className="capitalize text-gray-600 font-medium md:text-base text-sm">
    {startDate} - {endDate} | {isProfessional ? location : institute}
  </span>
);

const CareerDescription = ({ description }: { description: string }) => (
  <p className="font-medium w-full my-2 md:text-base text-sm text-dark">
    {description}
  </p>
);

const CareerCard = ({ career, type }: CareerCardProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const isProfessional = type === "professional";

  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[70%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <ListIcon reference={ref} />
      <div>
        <CareerTitle
          title={career.title}
          institute={career.institute}
          instituteLink={career.institute_link}
          isProfessional={isProfessional}
        />
        <CareerDetails
          startDate={career.start_date}
          endDate={career.end_date}
          location={career.location}
          institute={career.institute}
          isProfessional={isProfessional}
        />
        <CareerDescription description={career.description} />
      </div>
    </li>
  );
};

export default CareerCard;
