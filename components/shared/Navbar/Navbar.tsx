import logo from "@/assets/images/logo/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { buttonVariants } from "@/components/ui/Button";
import { Popover, PopoverTrigger } from "@/components/ui/Popover";
import { logout } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/redux";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import useSession from "@/hooks/useSession";
import { NavbarType } from "@/types/common";
import { cn, getNameInitials } from "@/utils/common";
import { PopoverContent } from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaCircleUser, FaRegUser } from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { GrMenu } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import MobileNav from "./MobileNav";
import NavLinksDesktop from "./NavLinksDesktop";

interface INavbar {
  type?: NavbarType;
}

const Navbar: FC<INavbar> = ({ type = "static" }) => {
  const [open, setOpen] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navbarState, setNavbarState] = useState<"transparent" | "white">(
    type === "interactive" ? "transparent" : "white"
  );

  const clickRef = useRef<any>();

  const session = useSession();
  const dispatch = useAppDispatch();

  const { isPhone } = useDeviceIndicator();

  const getNavClass = useCallback(() => {
    if (navbarState === "transparent") {
      return "bg-transparent";
    } else {
      return "bg-white shadow-md";
    }
  }, [navbarState]);

  const handleScroll = () => {
    if (type === "interactive") {
      if (window.scrollY >= 50) {
        setNavbarState("white");
      } else {
        setNavbarState("transparent");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav
      ref={navbarRef}
      className={cn(
        `z-50 h-[70px] fixed duration-100 top-0 w-full`,
        getNavClass()
      )}
    >
      <div className={"mx-auto main-container h-full"}>
        <div className="md:w-auto w-full flex items-center justify-center md:justify-between h-full relative">
          <Link href="/">
            {" "}
            <Image
              src={logo}
              alt="photo"
              className="md:cursor-pointer w-[140px] md:w-[200px] h-[50px] object-contain"
            />
          </Link>

          <div
            className={cn(
              "text-2xl md:hidden absolute top-6 right-1 duration-100 z-50",
              navbarState === "transparent" ? "text-white" : "text-black"
            )}
            onClick={() => setOpen(!open)}
          >
            <GrMenu />
          </div>
          <NavLinksDesktop state={navbarState} />

          {/* mobile device */}
          <MobileNav open={open} setOpen={setOpen} />

          {session.authenticated && !isPhone && (
            <Popover>
              <PopoverTrigger>
                <div className="p-2 cursor-pointer flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={session.user?.profile_pic?.src} />
                    <AvatarFallback>
                      {getNameInitials(session.user?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <BsChevronDown />
                </div>
              </PopoverTrigger>
              <PopoverContent align="end" className="p-0 m-0">
                <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-top-md min-w-[250px]">
                  <Link
                    href={"/dashboard/profile"}
                    className="flex hover:bg-slate-100 items-center py-2 px-5 gap-2"
                  >
                    <Avatar>
                      <AvatarImage
                        width={40}
                        height={40}
                        loading="eager"
                        src={session.user?.profile_pic?.src}
                      />
                      <AvatarFallback>
                        {getNameInitials(session.user?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <h6 className="font-bold text-sm">
                      {session.user?.full_name}
                    </h6>
                  </Link>
                  <hr />
                  <div className="w-full flex flex-col divide-y divide-border">
                    <Link
                      href={"/dashboard/account"}
                      className="hover:bg-slate-100 py-1 px-5 flex items-center gap-3"
                    >
                      <FaRegUser />
                      <span>Account</span>
                    </Link>
                    <Link
                      href={"/dashboard/wallet"}
                      className="hover:bg-slate-100 py-1 px-5 flex items-center gap-3"
                    >
                      <IoWalletOutline />
                      <span>Wallet</span>
                    </Link>
                    <Link
                      href={"/dashboard/my-booking/flight"}
                      className="hover:bg-slate-100 py-1 px-5 flex items-center gap-3"
                    >
                      <FiBookmark />
                      <span>My Booking</span>
                    </Link>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(logout());
                      }}
                      href={"/"}
                      className="hover:bg-slate-100 py-1 px-5 flex items-center gap-3"
                    >
                      <IoMdLogOut />
                      <span>Logout</span>
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          {!session.authenticated && (
            <div className="hidden md:flex items-center gap-3 h-full">
              <div ref={clickRef}>
                <Link
                  href={"/auth/signin"}
                  className={cn(
                    "gap-3 !font-bold",
                    buttonVariants({ variant: "default" })
                  )}
                >
                  Login
                  <FaCircleUser className="text-xl" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
