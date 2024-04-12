"use client";

const ShowMoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <button
        onClick={onClick}
        className="text-secondary font-headings capitalize border-2 border-secondary rounded-full hover:bg-secondary hover:text-white text-xl px-3 py-2 transition-all ease-out duration-300 my-4 ml-3"
      >
        Show More
      </button>
    </div>
  );
};

export default ShowMoreButton;
