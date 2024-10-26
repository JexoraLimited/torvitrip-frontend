import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const AllHotelBookingSelectForPagination = () => {
    return (
      <div className="relative inline-block w-32">
        <select
          className="block appearance-none w-full bg-white border-[1px] border-[#C8C8C8] hover:border-gray-500 px-[30px] py-[9px] rounded-lg leading-tight focus:outline-none focus:shadow-outline"
          name="options"
        >
          <option className="text-lg font-normal text-[#585858]" value="10">
            10
          </option>
          <option className="text-lg font-normal text-[#585858]" value="20">
            20
          </option>
          <option className="text-lg font-normal text-[#585858]" value="30">
            30
          </option>
          <option className="text-lg font-normal text-[#585858]" value="40">
            40
          </option>
          <option className="text-lg font-normal text-[#585858]" value="50">
            50
          </option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <IoIosArrowDown className='text-xl mr-4' />
        </div>
      </div>
    );
};

export default AllHotelBookingSelectForPagination;