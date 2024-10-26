import bimafy from "@/assets/images/icons/Bimafy.png";
import notTaken from "@/assets/images/icons/untaken.png";
import { cn } from "@/utils/common";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TiInfo } from "react-icons/ti";

const Ancillaries = () => {
  const [dropdownActive, setDropdownActive] = useState(true);
  const [activeInsurance, setActiveInsurance] = useState<
    "choose" | "save" | "no"
  >("no");
  return (
    <div className="w-full">
      <div className="p-4 border-b text-lg border-gray">
        <h5 className="font-semibold">Baggage Protection</h5>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-y-4 cursor-pointer">
          <div className="w-full">
            <div
              onClick={() => setDropdownActive((active) => !active)}
              className={cn(
                "w-full bg-slate-100 flex items-center justify-between rounded-lg py-3 px-4",
                dropdownActive && "rounded-bl-none rounded-br-none"
              )}
            >
              <div>
                <h5 className="text-lg font-semibold">
                  Select for primary traveler
                </h5>
                <span className="text-sm">John Doe</span>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="text-md text-primary font-medium text-right">
                    ৳ 330.00
                  </h4>
                  <h5 className="text-sm font-medium text-right">
                    Blue Ribbon Bag
                  </h5>
                </div>
                <IoIosArrowDown />
              </div>
            </div>
            <motion.div
              animate={{
                height: dropdownActive ? "auto" : "0px",
                padding: dropdownActive ? "20px" : 0,
                borderWidth: dropdownActive ? "1px" : 0,
              }}
              className={cn(
                "w-full overflow-hidden cursor-auto",
                dropdownActive && "border-border"
              )}
            >
              <div className="flex items-center mb-3 bg-secondary/10 gap-3 rounded-lg p-2">
                <TiInfo className="text-2xl text-secondary" />
                <p className="text-[14px] flex-1">
                  <strong>Non-Refundable</strong> for TripAdd ancillaries
                  packages
                </p>
              </div>
              <div className="flex items-stretch gap-3">
                <div
                  onClick={() => setActiveInsurance("choose")}
                  className={cn(
                    "flex-1 p-4 cursor-pointer flex justify-center flex-col rounded-lg border border-border bg-slate-100",
                    activeInsurance === "choose" &&
                      "border-secondary bg-secondary/10"
                  )}
                >
                  <Image
                    src={bimafy}
                    width={32}
                    height={32}
                    alt="blue robbin bags"
                    className="object-contain mb-2"
                  />
                  <h5 className="text-xs">Protect With</h5>
                  <h4 className="text-sm font-bold">Blue Ribbon Bags</h4>
                </div>
                <div
                  onClick={() => setActiveInsurance("save")}
                  className={cn(
                    "flex-1 p-4 cursor-pointer flex justify-center flex-col rounded-lg border border-border bg-slate-100",
                    activeInsurance === "save" &&
                      "border-secondary bg-secondary/10"
                  )}
                >
                  <Image
                    src={notTaken}
                    width={32}
                    height={32}
                    alt="blue robbin bags"
                    className="object-contain mb-2"
                  />
                  <h5 className="text-xs">I will take</h5>
                  <h4 className="text-sm font-bold">No Baggage protection</h4>
                </div>
                <div
                  onClick={() => setActiveInsurance("no")}
                  className={cn(
                    "flex-1 p-4 cursor-pointer flex justify-center flex-col rounded-lg border border-border bg-slate-100",
                    activeInsurance === "no" &&
                      "border-secondary bg-secondary/10"
                  )}
                >
                  <Image
                    src={notTaken}
                    width={32}
                    height={32}
                    alt="blue robbin bags"
                    className="object-contain mb-2"
                  />
                  <h5 className="text-xs">I will take</h5>
                  <h4 className="text-sm font-bold">No Baggage protection</h4>
                </div>
              </div>
              <div className="flex items-center cursor-pointer bg-slate-100 gap-3 p-4 mb-3 my-3 rounded-lg">
                <input
                  type="checkbox"
                  className="accent-primary w-[16px] h-[16px]"
                />
                <h5 className="text-md font-semibold leading-3">
                  Travel eSIM 1GB
                </h5>
              </div>
              <div className="flex flex-col rounded-lg overflow-hidden divide-y divide-border">
                <div className="flex items-center p-4 bg-slate-100 justify-between gap-3">
                  <div className="flex items-center cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      className="accent-primary w-[16px] h-[16px]"
                    />
                    <div>
                      <h5 className="text-md font-semibold leading-3">
                        Travel eSIM 1GB
                      </h5>
                      <span className="text-sm">
                        Stay connected in Malaysia with a 1GB eSIM!
                      </span>
                    </div>
                  </div>
                  <h5 className="text-md font-semibold leading-3">
                    +BDT 1715.75
                  </h5>
                </div>
                <div className="flex items-center p-4 bg-slate-100 justify-between gap-3">
                  <div className="flex items-center cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      className="accent-primary w-[16px] h-[16px]"
                    />
                    <div>
                      <h5 className="text-md font-semibold leading-3">
                        Travel eSIM 1GB
                      </h5>
                      <span className="text-sm">
                        Stay connected in Malaysia with a 1GB eSIM!
                      </span>
                    </div>
                  </div>
                  <h5 className="text-md font-semibold leading-3">
                    +BDT 1715.75
                  </h5>
                </div>
                <div className="flex items-center p-4 bg-slate-100 justify-between gap-3">
                  <div className="flex items-center cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      className="accent-primary w-[16px] h-[16px]"
                    />
                    <div>
                      <h5 className="text-md font-semibold leading-3">
                        Travel eSIM 1GB
                      </h5>
                      <span className="text-sm">
                        Stay connected in Malaysia with a 1GB eSIM!
                      </span>
                    </div>
                  </div>
                  <h5 className="text-md font-semibold leading-3">
                    +BDT 1715.75
                  </h5>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ancillaries;
