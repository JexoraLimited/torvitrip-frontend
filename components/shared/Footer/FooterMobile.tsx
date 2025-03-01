import logo from "@/assets/images/logo/logo-bottom.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { SwiperSlide } from "swiper/react";
import CardSlider from "../CardSlider/CardSlider";
import styles from "./Footer.module.css";

const FooterMobile = () => {
  const [activeSlideNumber, setActiveSlideNumber] = useState<number>(1);
  const [totalSlides, setTotalSlides] = useState<number>(0);
  return (
    <div className="block md:hidden main-container">
      <div className="flex items-center justify-center gap-3 mb-8">
        {activeSlideNumber}/{totalSlides}
      </div>
      <CardSlider
        setActiveSlideNumber={setActiveSlideNumber}
        setTotalSlides={setTotalSlides}
      >
        <SwiperSlide className="px-[20px] mb-3">
          <div>
            <Image
              src={logo}
              alt="logo"
              style={{
                objectFit: "contain",
                width: "180px",
                margin: "0 0 25px 0",
              }}
            />
            <p className="section-description" style={{ color: "white" }}>
              TorviTrip is a one-stop shop for all your travel needs.{" "}
              <span className="font-bold text-primary">Since 2023</span>, We
              offer a wide range of travel services, including flights, hotels,
              holidays, and Visa Processing. We are committed to providing our
              customers with the best possible travel experience.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="px-[20px] mb-3">
          <div>
            <h3 className="text-3xl mb-3">About TorviTrip</h3>
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
        </SwiperSlide>
        <SwiperSlide className="px-[20px] mb-3">
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
        </SwiperSlide>
        <SwiperSlide className="px-[20px] mb-3">
          <div>
            <h3 className="text-3xl mb-3">Address</h3>
            <ul className={`${styles.quickLinks}`}>
              <li className={`${styles.quickLinksFlex}`}>
                <span>
                  <MdLocationOn fontSize={20} />
                </span>
                <a rel="noreferrer">
                  18/7 Giridhara, Matuail, Kadamtali, Dhaka - 1362
                </a>
              </li>
              <li className={`${styles.quickLinksFlex}`}>
                <span>
                  <IoIosCall fontSize={20} />
                </span>
                <a href="tel:+8809638807682">Hotline: +8809638 807 682</a>
              </li>
              <li className={`${styles.quickLinksFlex}`}>
                <span>
                  <MdEmail fontSize={18} />
                </span>
                <a href="mailto:torvitrip@gmail.com">torvitrip@gmail.com</a>
              </li>
            </ul>
          </div>
        </SwiperSlide>
      </CardSlider>
    </div>
  );
};

export default FooterMobile;
