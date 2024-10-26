import React from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import AllHotelBookingSelectForPagination from './AllHotelBookingSelectForPagination';

const AllHotelBookingPagination = () => {
    return (
      <div className="flex items-center justify-center gap-[52px] pb-[70px]">
        <div className="flex items-center justify-center gap-3">
          <p className="text-lg font-normal text-[#585858]">Per Page: </p>
          <div className="flex justify-center items-center">
            <AllHotelBookingSelectForPagination />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="text-lg font-normal text-[#585858]">First</button>
          <div className="flex items-center justify-center gap-5">
            <button>
              <MdOutlineKeyboardArrowLeft className="text-lg font-normal" />
            </button>
            <button>Previous</button>
            <button className="bg-[#2078FD] flex items-center justify-center text-[#FFF] text-lg font-normal w-[30px] rounded-full h-[30px]">
              1
            </button>
            <button className="text-lg font-normal text-[#585858]">2</button>
            <button className="text-lg font-normal text-[#585858]">3</button>
            <button className="text-lg font-normal text-[#585858]">4</button>
            <button className="text-lg font-normal text-[#585858]">...</button>
            <button className="text-lg font-normal text-[#2078FD]">Next</button>
            <button>
              <MdOutlineKeyboardArrowRight className="text-[#2078FD] text-lg font-normal" />
            </button>
          </div>
          <button className="text-lg font-normal text-[#2078FD]">Last</button>
        </div>
      </div>
    );
};

export default AllHotelBookingPagination;