import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import HR from "@/components/ui/HR/HR";
import { logout } from "@/features/auth/authSlice";
import { nunitoSans, openSans } from "@/fonts/google";
import { useAppDispatch } from "@/hooks/redux";
import useHeaderLinks from "@/hooks/useHeaderLinks";
import useSession from "@/hooks/useSession";
import { cn, getNameInitials } from "@/utils/common";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { IoIosArrowDown, IoMdLogOut } from "react-icons/io";
import { IoCloseOutline, IoWalletOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import styles from "./Navbar.module.css";

const MobileNav = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const [dropDownIndex, setDropDownIndex] = useState<number | undefined>(
    undefined
  );
  const { mobileCardViewLinks, nonMobileCardViewLinks } = useHeaderLinks();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const extraPhoneLinks = [
    {
      name: "Login",
      link: "/auth/signin",
      type: "unauthenticated",
      icon: <FaRegUser className="text-xl" />,
    },
    {
      name: "Account",
      link: "/dashboard/account",
      type: "authenticated",
      icon: <FaRegUser className="text-xl" />,
    },
    {
      name: "Wallet",
      link: "/dashboard/wallet",
      type: "authenticated",
      icon: <IoWalletOutline className="text-xl" />,
    },
    {
      name: "My Booking",
      link: "/dashboard/my-booking",
      type: "authenticated",
      icon: <FiBookmark className="text-xl" />,
    },
    {
      name: "Support",
      link: "/support",
      type: "both",
      icon: <MdSupportAgent className="text-xl" />,
    },
  ];

  const session = useSession();

  useEffect(() => {
    setOpen(false);
  }, [router.pathname, setOpen]);

  return (
    <>
      <div
        className={cn(
          `md:hidden w-full fixed top-0 bottom-0 duration-500 z-[9999]`,
          open ? "left-0" : "left-[-100%]",
          nunitoSans.className
        )}
      >
        <div className="w-full relative h-full bg-gray-background">
          <div className="absolute top-3 right-3">
            <IoCloseOutline
              onClick={() => setOpen(false)}
              className="font-bold text-[35px] text-gray-500"
            />
          </div>
          <div className="overflow-y-auto h-screen">
            {/* <TopNav handleCloseMobileMenu={() => setOpen(false)} /> */}
            <div className="mt-16 grid grid-cols-4 gap-2 px-5">
              {mobileCardViewLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.link}
                  className="flex items-center justify-center flex-col gap-1 rounded-lg bg-white py-3 shadow-md"
                  onClick={(e) => {
                    if (link.type === "no-redirect") {
                      e.preventDefault();
                    }
                    if (link.type === "click") {
                      e.preventDefault();
                      link.onClick && link.onClick(e);
                    }
                  }}
                >
                  <Image
                    src={link.mobileCardImage || ""}
                    alt={link.name}
                    width={32}
                    height={32}
                  />
                  <h5 className="font-medium text-sm">{link.name}</h5>
                </Link>
              ))}
            </div>
            <ul className="mt-5">
              {nonMobileCardViewLinks.map((link, i) => {
                return (
                  <React.Fragment key={i}>
                    <li
                      onClick={(e) => {
                        if (link.type === "no-redirect") {
                          e.preventDefault();
                        }
                        if (link.type === "click") {
                          e.preventDefault();
                          link.onClick && link.onClick(e);
                        }
                        if (link.sublinks?.length) {
                          if (dropDownIndex === i) {
                            setDropDownIndex(undefined);
                          } else {
                            setDropDownIndex(i);
                          }
                        } else {
                          if (link.type === "redirect") {
                            router.push(link.link);
                          }
                        }
                      }}
                      className={`flex ${styles.navLink} items-center  cursor-pointer justify-between px-[24px] py-[12px]`}
                    >
                      <h4
                        className={cn(
                          "text-[18px] duration-300",
                          openSans.className,
                          dropDownIndex === i ? "text-primary" : "text-black"
                        )}
                      >
                        {link.name}
                      </h4>
                      {link.sublinks?.length && (
                        <IoIosArrowDown
                          className={`duration-300 ${
                            dropDownIndex === i
                              ? "rotate-180 text-primary"
                              : "rotate-0"
                          }`}
                          fontSize={25}
                        />
                      )}
                    </li>
                    {link.sublinks?.length && (
                      <motion.ul
                        className={"pl-6 overflow-hidden"}
                        animate={{
                          height: dropDownIndex === i ? "auto" : "0px",
                        }}
                      >
                        {link.sublinks.map((subLink, i) => (
                          <li className="py-2 px-5 text-secondary" key={i}>
                            <Link
                              onClick={(e) => {
                                if (subLink.type === "no-redirect") {
                                  e.preventDefault();
                                }
                                if (subLink.type === "click") {
                                  e.preventDefault();
                                  subLink.onClick && subLink.onClick(e);
                                }
                              }}
                              href={subLink.link}
                            >
                              {subLink.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
            <HR style={{ width: "90%" }} />
            {session.authenticated && (
              <motion.div className="mt-5 px-5 w-full gap-2 flex items-center justify-between">
                <div className="flex w-4/5 items-center gap-2 flex-grow">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={session.user?.profile_pic?.src} />
                    <AvatarFallback>
                      {getNameInitials(session.user?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <h5 className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                    {session.user?.full_name}
                  </h5>
                </div>
                <div
                  onClick={() => {
                    dispatch(logout());
                    setOpen(false);
                  }}
                  className="w-12 h-12 flex items-center justify-center bg-secondary/50 text-white rounded-full"
                >
                  <IoMdLogOut className="text-2xl" />
                </div>
              </motion.div>
            )}
            <div className="mt-5 grid grid-cols-4 gap-2 px-5">
              {extraPhoneLinks.map((l, i) => {
                if (session.authenticated && l.type === "unauthenticated")
                  return null;
                if (!session.authenticated && l.type === "authenticated")
                  return null;
                return (
                  <Link
                    key={i}
                    href={l.link}
                    className="flex items-center justify-center flex-col gap-1 rounded-lg bg-white py-3 shadow-md"
                  >
                    {l.icon}
                    <h5 className="font-medium text-xs">{l.name}</h5>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* cross */}
      </div>

      <div
        className={`${styles.menuShadow} ${open && styles.menuActive}`}
      ></div>
    </>
  );
};

export default MobileNav;
