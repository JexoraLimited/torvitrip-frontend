import logo from "@/assets/images/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoIosCall } from "react-icons/io";
import { MdEmail, MdLocationOn } from "react-icons/md";
import styles from "./Footer.module.css";

const FooterDesktop = () => {
  return (
    <div className="hidden md:block main-container">
      <div className={`${styles.footerGridContainer}`}>
        <div className="mr-5">
          <Image
            src={logo}
            alt="logo"
            style={{
              objectFit: "contain",
              width: "200px",
              margin: "0 0 25px 0",
            }}
          />
          <p className="section-description" style={{ color: "white" }}>
            OTA is a one-stop shop for all your travel needs.{" "}
            <span className="font-bold text-primary">Since 2023</span>, We offer
            a wide range of travel services, including flights, hotels,
            holidays, and Visa Processing. We are committed to providing our
            customers with the best possible travel experience.
          </p>
        </div>
        <div>
          <h3 className="text-3xl mb-3">About OTA</h3>
          <ul className={styles.quickLinks}>
            <li>
              <Link href={"/about"}>About us</Link>
            </li>
            <li>
              <Link href={"/mission-vision-values"}>
                Our Mission, Vision, & Values
              </Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact us</Link>
            </li>
            <li>
              <Link href={"/terms-and-conditions"}>Terms & Conditions</Link>
            </li>
            <li>
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-3xl mb-3">Quick Links</h3>
          <ul className={styles.quickLinks}>
            <li>
              <Link href={"/news"}>News & Media</Link>
            </li>
            <li>
              <Link href={"/promotions"}>Promotions</Link>
            </li>
            <li>
              <Link href={"/blogs"}>Blogs</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-3xl mb-3">Address</h3>
          <ul className={`${styles.quickLinks}`}>
            <li className={`${styles.quickLinksFlex}`}>
              <span>
                <MdLocationOn fontSize={20} />
              </span>
              <a rel="noreferrer">
                18/7 Giridhara A/A, Dhaka South City Corporation,
                <br /> Matuail, Kadamtali, Dhaka - 1362
              </a>
            </li>
            <li className={`${styles.quickLinksFlex}`}>
              <span>
                <IoIosCall fontSize={20} />
              </span>
              <a href="tel:+8809611311629">Hotline: +88 09611-311 629</a>
            </li>
            <li className={`${styles.quickLinksFlex}`}>
              <span>
                <MdEmail fontSize={18} />
              </span>
              <a href="mailto:OTAltd@gmail.com">OTAltd@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterDesktop;
