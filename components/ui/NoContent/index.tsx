import { cn } from "@/utils/common";
import { FC, HTMLAttributes } from "react";
import { Button } from "../Button";
interface INoContent extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  textProps?: HTMLAttributes<HTMLHeadingElement>;
  button?: boolean;
  buttonText?: React.ReactNode;
  buttonClassName?: HTMLAttributes<HTMLButtonElement>["className"];
  onButtonClick?: () => void;
}

const NoContent: FC<INoContent> = ({
  text,
  textProps,
  button,
  buttonText,
  buttonClassName,
  onButtonClick,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "w-full h-full flex flex-col items-center justify-center",
        props.className
      )}
    >
      <h4
        {...textProps}
        className={cn("text-2xl font-medium", textProps?.className)}
      >
        {text || "No Data Found"}
      </h4>
      {button && (
        <Button className={buttonClassName} onClick={onButtonClick}>
          {buttonText || "Add Data"}
        </Button>
      )}
    </div>
  );
};

export default NoContent;
