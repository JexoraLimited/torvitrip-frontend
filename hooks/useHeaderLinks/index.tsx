import { useMemo } from "react";

import holiday from "@/assets/images/icons/beach.png";
import hotel from "@/assets/images/icons/hotel.png";
import flight from "@/assets/images/icons/plane.png";
import umrah from "@/assets/images/icons/umrah.png";

import { StaticImageData } from "next/image";

type MenuType = "redirect" | "no-redirect" | "click";

export interface NavLinksType {
  name: string;
  link: string;
  type: MenuType;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLLIElement>) => void;
  mobileCardView?: boolean;
  mobileCardImage?: StaticImageData | string;
  view: ("mobile" | "desktop")[];
  sublinks?: {
    name: string;
    link: string;
    type: MenuType;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLLIElement>) => void;
  }[];
}

const useHeaderLinks = () => {
  const links = useMemo<NavLinksType[]>(
    () => [
      {
        name: "Flight",
        link: "/flight",
        type: "redirect",
        mobileCardView: true,
        mobileCardImage: flight,
        view: ["mobile", "desktop"],
      },
      {
        name: "Hotel",
        link: "/hotel",
        type: "redirect",
        mobileCardView: true,
        mobileCardImage: hotel,
        view: ["mobile", "desktop"],
      },
      {
        name: "Holiday",
        link: "/holiday",
        type: "redirect",
        mobileCardView: true,
        mobileCardImage: holiday,
        view: ["mobile", "desktop"],
      },
      {
        name: "Umrah",
        link: "/umrah-packages/view-all",
        type: "redirect",
        mobileCardView: true,
        mobileCardImage: umrah,
        view: ["mobile", "desktop"],
      },
      // {
      //   id: "p1",
      //   name: "Booking",
      //   link: "/under-construction",
      //   sublinks: [
      //     {
      //       id: "s1",
      //       name: "Flight Booking",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s2",
      //       name: "Hotel Booking",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s3",
      //       name: "Train Tickets",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s4",
      //       name: "Bus Tickets",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s5",
      //       name: "Event Tickets",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s6",
      //       name: "Cruise Booking",
      //       link: "/under-construction",
      //     },
      //   ],
      // },
      // {
      //   id: "p2",
      //   name: "Hire Transfers",
      //   link: "/under-construction",
      //   sublinks: [
      //     {
      //       id: "s1",
      //       name: "Ride Sharing",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s2",
      //       name: "Car Rentals",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s3",
      //       name: "Bus Rentals",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s4",
      //       name: "Shuttle Services",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s5",
      //       name: "Truck Rentals",
      //       link: "/under-construction",
      //     },
      //   ],
      // },
      // {
      //   id: "p3",
      //   name: "Tours",
      //   link: "/under-construction",
      //   sublinks: [
      //     {
      //       id: "s1",
      //       name: "Tour Packages",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s2",
      //       name: "Corporate Tours",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s3",
      //       name: "Group Tours",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s4",
      //       name: "Tour Guides",
      //       link: "/under-construction",
      //     },
      //   ],
      // },
      // {
      //   id: "p4",
      //   name: "Visa",
      //   link: "/under-construction",
      //   sublinks: [
      //     {
      //       id: "s1",
      //       name: "Tourist Visa",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s2",
      //       name: "Student Visa",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s3",
      //       name: "Work Visa",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s4",
      //       name: "Medical Visa",
      //       link: "/under-construction",
      //     },
      //   ],
      // },
      // {
      //   id: "p5",
      //   name: "Umrah",
      //   link: "/under-construction",
      // },
      // {
      //   id: "p6",
      //   name: "Courier & Parcel",
      //   link: "/under-construction",
      //   sublinks: [
      //     {
      //       id: "s1",
      //       name: "Local delivery",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s2",
      //       name: "International Shipping",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s3",
      //       name: "Parcel Deliveries",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s4",
      //       name: "Logistic Deliveries",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s5",
      //       name: "E-commerce Deliveries",
      //       link: "/under-construction",
      //     },
      //     {
      //       id: "s6",
      //       name: "Food Deliveries",
      //       link: "/under-construction",
      //     },
      //   ],
      // },
    ],
    []
  );

  const desktopLinks = links.filter((link) => link.view.includes("desktop"));
  const mobileLinks = links.filter((link) => link.view.includes("mobile"));
  const mobileCardViewLinks = links.filter((link) => link.mobileCardView);
  const nonMobileCardViewLinks = links.filter((link) => !link.mobileCardView);
  return {
    links,
    desktopLinks,
    mobileLinks,
    mobileCardViewLinks,
    nonMobileCardViewLinks,
  };
};

export default useHeaderLinks;
