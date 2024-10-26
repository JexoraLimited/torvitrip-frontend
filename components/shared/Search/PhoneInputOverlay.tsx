import { murecho } from "@/fonts/google";
import { cn } from "@/utils/common";
import { HTMLAttributes, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
interface IPhoneOverlay {
  open: boolean;
  handleClose?: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  back?: boolean;
  handleBack?: () => void;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}
const PhoneInputOverlay: React.FC<IPhoneOverlay> = ({
  open,
  handleClose,
  subtitle,
  title,
  children,
  handleBack,
  back,
  className,
}) => {
  const toggleBodyOverflowHidden = (hidden: boolean) => {
    document.body.style.overflow = hidden ? "hidden" : "unset";
  };

  useEffect(() => {
    open ? toggleBodyOverflowHidden(true) : toggleBodyOverflowHidden(false);
  }, [open]);
  return (
    <div
      className={cn(
        "w-screen h-full md:hidden fixed z-[9999] duration-500 top-0 bottom-0 overflow-hidden bg-white flex flex-col",
        murecho.className,
        open ? "left-0" : "left-[100vw]",
        className
      )}
    >
      <div className="p-3 h-[60px] bg-secondary flex items-center">
        {back && (
          <div
            onClick={() => {
              handleBack && handleBack();
            }}
            className="w-[36px] h-[36px] flex items-center justify-center"
          >
            <IoMdArrowBack className="text-white text-2xl" />
          </div>
        )}
        <div className="text-center flex-1">
          <h3 className="text-[15px] leading-[20px] font-bold text-white">
            {title}
          </h3>
          <h3 className="text-[12px] leading-[16px] font-regular text-white">
            {subtitle}
          </h3>
        </div>
        <div
          onClick={() => {
            handleClose && handleClose();
          }}
          className="w-[36px] h-[36px] flex items-center justify-center"
        >
          <AiOutlineClose className="text-white text-2xl" />
        </div>
      </div>
      <div
        style={{ height: "calc(100vh - 60px)" }}
        className="relative overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default PhoneInputOverlay;
