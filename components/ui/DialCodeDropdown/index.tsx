import ComboBox from "@/components/ui/Combobox";
import { cn } from "@/utils/common";
import { Country } from "country-state-city";
import Image from "next/image";
import React, { useMemo } from "react";

const DialCodeDropDown: React.FC<
  React.ComponentPropsWithoutRef<typeof ComboBox>
> = ({ value, ...props }) => {
  const countryList = useMemo(
    () => (typeof window !== "undefined" ? Country.getAllCountries() : []),
    []
  );

  const dialCodeList = useMemo(
    () =>
      typeof window !== "undefined"
        ? countryList.map((country) => ({
            code: country.isoCode,
            dial: country.phonecode,
            flag: `https://flagcdn.com/48x36/${country.isoCode.toLowerCase()}.png`,
            name: country.name,
          }))
        : [],
    [countryList]
  );

  const dialCodes = useMemo(() => {
    if (typeof window !== "undefined") {
      const codes = dialCodeList.map((code) => ({
        label: (
          <div
            className={cn(
              "flex items-center gap-1.5",
              code.dial.length > 3 && "min-w-[150px]"
            )}
          >
            <Image
              src={code.flag}
              width={24}
              height={24}
              alt={code.code}
              className="object-contain"
            />
            <p className="text-sm">{code.dial}</p>
          </div>
        ),
        value: code.dial,
      }));

      return codes;
    }
  }, [dialCodeList]);

  const defaultVal = useMemo(() => {
    return dialCodes?.find((v) => v.value === value);
  }, [dialCodes, value]);

  return (
    <ComboBox
      {...props}
      options={dialCodes}
      value={defaultVal}
      classNames={{
        menu: () => "!w-[170px]",
        menuList: () => "w-[170px]",
        valueContainer: () => "!px-0",
        dropdownIndicator: () => "!pr-0",
      }}
    />
  );
};

export default DialCodeDropDown;
