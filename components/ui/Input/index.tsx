"use client";

import { cn } from "@/utils/common";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Fragment, forwardRef } from "react";
import type { FieldError } from "react-hook-form";

/* The `interface InputProps` is defining the props that can be passed to the `Input`
component. It extends the `InputHTMLAttributes<HTMLInputElement>` interface, which includes all the
standard HTML input attributes that can be used with the `input` element. */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputPrefix?: ReactNode;
  inputSuffix?: ReactNode;
  inputPrefixClassName?: string;
  inputSuffixClassName?: string;
  inputContainerClassName?: string;
  required?: boolean;
  error?: FieldError;
}

/**
 * Renders a text input component.
 *
 * @param {InputProps} className - The class name of the text input component.
 * @param {string} label - The label of the text input component.
 * @param {string} inputPrefix - The prefix of the text input component.
 * @param {string} inputSuffix - The suffix of the text input component.
 * @param {string} inputPrefixClassName - The class name of the input prefix element.
 * @param {string} inputSuffixClassName - The class name of the input suffix element.
 * @param {...props} props - Other props for the text input component.
 * @return {JSX.Element} The rendered text input component.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      inputPrefix,
      inputSuffix,
      inputPrefixClassName,
      inputSuffixClassName,
      inputContainerClassName,
      labelClassName,
      error,
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    return (
      <Fragment>
        {label !== undefined && (
          <label
            className={cn(
              "text-primary-heading font-inter text-[15px] font-medium leading-[18px]",
              { "text-red-400": error },
              labelClassName
            )}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}{" "}
        <div
          className={cn(
            "flex w-full rounded-lg bg-slate-100",
            { "border-red-400": error },
            {
              "cursor-not-allowed bg-zinc-100 opacity-70": disabled,
            },
            // { "ring-2 ring-primary ring-offset-2": isFocused },
            inputContainerClassName
          )}
        >
          {inputPrefix !== undefined && (
            <span
              className={cn(
                "flex items-center justify-center pl-4",
                inputPrefixClassName
              )}
            >
              {inputPrefix}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            disabled={disabled}
            className={cn(
              "font-inter bg-transparent w-full rounded-lg px-[0.88rem] py-[0.66rem] text-sm text-slate-900 placeholder:text-sm placeholder:font-normal placeholder:leading-normal placeholder:text-zinc-500 focus:outline-0",
              className
            )}
            {...props}
          />
          {inputSuffix !== undefined && (
            <span
              className={cn(
                "flex items-center justify-center px-4",
                inputSuffixClassName
              )}
            >
              {inputSuffix}
            </span>
          )}
        </div>
        {error !== undefined && (
          <p className="font-inter text-start text-xs text-red-400">
            {error.message}
          </p>
        )}
      </Fragment>
    );
  }
);

Input.displayName = "Input";

export { Input };
