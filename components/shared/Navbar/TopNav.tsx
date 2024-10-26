import bangladesh from "@/assets/images/countries/bd.webp";
import usa from "@/assets/images/countries/us.png";
import { nunitoSans } from "@/fonts/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Select from "react-select";
import styles from "./TopNav.module.css";
interface ITopNav {
  className?: string;
  categoryActive?: boolean;
  setCategoryActive?: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseMobileMenu?: () => void;
}
const TopNav = ({
  className,
  categoryActive,
  setCategoryActive,
  handleCloseMobileMenu,
}: ITopNav) => {
  const currencies = [
    {
      value: "BDT",
      label: "BDT",
      image: bangladesh,
    },
    {
      value: "USD",
      label: "USD",
      image: usa,
    },
  ];
  const [currency, setCurrency] = useState(currencies[0]);
  useEffect(() => {
    const currencyValue = localStorage.getItem("currency");

    const newCurrency = currencies.find(
      (currency) => currency.value === currencyValue
    );
    if (newCurrency?.label) {
      setCurrency(newCurrency);
    }
  }, []);
  return (
    <div className={`w-full mx-auto h-[40px] bg-[#F7F7F7] ${className}`}>
      <div className="h-full main-container mx-auto flex text-black justify-between gap-8 md:justify-end items-center">
        <Link
          href="/under-construction"
          style={nunitoSans.style}
          className="text-[14px] bg-primary text-white rounded px-[8px] md:px-[20px] h-[25px] flex items-center justify-center font-bold"
        >
          <span>List Your Property</span>
        </Link>
        <Link
          href="/under-construction"
          className="text-[14px] text-black rounded px-[20px] h-[25px] md:flex items-center justify-center font-bold hidden"
        >
          <span>Support</span>
        </Link>
        <Select
          className={`${styles.languageChange} border-none flex-1 md:flex-none justify-end`}
          classNamePrefix="select"
          options={currencies}
          isSearchable={false}
          onChange={(n) => {
            if (n) {
              localStorage?.setItem("currency", n?.value);
              setCurrency(n);
              window.location.reload();
            }
          }}
          styles={{
            control: (base) => ({
              ...base,
              border: 0,
              // This line disable the blue border
              boxShadow: "none",
              backgroundColor: "#f7f7f7",
            }),
          }}
          value={currency}
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-2">
              {option.image ? (
                <Image
                  style={{
                    width: "30px",
                    objectFit: "contain",
                  }}
                  src={option.image}
                  alt={option.label}
                  className="w-5 md:max-w-none"
                />
              ) : (
                ""
              )}
              <span className="text-[14px] md:text-[14px]">{option.label}</span>
            </div>
          )}
        />

        <div className="md:hidden block">
          <IoCloseOutline
            onClick={() => handleCloseMobileMenu && handleCloseMobileMenu()}
            className="font-bold text-[35px] text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
