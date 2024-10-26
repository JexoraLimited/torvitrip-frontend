import bimafy from "@/assets/images/icons/Bimafy.png";
import notTaken from "@/assets/images/icons/untaken.png";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/common";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdClose } from "react-icons/md";

const TravelInsurance = () => {
  const [dropdownActive, setDropdownActive] = useState(true);
  const [insuranceTaken, setInsuranceTaken] = useState(true);
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
              <div className="flex items-center gap-3">
                <div
                  onClick={() => setInsuranceTaken(true)}
                  className={cn(
                    "flex-1 p-4 cursor-pointer rounded-lg border border-border bg-slate-100",
                    insuranceTaken && "border-secondary bg-secondary/10"
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
                  onClick={() => setInsuranceTaken(false)}
                  className={cn(
                    "flex-1 p-4 cursor-pointer rounded-lg border border-border bg-slate-100",
                    !insuranceTaken && "border-secondary bg-secondary/10"
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
              {!insuranceTaken && (
                <div className="w-full mt-5">
                  <div className="w-full divide-y rounded-lg border border-border">
                    <div className="flex items-stretch divide-x">
                      <div className="flex-1 py-3 px-4 bg-slate-100">
                        <h5 className="font-semibold text-sm">
                          Hospitalization Coverage (Illnesses)
                        </h5>
                      </div>
                      <div className="flex-1 py-3 px-4 bg-slate-50">
                        <MdClose className="text-red-500 text-xl mx-auto block" />
                      </div>
                    </div>
                    <div className="flex items-stretch divide-x">
                      <div className="flex-1 py-3 px-4 bg-slate-100">
                        <h5 className="font-semibold text-sm">
                          Outdoor Treatment
                        </h5>
                      </div>
                      <div className="flex-1 py-3 px-4 bg-slate-50">
                        <MdClose className="text-red-500 text-xl mx-auto block" />
                      </div>
                    </div>
                    <div className="flex items-stretch divide-x">
                      <div className="flex-1 py-3 px-4 bg-slate-100">
                        <h5 className="font-semibold text-sm">
                          Personal Accident Coverage
                        </h5>
                      </div>
                      <div className="flex-1 py-3 px-4 bg-slate-50">
                        <MdClose className="text-red-500 text-xl mx-auto block" />
                      </div>
                    </div>
                    <div className="flex items-stretch divide-x">
                      <div className="flex-1 py-3 px-4 bg-slate-100">
                        <h5 className="font-semibold text-sm">
                          Emergency Transportation
                        </h5>
                      </div>
                      <div className="flex-1 py-3 px-4 bg-slate-50">
                        <MdClose className="text-red-500 text-xl mx-auto block" />
                      </div>
                    </div>
                    <div className="flex items-stretch divide-x">
                      <div className="flex-1 py-3 px-4 bg-slate-100">
                        <h5 className="font-semibold text-sm">
                          Death And Funeral Coverage
                        </h5>
                      </div>
                      <div className="flex-1 py-3 px-4 bg-slate-50">
                        <MdClose className="text-red-500 text-xl mx-auto block" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {insuranceTaken && (
                <>
                  <div className="py-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      What you will get?
                    </h3>
                    <Button
                      size={"sm"}
                      variant={"primaryText"}
                      className="pr-0"
                    >
                      Learn More <IoIosArrowForward />
                    </Button>
                  </div>
                  <div className="w-full">
                    <div className="w-full divide-y rounded-lg border border-border">
                      <div className="flex items-stretch divide-x">
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-100"></div>
                        <div className="flex-1 py-3 px-4 flex justify-center items-center bg-slate-50">
                          <h5 className="font-bold text-center text-primary text-sm">
                            Protect My Baggage
                          </h5>
                        </div>
                      </div>
                      <div className="flex items-stretch divide-x">
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-100">
                          <h5 className="font-semibold text-sm">
                            Guaranteed Payment (Service Satisfaction Guarantee
                            Limit Of Liability (BDT 66,000))
                          </h5>
                        </div>
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-50">
                          <MdClose className="text-red-500 text-xl mx-auto block" />
                        </div>
                      </div>
                      <div className="flex items-stretch divide-x">
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-100">
                          <h5 className="font-semibold text-sm">
                            Email Tracking
                          </h5>
                        </div>
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-50">
                          <MdClose className="text-red-500 text-xl mx-auto block" />
                        </div>
                      </div>
                      <div className="flex items-stretch divide-x">
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-100">
                          <h5 className="font-semibold text-sm">
                            SMS Tracking
                          </h5>
                        </div>
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-50">
                          <MdClose className="text-red-500 text-xl mx-auto block" />
                        </div>
                      </div>
                      <div className="flex items-stretch divide-x">
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-100">
                          <h5 className="font-semibold text-sm">
                            Need Proof Of Content In Bag?
                          </h5>
                        </div>
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-50">
                          <MdClose className="text-red-500 text-xl mx-auto block" />
                        </div>
                      </div>
                      <div className="flex items-stretch divide-x">
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-100"></div>
                        <div className="flex-1 py-3 px-4 flex items-center bg-slate-50 flex-col">
                          <Button
                            variant={"default"}
                            size={"sm"}
                            className="cursor-default"
                          >
                            Selected
                          </Button>
                          <h5 className="text-primary mt-2 font-semibold">
                            ৳ 330.00
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelInsurance;
