import socialLinks from "@/data/socialLinks";
import Image from "next/image";
import styles from "./Footer.module.css";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

const Footer = () => {
  return (
    <>
      <div className="bg-white custom-shadow w-full">
        <div className="md:mx-auto flex flex-col md:flex-row justify-center md:gap-8 gap-3 items-center py-5 md:py-9 px-4 md:px-0">
          <h3 className="text-lg md:text-2xl font-semibold leading-8 text-[#030F20]">
            Follow OTA
          </h3>
          <div className={styles.socialIconsContainer}>
            {socialLinks.map((s, index: number) => (
              <a key={index} href={s.href}>
                <Image src={s.img} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-[#0B3155] text-white py-8">
        <FooterDesktop />
        <FooterMobile />
        <div className="main-container">
          <div
            style={{
              height: "1px",
              width: "100%",
              background: "white",
            }}
          ></div>
          <h3 className="text-center mt-5">
            &copy; {new Date().getFullYear()} OTA. All rights reserved.
          </h3>
        </div>
      </footer>
    </>
  );
};
// max-w-[1920px]
export default Footer;
