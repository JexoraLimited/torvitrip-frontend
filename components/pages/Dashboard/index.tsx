import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/Accordion";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { Tab } from "@/types/common";
import { cn } from "@/utils/common";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  FaChevronDown,
  FaCreditCard,
  FaPassport,
  FaRegUser,
  FaUmbrellaBeach,
} from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { LuKeyRound } from "react-icons/lu";
import { MdFlight } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import MyAccount from "./MyAccount";
import Travelers from "./Travelers";

const Dashboard = () => {
  const router = useRouter();
  const menuSlug = router.query.slug?.[0];
  const subMenuSlug = router.query.slug?.[1];
  const { isPhone } = useDeviceIndicator();
  const tabs = useMemo<Tab[]>(
    () => [
      {
        accessible: true,
        visible: true,
        href: "account",
        icon: <FaRegUser />,
        title: "My Account",
        element: <MyAccount />,
      },
      {
        accessible: true,
        visible: true,
        href: "my-booking",
        icon: <FiBookmark />,
        title: "My Booking",
        element: <div></div>,
        submenus: [
          {
            accessible: true,
            visible: true,
            element: <div></div>,
            href: "flights",
            title: "Flights",
            icon: <MdFlight className="rotate-45" />,
          },
          {
            accessible: true,
            visible: true,
            element: <div></div>,
            href: "hotels",
            title: "Hotels",
            icon: <RiHotelLine />,
          },
          {
            accessible: true,
            visible: true,
            element: <div></div>,
            href: "holiday",
            title: "Holiday",
            icon: <FaUmbrellaBeach />,
          },
          {
            accessible: true,
            visible: true,
            element: <div></div>,
            href: "visa",
            title: "Visa",
            icon: <FaPassport />,
          },
        ],
      },
      {
        accessible: true,
        visible: true,
        href: "travelers",
        icon: <FaRegUser />,
        title: "Traveler List",
        element: <Travelers />,
      },
      {
        accessible: true,
        visible: true,
        href: "change-password",
        icon: <LuKeyRound />,
        title: "Change Password",
        element: <ChangePassword />,
      },
      {
        accessible: true,
        visible: true,
        href: "sjkfjksf",
        icon: <FaCreditCard />,
        title: "Saved Cards",
        element: <div></div>,
      },
      {
        accessible: true,
        visible: true,
        href: "delete-account",
        icon: <AiOutlineDelete />,
        title: "Delete Account",
        element: <DeleteAccount />,
      },
    ],
    []
  );
  const getActiveTab = useCallback(
    (menu?: Tab) => {
      if (!menu) {
        return tabs.find((tab) => tab.href === menuSlug && tab.accessible);
      } else {
        return menu.submenus?.find(
          (menu) => menu.href === subMenuSlug && menu.accessible
        );
      }
    },
    [menuSlug, tabs, subMenuSlug]
  );

  const getTabList = useCallback(() => {
    return tabs.filter((tab) => tab.visible);
  }, [tabs]);

  return (
    <div className="w-full main-container flex items-start gap-3 pt-5">
      {!isPhone && (
        <div className="w-[300px] sticky top-2">
          {getTabList().map((tab, i) => {
            const isTabActive = getActiveTab()?.href === tab.href;
            return (
              <>
                <Link
                  href={`/dashboard/${tab.href}/${
                    tab.submenus ? tab.submenus?.[0]?.href || "" : ""
                  }`}
                  className={cn(
                    "w-full flex font-inter relative duration-300 items-center h-[60px] font-semibold px-4 justify-between",
                    isTabActive
                      ? "bg-primary/20 text-primary"
                      : "bg-white text-[#464255] hover:text-primary"
                  )}
                  key={i}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{tab.icon}</span>
                    <h4 className={"font-inter text-lg"}>{tab.title}</h4>
                  </div>
                  {tab?.submenus && tab.submenus?.length > 0 && (
                    <FaChevronDown
                      className={cn(
                        isTabActive ? "rotate-180" : "rotate-0",
                        "duration-300"
                      )}
                    />
                  )}
                  {isTabActive && (
                    <>
                      <div className="w-1 h-full bg-primary absolute left-0 top-0"></div>
                    </>
                  )}
                </Link>
                {isTabActive && tab?.submenus && tab.submenus?.length > 0 && (
                  <div className="ml-10">
                    {tab.submenus?.map((menu) => {
                      const isActiveMenu =
                        getActiveTab(tab)?.href === menu.href;
                      return (
                        <Link
                          href={`/dashboard/${tab.href}/${menu.href}`}
                          className={cn(
                            "w-full flex font-inter relative duration-300 items-center h-[40px] gap-2 font-semibold px-4",
                            isActiveMenu
                              ? "bg-primary/10 text-primary"
                              : "bg-white text-[#464255] hover:text-primary"
                          )}
                          key={i}
                        >
                          <span className="text-md">{menu.icon}</span>
                          <h4 className={"font-inter text-sm"}>{menu.title}</h4>
                          {isActiveMenu && (
                            <>
                              <div className="w-1 h-full bg-primary absolute left-0 top-0"></div>
                            </>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}
      {isPhone && (
        <div className="w-full space-y-5">
          <Accordion
            type="single"
            collapsible
            defaultValue={getActiveTab()?.href}
          >
            {getTabList().map((tab, i) => {
              const isTabActive = getActiveTab()?.href === tab.href;
              return (
                <AccordionItem
                  key={i}
                  value={tab.href}
                  className="shadow-none border-none"
                >
                  <AccordionTrigger
                    onClick={() =>
                      router.push(
                        `/dashboard/${tab.href}/${
                          tab.submenus ? tab.submenus?.[0]?.href || "" : ""
                        }`
                      )
                    }
                    className={cn(
                      "flex items-center justify-between relative w-full gap-3 px-4 py-3 rounded-3xl group",
                      isTabActive
                        ? "bg-primary/20 text-primary"
                        : "bg-white text-[#464255]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {tab.icon}
                      <h6 className="text-center font-bold">{tab.title}</h6>
                    </div>
                    <FaChevronDown
                      className={cn(
                        isTabActive
                          ? "group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0"
                          : "rotate-0",
                        "duration-300"
                      )}
                    />
                  </AccordionTrigger>
                  <AccordionContent>{tab.element}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      )}
      {!isPhone && (
        <div className="flex-1 bg-white border border-border">
          {getActiveTab()?.element}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
