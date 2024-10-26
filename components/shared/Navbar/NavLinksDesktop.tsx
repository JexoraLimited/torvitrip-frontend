import { nunitoSans } from "@/fonts/google";
import useHeaderLinks from "@/hooks/useHeaderLinks";
import { cn } from "@/utils/common";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
interface INavLinksDesktop {
  state: "transparent" | "white";
}

const NavLinksDesktop: FC<INavLinksDesktop> = ({ state }) => {
  const [heading, setHeading] = useState("");
  const { desktopLinks } = useHeaderLinks();

  const router = useRouter();

  const isActive = (path: string) => {
    return path === router.asPath;
  };

  return (
    <ul
      className={cn(
        "md:flex items-center hidden md:justify-between px-2 space-x-5 font-semibold",
        state === "transparent" ? "text-heading" : "text-heading"
      )}
    >
      {desktopLinks?.map((link, i) => {
        if (link.sublinks?.length) {
          return (
            <div className={nunitoSans.className} key={i}>
              <div className="px-1 text-left md:cursor-pointer group">
                <h1
                  className={cn(
                    `py-7 flex justify-between items-center gap-0 text-base normal-case`,
                    state === "transparent" ? "text-heading" : "text-heading",
                    isActive(link.link) && "text-primary"
                  )}
                  onMouseEnter={() => {
                    heading !== link.name && setHeading(link.name);
                  }}
                  onMouseLeave={() => {
                    setHeading("");
                  }}
                >
                  {link.name}
                  {link.sublinks?.length && (
                    <span className="text-xl inline ml-2">
                      <IoIosArrowDown
                        className={`duration-300 ${
                          heading === link.name ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </span>
                  )}
                </h1>
                {link.sublinks?.length && (
                  <div className="absolute top-[4.5rem] hidden group-hover:md:block hover:md:block bg-primary/10 transition-all ease-in shadow-xl">
                    <div className={`bg-white`}>
                      <div className="divide-y divide-border">
                        {link?.sublinks?.map((subcategory, i) => (
                          <div key={i} className="grid grid-cols-1">
                            <Link
                              href={subcategory.link}
                              onClick={(e) => {
                                if (subcategory.type === "no-redirect") {
                                  e.preventDefault();
                                }
                                if (subcategory.type === "click") {
                                  e.preventDefault();
                                  subcategory.onClick && subcategory.onClick(e);
                                }
                              }}
                              className="text-sm lg:text-[16px] font-semibold hover:bg-primary/10 hover:text-primary px-8 py-3 w-full block mb-0"
                            >
                              {subcategory.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else {
          return (
            <li
              key={i}
              className={cn("text-base normal-case", nunitoSans.className)}
            >
              <Link
                className={cn(
                  state === "transparent" ? "text-heading" : "text-heading",
                  isActive(link.link) && "text-primary"
                )}
                onClick={(e) => {
                  if (link.type === "no-redirect") {
                    e.preventDefault();
                  }
                  if (link.type === "click") {
                    e.preventDefault();
                    link.onClick && link.onClick(e);
                  }
                }}
                href={link.link}
              >
                {link.name}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavLinksDesktop;
