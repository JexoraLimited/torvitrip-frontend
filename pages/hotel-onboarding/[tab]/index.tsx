import logoImg from "@/assets/images/logo/logo.png";
import { cn } from "@/utils/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaSquareCheck } from "react-icons/fa6";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaFileContractSolid } from "react-icons/lia";
import {
  MdOutlineFormatListBulleted,
  MdOutlineMeetingRoom,
  MdOutlinePhotoSizeSelectActual,
} from "react-icons/md";

const HotelOnboardingPage = () => {
  const router = useRouter();

  const menus = useMemo(
    () => [
      {
        title: "Property Contract",
        href: "property-contract",
        id: 1,
        icon: <LiaFileContractSolid />,
        completed: true,
        disabled: false,
        visible: true,
      },
      {
        title: "Policies and Settings",
        href: "policies",
        id: 2,
        completed: true,
        icon: <IoSettingsOutline />,
        disabled: false,
        visible: true,
      },
      {
        title: "Property Amenities",
        href: "amenities",
        id: 3,
        completed: false,
        icon: <MdOutlineFormatListBulleted />,
        disabled: false,
        visible: true,
      },
      {
        title: "Rooms & Rates",
        href: "rates",
        id: 4,
        completed: false,
        icon: <MdOutlineMeetingRoom />,
        disabled: false,
        visible: true,
      },
      {
        title: "Photos",
        href: "photos",
        id: 5,
        completed: false,
        icon: <MdOutlinePhotoSizeSelectActual />,
        disabled: false,
        visible: true,
      },
      {
        title: "Taxes",
        href: "taxes",
        id: 6,
        completed: false,
        icon: <HiOutlineReceiptTax />,
        disabled: false,
        visible: true,
      },
      {
        title: "Review",
        href: "review",
        id: 7,
        completed: false,
        icon: <FaRegCheckCircle />,
        disabled: false,
        visible: true,
      },
    ],
    []
  );

  const getAllMenus = useCallback(() => {
    const all = menus.filter((menu) => menu.visible);
    return all;
  }, [menus]);

  const getActiveMenu = useCallback(() => {
    const tab = router.query.tab;

    console.log(tab);

    const active = menus.find((menu) => menu.href === tab);
    return active;
  }, [router.query]);

  const activeMenu = getActiveMenu();

  return (
    <div className="w-full h-screen">
      <div className="w-full h-[70px] bg-primary"></div>
      <div className="w-full bg-slate-200 flex gap-3 h-[calc(100vh_-_70px)]">
        <div className="w-[350px] bg-white h-full custom-scrollbar overflow-y-auto">
          <div className="pt-8 pb-6 border-b border-neutral-200">
            <Image
              src={logoImg}
              alt="Logo image"
              width={150}
              height={70}
              className="object-contain mx-auto"
            />
          </div>
          <div className="w-full font-inter space-y-1 pt-5">
            {getAllMenus().map((menu, i) => {
              return (
                <Link
                  key={i}
                  href={menu.href}
                  className="pl-8 pr-5 block relative"
                >
                  <div
                    className={cn(
                      "w-full hover:bg-primary/20 hover:text-primary p-4 rounded-lg text-lg font-medium h-full flex items-center gap-3 justify-between",
                      activeMenu?.id === menu.id
                        ? "bg-primary/20 text-primary"
                        : "bg-transparent text-gray-900"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{menu.icon}</span>
                      <span>{menu.title}</span>
                    </div>
                    {menu.completed && (
                      <div className="flex items-center justify-center text-primary text-xl h-full">
                        <FaSquareCheck />
                      </div>
                    )}
                  </div>
                  {activeMenu?.id === menu.id && (
                    <div className="absolute left-0 top-0 w-[10px] h-full bg-primary rounded-lg"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex-1 h-full overflow-y-auto bg-white"></div>
      </div>
    </div>
  );
};

export default HotelOnboardingPage;
