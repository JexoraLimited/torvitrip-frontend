import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/utils/common";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { searchOtherData } from "../../../../data/topAirlines";

interface ISearchOtherTopAirlines extends HTMLAttributes<HTMLDivElement> {}

const SearchOtherTopAirlines: FC<ISearchOtherTopAirlines> = (props) => {
  return (
    <section {...props} className={cn("py-12", props.className)}>
      <div className="main-container">
        <SectionHeading
          title="Top Airlines"
          description="OTA's user-friendly platform connects you to top airlines instantly. Enjoy a comfortable and hassle-free journey on any destination."
          className="mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          {searchOtherData?.map((d) => {
            return (
              <div key={d?.id}>
                <Link
                  className="flex items-center shadow-md justify-between p-2 md:p-4 rounded-xl bg-white"
                  href="/"
                >
                  <div className="flex items-center">
                    <Image
                      className="w-[60px] h-[60px]"
                      src={d?.image}
                      alt=""
                    />
                    <div>
                      <h3 className="text-[#000] font-medium text-lg md:text-xl leading-5 pl-3">
                        {d?.title}
                      </h3>
                    </div>
                  </div>
                  <IoIosArrowForward fontSize={25} className="text-gray-600" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchOtherTopAirlines;
