import { cn } from "@/utils/common";
import React from "react";
interface IError {
  message?: string;
  responseStatus?: string;
  success?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  statusClassName?: string;
}
const ErrorView: React.FC<IError> = ({
  message,
  responseStatus,
  className,
  descriptionClassName,
  statusClassName,
  titleClassName,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      <h3 className={cn("text-xl font-bold md:text-3xl", titleClassName)}>
        Error
      </h3>
      <h5
        className={cn("text-md text-center md:text-lg", descriptionClassName)}
      >
        {message || "Something went wrong"}
      </h5>
      <small className={cn("text-xs md:text-sm", statusClassName)}>
        {responseStatus || "Internal Server Error"}
      </small>
    </div>
  );
};

export default ErrorView;
