import { FlightTypes, Gender, Refundable } from "@/types/common";
import { clsx, type ClassValue } from "clsx";
import { parsePhoneNumber } from "libphonenumber-js";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mergeClassNames = (...classNames: (string | undefined)[]) => {
  return classNames.filter((className) => className !== undefined).join(" ");
};

export const getLocalePrice = (
  price: number,
  locale: string = "en-US",
  currency: string = "BDT",
  options?: Intl.NumberFormatOptions
) => {
  return price.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
    currencyDisplay: "code",
    ...options,
  });
};

export const formatPhoneNumber = (dialCode: string, userInput: string) => {
  try {
    const parsed = parsePhoneNumber(dialCode + userInput, {
      defaultCallingCode: dialCode,
    });
    const formatted = parsed.format("E.164");

    return formatted;
  } catch (error) {
    console.error("Error formatting phone number:", error);
    return userInput;
  }
};

export const getNameInitials = (fullName: string = "No User"): string => {
  // Split the full name into an array of words
  const names = fullName.split(" ");
  // Ensure there are at least two names (first name and last name)
  if (names.length >= 2) {
    // Get the first letter of the first name
    const firstInitial = names[0].charAt(0);

    // Get the first letter of the last name
    const lastInitial = names[names.length - 1].charAt(0);

    // Concatenate the initials and return them
    const initials = `${firstInitial}${lastInitial}`;

    return initials;
  } else {
    // Handle the case where there are not enough names
    throw new Error("Please provide a full name with at least two words.");
  }
};

export const getSearchParams = (obj: object) => {
  const params = new URLSearchParams();
  if (obj) {
    let parsedJSON = JSON.parse(JSON.stringify(obj));

    for (const key in parsedJSON) {
      if (obj.hasOwnProperty(key)) {
        const value = parsedJSON[key];

        if (value !== undefined) {
          params.append(key, value.toString());
        }
      }
    }
  }
  return params;
};

export const getGender = (gender: Gender) => {
  switch (gender) {
    case "female":
      return "Female";
    case "male":
      return "Male";
    case "others":
      return "Others";
  }
};

export const formatCurrency = (
  number: number,
  currency: string = "USD",
  options?: Intl.NumberFormatOptions
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
    ...options,
  }).format(number);
};

export const formatCurrencyCompact = (
  number: number,
  currency: string = "USD",
  options?: Intl.NumberFormatOptions
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation: "compact",
    maximumFractionDigits: 0,
    ...options,
  }).format(number);
};

export function formatDurationFromIso(durationString: string) {
  const duration = moment.duration(durationString);
  const hours = duration.hours();
  const minutes = duration.minutes();

  const formattedDuration = `${hours} Hr ${minutes} Min`;

  return formattedDuration;
}

export const getTripType = (tripType: FlightTypes) => {
  switch (tripType) {
    case "one-way":
      return "One Way";
    case "round-trip":
      return "Round Trip";
    case "multi-city":
      return "Multi City";
  }
};

export const getRefundableText = (refundable: Refundable) => {
  let text = "Non Refundable";
  switch (refundable) {
    case "non-refundable":
      text = "Non Refundable";
      break;
    case "partially-refundable":
      text = "Partially Refundable";
      break;
    case "refundable":
      text = "Refundable";
      break;
    default:
      text = "Non Refundable";
  }
  return text;
};

export function choose(array: any[]) {
  // Check if the array is empty
  if (array.length === 0) {
    return null;
  }
  // Generate a random index within the bounds of the array
  const randomIndex = Math.floor(Math.random() * array.length);
  // Return the element at the randomly selected index
  return array[randomIndex];
}

export const getRatingColor = (rating: any) => {
  let color = "#388e3c";
  if (rating >= 4) {
    color = "#388e3c";
  } else if (rating >= 2 && rating < 4) {
    color = "#ff9f00";
  } else if (rating < 2) {
    color = "#ff6161";
  }
  return color;
};
