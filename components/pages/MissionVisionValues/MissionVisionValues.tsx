import React from "react";
import styles from "./MissionVissionValues.module.css";

const MissionVisionValues = () => {
  return (
    <div className={`main-container pb-20 ${styles.textStyle}`}>
      <div className={`${styles.termsBanner}`}></div>
      <h1 className="text-[2rem] my-5 text-center md:text-[3rem] font-bold text-black">
        Our Mission, Vision, Values
      </h1>
      <div className="my-5 mx-3 md:mx-0">
        <h2 className="font-semibold mb-[20px] text-[1.5rem] md:text-[2rem]">
          Mission
        </h2>
        <p className="leading-6 mb-[14px]">
          At OTA, our mission is to provide exceptional travel services,
          tailored to meet the diverse needs of our clients. We strive to offer
          personalized and comprehensive travel solutions, ensuring hassle-free
          and unforgettable journeys for every traveler.
        </p>
      </div>
      <div className="my-5 mx-3 md:mx-0">
        <h2 className="font-semibold mb-[20px] text-[1.5rem] md:text-[2rem]">
          Vision
        </h2>
        <p className="leading-6 mb-[14px]">
          Our vision is to be a leading global travel agency, recognized for our
          commitment to excellence, innovation, and customer satisfaction. We
          aim to be the go-to choice for travelers seeking reliable and
          comprehensive travel services worldwide.
        </p>
      </div>
      <div className="my-5 mx-3 md:mx-0">
        <h2 className="font-semibold mb-[20px] text-[1.5rem] md:text-[2rem]">
          Values
        </h2>
        <p className="leading-6 mb-[14px]">
          OTA, we believe in providing exceptional customer service, promoting
          responsible and sustainable travel practices, and building long-term
          relationships with our clients. We are passionate about travel and
          strive to share our knowledge and expertise to help our clients create
          unforgettable travel experiences.
        </p>
      </div>
    </div>
  );
};

export default MissionVisionValues;
