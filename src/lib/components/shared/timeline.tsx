import { Carrer, CarrerType } from "@/lib/utils/types";
import React from "react";
import { TechStackChip } from "./chip";
import { Roboto, Merriweather } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const Timeline = ({
  carrers,
  carrerType,
}: {
  carrers: Carrer[];
  carrerType: CarrerType;
}) => {
  const renderTechnologies = (carrer: Carrer) => {
    if (carrer.technologies) {
      return (
        <div className="flex justify-start flex-wrap">
          {carrer.technologies.map((tech, index) => {
            return <TechStackChip key={`${tech}_${index}`} tech={tech} />;
          })}
        </div>
      );
    }
  };

  const renderIcon = () => {
    if (carrerType === CarrerType.ACADEMIC) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>
      );
    }
  };

  const carrerCount = carrers.length;
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {carrers.map((carrer, index) => {
        return (
          <li className="mb-10 ms-6" key={carrer.title}>
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              {renderIcon()}
            </span>
            <h3
              className={`${roboto.className} flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white`}
            >
              {carrer.title}
              {0 === index && (
                <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                  Latest
                </span>
              )}
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              From {carrer.start_date} to {carrer.end_date}
            </time>
            <p
              className={`${merriweather.className} mb-4 text-base font-normal text-gray-500 dark:text-gray-400`}
            >
              {carrer.description}
            </p>
            {renderTechnologies(carrer)}
          </li>
        );
      })}
    </ol>
  );
};

export default Timeline;
