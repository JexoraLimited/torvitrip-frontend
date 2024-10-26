import Image from "next/image";

type Props = {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  className?: string;
  style?: React.CSSProperties;
};

const Pagination = ({
  totalPages,
  currentPage,
  onChange,
  className,
  style,
}: Props) => {
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div
      style={style}
      className={`flex items-center justify-start ${
        className ? className : ""
      }`}
    >
      <Image
        className="m-2 opacity-90 hover:cursor-pointer"
        onClick={handlePreviousClick}
        src="/icons/backward.svg"
        width={35}
        height={40}
        alt="avatar"
      />
      <button
        className={`inline-flex items-center rounded-md border border-[#A9A8A8] px-6 py-2 text-sm font-medium  focus:outline-none`}
      >
        {currentPage && currentPage}
      </button>
      <Image
        className="m-2 hover:cursor-pointer"
        onClick={handleNextClick}
        src="/icons/forward.svg"
        width={35}
        height={40}
        alt="avatar"
      />
      <span className="font-inter text-[15px] font-normal text-secondary-heading opacity-90">
        Page {currentPage && currentPage} to {totalPages && totalPages}
      </span>
    </div>
  );
};

export default Pagination;
