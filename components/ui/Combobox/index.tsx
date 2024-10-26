import Colors from "@/constants/Colors";
import { cn } from "@/utils/common";
import type { FC } from "react";
import { Fragment } from "react";
import type { FieldError } from "react-hook-form";
import type {
  ClassNamesConfig,
  GroupBase,
  Props,
  StylesConfig,
} from "react-select";
import Select from "react-select";

interface ComboBoxProps extends Props {
  label?: string;
  error?: FieldError | undefined;
  labelClassName?: string;
  optionsPadding?: string;
  bgColor?: string;
  classNames?: ClassNamesConfig<any, boolean, GroupBase<unknown>>;
}
/**
 * Renders a ComboBox component.
 *
 * @param {ComboBoxProps} error - Indicates if there is an error.
 * @param {string} label - The label for the ComboBox.
 * @param {string} labelClassName - Additional class name for the label.
 * @param {...any} props - Additional props for the ComboBox.
 * @return {ReactElement} The rendered ComboBox component.
 */
const ComboBox: FC<ComboBoxProps> = ({
  error,
  label,
  labelClassName,
  isMulti,
  optionsPadding = "12px 24px",
  bgColor = "#f1f5f9",
  ...props
}) => {
  const selectStyles: StylesConfig<any, any, any> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: bgColor,
      border: "none",
      borderRadius: 8,
      boxShadow: "none",
    }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
    dropdownIndicator: (styles) => ({ ...styles, color: "#4b5563" }),
    input: (styles) => ({
      ...styles,
      fontSize: 14,
      padding: "7px 6.08px",
    }),
    placeholder: (styles) => ({
      ...styles,
      fontSize: 14,
      color: "#A9A8A8",
      padding: "0.56px 5.08px",
      fontWeight: 500,
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#0085FF",
      borderRadius: 9999999,
      padding: "2.56px 6.08px",
    }),
    multiValueLabel: (styles) => ({ ...styles, color: "white", fontSize: 13 }),
    option: (styles, { isSelected, isFocused }) => ({
      ...styles,
      fontSize: 14,
      padding: optionsPadding,
      fontWeight: 500,
      color: "black",
      backgroundColor: isSelected
        ? Colors.secondaryOptions.secondary200
        : isFocused
        ? Colors.primaryOptions.primary200
        : "white",
      ":active": {
        backgroundColor: Colors.secondaryOptions.secondary200,
        color: "black",
      },
      ":hover": {
        color: "black",
        backgroundColor: Colors.primaryOptions.primary200,
        width: "100%",
      },
    }),
    menuList: (styles) => ({
      ...styles,
      borderRadius: 8,
    }),
    singleValue: (styles) => ({
      ...styles,
      paddingLeft: 6,
      fontSize: 14,
      fontWeight: 500,
      color: "rgba(10,5,41,0.8)",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "white",
      fontSize: 13,
      ":hover": {
        color: "white",
        backgroundColor: "transparent",
      },
    }),
  };
  return (
    <Fragment>
      {label && (
        <label
          className={cn(
            "font-inter text-primary-heading text-[15px] font-medium leading-[18px]",
            { "text-red-400": error },
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <Select
        className={"font-inter text-sm"}
        isMulti={isMulti}
        styles={selectStyles}
        {...props}
        classNames={{
          option: (props) => (props.isFocused ? "bg-gray-100" : "bg-white"),
          control: () => "h-full",
          valueContainer: () => "h-full",
          indicatorsContainer: () => "h-full",
          input: () => "!p-0 !m-0",
          ...props.classNames,
        }}
      />
      {error && (
        <p className="font-inter text-xs text-red-400">{error.message}</p>
      )}
    </Fragment>
  );
};

export default ComboBox;
