import { NavbarType } from "@/types/common";
import React, { FC } from "react";
import Footer2 from "../components/shared/Footer/Footer";
import Navbar from "../components/shared/Navbar/Navbar";
interface ILayout {
  children: React.ReactNode;
  navbar?: Boolean;
  footer?: Boolean;
  navbarType?: NavbarType;
}
//
const Layout: FC<ILayout> = ({
  children,
  navbar: navbar = true,
  footer = true,
  navbarType = "static",
}) => {
  return (
    <>
      {navbar && (
        <>
          {navbarType === "static" && (
            <div className="w-full h-[70px] mb-[70px]"></div>
          )}
          <Navbar type={navbarType} />
        </>
      )}
      <main>{children}</main>
      {footer && <Footer2 />}
    </>
  );
};

export default Layout;
