"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const CTAButton = () => {
  return (
    <div className="flex justify-center items-center fixed top-0 right-4 w-32 h-32 lg:top-auto lg:bottom-6 lg:right-6 lg:w-40 lg:h-40">
      <div className="absolute inset-0 flex items-center justify-center">
        <a href="mailto:zakaria.baqasse@gmail.com" className="z-10">
          <Button
            variant="default"
            className="rounded-full md:h-20 md:w-20 h-16 w-16 p-0 bg-black text-white hover:bg-white hover:text-black hover:border-black hover:border-2 md:text-base text-xs font-semibold"
          >
            Hire Me
          </Button>
        </a>
      </div>
      <svg
        viewBox="0 0 100 100"
        className="md:w-full md:h-full w-3/4 h-3/4 text-base animate-spin-slow"
      >
        <path
          id="circlePath"
          d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text>
          <textPath href="#circlePath" startOffset="0%">
            • AI and Software Engineer
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CTAButton;
