import ComboBox from "@/components/ui/Combobox";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { ICSBox } from "@/types/common";
import { cn } from "@/utils/common";
import { Country } from "country-state-city";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TiInfo } from "react-icons/ti";

interface ICountryOption {
  label: string;
  value: string;
}

const BookingDetails = () => {
  const countries: ICountryOption[] = Country.getAllCountries().map(
    (country) => ({
      label: country.name,
      value: country.isoCode,
      flag: country.flag,
    })
  );

  const [selectDropdowns, setSelectDropdowns] = useState([
    {
      title: "Select Meal Type",
      menus: [{ title: "None" }],
      isActive: false,
    },
    {
      title: "Request wheen chair",
      menus: [{ title: "No" }],
      isActive: false,
    },
  ]);

  const handleDropdownToggle = (index: number) => {
    let dropdowns = selectDropdowns.slice();
    dropdowns[index].isActive = !dropdowns[index].isActive;
    setSelectDropdowns(dropdowns);
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden flex">
      <div className="w-[300px] h-full bg-primary/10"></div>
      <div className="flex-1 text-lg relative pb-[64px] h-[calc(100vh_-_250px)] overflow-y-auto grayScrollBar border-l border-border">
        <div className="p-4 border-b border-gray">
          <h5 className="font-semibold">Provide Traveller Details</h5>
        </div>

        <div className="flex items-center justify-center w-full h-[40px] bg-secondary/10 gap-2 border-b-2 border-secondary">
          <div className="w-5 h-5 flex items-center justify-center bg-secondary text-white rounded-full">
            <span>1</span>
          </div>
          <h5 className="text-[14px] font-semibold">Primary Traveler</h5>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center bg-secondary/10 gap-3 rounded-lg p-2">
            <TiInfo className="text-2xl text-secondary" />
            <p className="text-[14px] flex-1">
              Due to Covid-19, Airline has the authority to cancel or reschedule
              flight any time. Please check travel restriction, visa
              requirements & health advisories before you travel to destination
            </p>
          </div>
          <div className="flex items-center bg-secondary/10 gap-3 rounded-lg p-2">
            <TiInfo className="text-2xl text-secondary" />
            <p className="text-[14px] flex-1">
              Provide all the information{" "}
              <strong>exactly as they appear in the passport</strong> to avoid
              boarding complications.
            </p>
          </div>
        </div>
        <div className="p-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select from your favorite travelers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="myself">My Self</SelectItem>
              <SelectItem value="user1">User 1</SelectItem>
              <SelectItem value="user2">User 2</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-3 my-3">
            <div className="h-[1px] w-full bg-gray"></div>
            <p className="whitespace-nowrap font-bold text-[14px]">
              Or, Enter Traveller Details below
            </p>
            <div className="h-[1px] w-full bg-gray"></div>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <div className="flex items-center gap-x-4 justify-center">
              <div className="flex-1">
                <Input required className="w-full" label="Given Name" />
              </div>
              <div className="flex-1">
                <Input required className="w-full" label="Surname" />
              </div>
            </div>
            <div className="flex items-center gap-x-4 justify-center">
              <div className="flex-1">
                <SelectGroup>
                  <Select>
                    <SelectLabel>Select Gender *</SelectLabel>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </SelectGroup>
              </div>
              <div className="flex-1">
                <ComboBox
                  formatOptionLabel={(data) => {
                    return (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start gap-4">
                          <Image
                            src={`https://flagcdn.com/48x36/${(
                              data as ICSBox
                            ).value.toLowerCase()}.png`}
                            height={34}
                            width={28}
                            className="object-contain"
                            alt={(data as ICSBox).label}
                          />
                          <span>{(data as ICSBox).label}</span>
                        </div>
                        <h5>{(data as ICSBox).value}</h5>
                      </div>
                    );
                  }}
                  label="Select Nationality"
                  options={countries}
                />
              </div>
            </div>
            <div className="flex items-center gap-x-4 justify-center">
              <div className="flex-1">
                <Input required className="w-full" label="Phone number" />
              </div>
              <div className="flex-1">
                <Input required className="w-full" label="Email" />
              </div>
            </div>
            <div className="flex items-center justify-center bg-secondary/10 gap-3 rounded-lg p-2">
              <p className="text-[14px] flex-1 text-center">
                *It is mandatory to upload copy of your valid{" "}
                <span className="font-bold">Passport and Visa</span>
              </p>
            </div>
            <div className="flex items-center gap-x-4 justify-center">
              <div className="flex-1">
                <label
                  htmlFor="upload_passport"
                  className="text-primary-heading font-inter text-[15px] font-medium leading-[18px]"
                >
                  Upload Passport
                </label>
                <label
                  htmlFor="upload_passport"
                  className="flex items-center justify-center w-full h-[40px] border border-dashed border-primary bg-primary/10 text-primary font-semibold rounded-lg"
                >
                  Upload Passport
                </label>
                <input id="upload_passport" type="file" className="hidden" />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="upload_visa"
                  className="text-primary-heading font-inter text-[15px] font-medium leading-[18px]"
                >
                  Upload Visa
                </label>
                <label
                  htmlFor="upload_visa"
                  className="flex items-center justify-center w-full h-[40px] border border-dashed border-primary bg-primary/10 text-primary font-semibold rounded-lg"
                >
                  Upload Passport
                </label>
                <input id="upload_visa" type="file" className="hidden" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-full bg-gray"></div>
              <p className="whitespace-nowrap font-bold text-[14px]">
                Select optional services
              </p>
              <div className="h-[1px] w-full bg-gray"></div>
            </div>
            <div className="flex flex-col gap-y-4 cursor-pointer">
              {selectDropdowns.map((dropdown, i) => (
                <div key={i} className="w-full">
                  <div
                    onClick={() => handleDropdownToggle(i)}
                    className={cn(
                      "w-full bg-slate-100 flex items-center justify-between rounded-lg py-3 px-4",
                      dropdown.isActive && "rounded-bl-none rounded-br-none"
                    )}
                  >
                    <div>
                      <h5 className="text-lg font-semibold">
                        {dropdown.title}
                      </h5>
                      <span className="text-sm">Optional</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <h5 className="text-lg font-medium">None</h5>
                      <IoIosArrowDown />
                    </div>
                  </div>
                  <motion.div
                    animate={{ height: dropdown.isActive ? "500px" : 0 }}
                    className="w-full bg-slate-200"
                  ></motion.div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between bg-secondary/10 gap-3 rounded-lg py-2 px-4">
              <p className="text-[14px] font-semibold text-center">
                Save this traveler for future use
              </p>
              <Switch />
            </div>
          </div>
        </div>
        {/* <div className="absolute bottom-0 left-0 py-3 px-4 flex items-center justify-center w-full bg-white h-[64px] gap-3 border-t border-border">
          <Button variant={"destructive"} className="flex-1">
            Back to payment options
          </Button>
          <Button variant={"secondary"} className="flex-1">
            Save & Continue
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default BookingDetails;
