import { StyledTitleProps } from "@/lib/utils/types";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const StyledTitle = ({
  word1,
  word2,
  textColor = "text-secondary",
}: StyledTitleProps) => {
  return (
    <h1
      className={`${roboto.className} ${textColor} md:text-5xl text-3xl font-normal capitalize my-16 ml-20 md:ml-36`}
    >
      <div className="mr-2 inline-block">{word1}</div>
      <div className="relative inline-block">
        <div className="z-10 relative">{word2}</div>
        <div className="absolute bottom-0 bg-primary w-full h-3"></div>
      </div>
    </h1>
  );
};

export default StyledTitle;
