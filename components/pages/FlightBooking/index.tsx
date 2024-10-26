import { Button } from "@/components/ui/Button";
import { nunitoSans } from "@/fonts/google";
import { cn } from "@/utils/common";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { BiSolidCoupon } from "react-icons/bi";
import { FaAngleUp, FaRegClock } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import AddOnServices from "./AddOnServices";
import BookingDetails from "./BookingDetails";
import ReviewAndPayment from "./ReviewAndPayment";

const BOOKING_STEPS = [
  {
    title: "Booking details",
    id: 1,
    element: <BookingDetails />,
  },
  {
    title: "Add On Services",
    id: 2,
    element: <AddOnServices />,
  },
  {
    title: "Extra Baggages",
    id: 3,
    element: <AddOnServices />,
  },
  {
    title: "Review & Payment",
    id: 4,
    element: <ReviewAndPayment />,
  },
];

const FlightBooking = () => {
  const [airfareExpanded, setAirfareExpanded] = useState(false);
  const [activeBookingStep, setActiveBookingStep] = useState(BOOKING_STEPS[0]);

  const changeStepNumber = (id: number) => {
    const step = BOOKING_STEPS.find((step) => step.id === id);
    if (step) {
      setActiveBookingStep(step);
    }
  };

  return (
    <section
      className={cn("main-container bg-gray py-5", nunitoSans.className)}
    >
      <div className="mb-5 flex items-center h-[60px] bg-white shadow-md rounded-xl overflow-hidden">
        <div className="w-[300px] flex items-center justify-between py-3 px-4">
          <span className="flex items-center gap-3 font-semibold text-[16px]">
            <FaRegClock className="text-2xl text-secondary" /> Time remaining
          </span>
          <h3 className="text-secondary text-xl font-bold">30:00</h3>
        </div>
        <div className="flex-1 bg-slate-100 h-full flex">
          {BOOKING_STEPS.map((step) => (
            <div
              onClick={() => changeStepNumber(step.id)}
              key={step.id}
              className={cn(
                "flex-1 gap-3 flex cursor-pointer items-center justify-center",
                step.id === activeBookingStep.id
                  ? "bg-secondary/10"
                  : "bg-primary/10"
              )}
            >
              <span
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold",
                  step.id === activeBookingStep.id
                    ? "bg-secondary text-white"
                    : "bg-primary text-white"
                )}
              >
                {step.id}
              </span>
              <h5
                className={cn(
                  "font-bold",
                  step.id === activeBookingStep.id
                    ? "text-secondary"
                    : "text-primary"
                )}
              >
                {step.title}
              </h5>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-6">
        <div className="flex-1">{activeBookingStep.element}</div>
        <div className="w-[300px] flex flex-col items-center bg-white justify-between rounded-lg overflow-hidden">
          <div className="flex items-center justify-between py-3 px-[10px] bg-[#f5f7fa] w-full">
            <div className="flex items-center gap-1.5">
              <div className="w-[30px] h-[30px] relative">
                <Image
                  src={
                    "https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/BG.png"
                  }
                  alt="Airline image"
                  fill
                />
              </div>
              <div>
                <h5 className="flex gap-2 font-bold items-center">
                  DAC <GoArrowSwitch /> KUL
                </h5>
                <small className="text-[12px] text-gray-800 font-medium">
                  Round Trip 29 Nov - 12 Dec
                </small>
              </div>
            </div>
            <Button variant={"primaryLight"} size={"xs"}>
              Details
            </Button>
          </div>
          <div className="flex flex-col w-full p-2">
            <div
              onClick={() => setAirfareExpanded((expanded) => !expanded)}
              className="hover:bg-gray p-2 select-none rounded-lg cursor-pointer"
            >
              <div
                className={cn(
                  "flex h-[30px] justify-between items-center",
                  airfareExpanded && "border-b-2 border-secondary/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <MdOutlineAirplanemodeActive className="text-xl text-gray-text rotate-45" />
                  <h6 className="font-bold">Air Fare</h6>
                  <FaAngleUp className="text-xl text-gray-text" />
                </div>
                <h5 className="text-black font-bold text-[14px]">৳ 55,729</h5>
              </div>
              <motion.div
                animate={{ height: airfareExpanded ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <div className="w-full max-h-full">
                  <div className="flex items-center p-2 justify-between text-[12px]">
                    <span>1 x Basefare (Adult)</span>
                    <span>37,570 BDT</span>
                  </div>
                  <div className="flex items-center p-2 justify-between text-[12px]">
                    <span>1 x Tax (Adult)</span>
                    <span>19,860 BDT</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex p-2 items-center justify-between text-secondary text-[14px] font-bold">
              <div className="flex gap-3">
                <BiSolidCoupon className="text-xl -rotate-45" />{" "}
                <h5>Coupon Applied</h5>
              </div>
              <h5>- 2,817 BDT</h5>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 px-[10px] bg-[#f5f7fa] w-full">
            <h5 className="font-bold">Total Price</h5>
            <h4 className="font-semibold text-[18px]">৳ 52,912</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightBooking;
