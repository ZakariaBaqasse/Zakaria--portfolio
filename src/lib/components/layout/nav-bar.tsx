"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const roboto = Roboto({
  weight: ["300", "400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const NavBar = () => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };
  return (
    <nav className="bg-secondary text-white">
      <Link href="/">
        <div className="flex justify-between items-center px-3 md:px-0 md:justify-center">
          <h1
            className={`my-4 items-center ${roboto.className} text-xl md:text-3xl hover:text-gray-400 font-semibold transition ease-out duration-300`}
          >
            Zakaria BAQASSE
          </h1>
          <div className="md:hidden" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </div>
        </div>
      </Link>
      <ul
        className={`flex md:justify-evenly ${
          roboto.className
        } font-semibold lowercase flex-col items-center md:flex-row menu ${
          !isOpened ? "hidden_nav" : ""
        }`}
      >
        <li>
          <a href="#MeetMe">Meet Me</a>
        </li>
        <li>
          <a href="#Education">My Education</a>
        </li>
        <li>
          <a href="#Projects">My Projects</a>
        </li>
        <li>
          <a href="#Experience">My Experience</a>
        </li>
        <li>
          <a href="#Contact">Contact Me</a>
        </li>
      </ul>
    </nav>
  );
};
