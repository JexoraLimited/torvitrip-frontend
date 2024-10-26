import Link from "next/link";
import styles from "./TermsAndConditions.module.css";

const Terms = () => {
  return (
    <div className={`main-container pb-20 ${styles.textStyle}`}>
      <div className={`${styles.termsBanner}`}>
        <h1 className="text-[1.5rem] md:text-[2.5rem] pt-[5rem] pb-[3rem] font-bold text-black mx-3 md:mx-0">
          Terms & Conditions
        </h1>
      </div>
      <div className="text-[16px] mt-10 leading-6 mx-3 md:mx-0">
        <p className="pb-3">
          <strong>Introductions: </strong>
          {
            "Terms & Conditions (T&C) that follow in this article, as may be revised from time to time, are applicable to all our services available online or offline. These terms and conditions are applicable to the services we provide for personal, non-commercial use of our services. These T&C will not be applicable to our relationship with other commercial service providers (B2B) that we have an affiliation with."
          }
        </p>
        <p className="pb-3">
          <strong>Refund Modality: </strong>
          {
            "Refund Modality: The company will refund the money exactly the way it was received. The Refund process will be the same as per the Payment modality. However, claiming refunds for any purchases made through MFS (Mobile Financial Services) e.g. Bkash, Nagad, Rocket etc will incur a service/cash-out charge which has to be borne by the customer. The charge amount will vary according to the MFS availed during the purchase."
          }
        </p>
        <p className="pb-3">
          <strong>Auto Refund & Auto Void: Terms & Conditions</strong>
          <br />
          {
            "OTA customers can now claim Refund and Void automatically from App/Web"
          }
        </p>
        <ul className="list-disc pl-5 pb-3">
          <li>An airline refund charge will be applicable.</li>
          <li>ST Convenience will be applicable.</li>
          <li>
            The refund may take upto 4-6 weeks from the date of applying for an
            auto refund.
          </li>
          <li>
            The company will refund the money exactly the way it was received.
            The Refund process will be the same as per the Payment modality.
          </li>
          <li>
            However, claiming refunds for any purchases made through MFS (Mobile
            Financial Services) e.g. Bkash, Nagad, Rocket etc will incur a
            service/cash-out charge which has to be borne by the customer. The
            charge amount will vary according to the MFS availed during the
            purchase. Refund applicable only on refundable travel services.
          </li>
          <li>
            Refund modality will be as per the carrier, airlines, hotel, vendor,
            and service provider.
          </li>
          <li>
            If the flight is within 24 hours of the refund application, a
            no-show charge will be applicable.
          </li>
          <li>
            Payment void will not be applicable for flights on the same calendar
            date.
          </li>
          <li>
            Payment void will not be applicable on Low-Cost Carrier flights like
            Jazeera Airways, Air Arabia, Air Asia, Indigo, SpiceJet etc
          </li>
          <li>
            Payment void will be made exactly the same way it was received.
          </li>
          <li>Payment void may take upto 72 hours</li>
        </ul>
        <p className="pb-3">
          <strong>Important: </strong>
          {
            "Due to Covid-19, Airline has the authority to cancel and/or reschedule the flight at any time. The destination you’re travelling to might be under the Covid-19 travel restriction. Please check health advisories before you travel. In case of cancellation/reschedule airline policy and ST convenience fee will be applicable."
          }
          <br />
          {
            "Currently, we are handling large volumes of inquiries and therefore may take longer than usual to respond."
          }
        </p>
        <p className="pb-3">
          <strong>Use of the Services: </strong>
          {
            "As a condition of using our services, you attest that you are at least 18 years of age. You intend to use our services in accordance with these terms and conditions and you will only book services from us with true and accurate information. If you book services for any other person except you, you are responsible for informing that person about our terms and conditions."
          }
        </p>
        <p className="pb-3">
          <strong>Deleting your OTA Account: </strong>
          <br />
          {
            "Users can delete their accounts at any time through the Profile>Manage Data>Delete Account in the OTA app. If you submit a request to delete your account, it will be completely deleted within 72 hours."
          }
        </p>
        <p className="pb-3">
          <strong>
            In case of deleting data collected from social media platforms such
            as facebook, users have to delete data through their facebook
            account. For more details, user’s can visit this{" "}
            <Link href="/" className="text-[#1882FF] hover:text-[#3474bd]">
              link
            </Link>
            .{" "}
          </strong>
          <br />
          {
            "Deleting your account will erase all associated information, including your Booking history, Favourite Guestlist, Saved Cards, Trip Coins, and so on. You can re-register using the same email address and phone number. However, you will be registered as a new user, and your previous existing user data will be deleted."
          }
        </p>
        <p className="pb-3">
          <strong>ST Convenience fee: </strong>
          {
            "It is the charge that the customer needs to pay for the support, convenience and service that he/she is availing from the online platforms."
          }
        </p>
        <div className="pb-3">
          <strong>Flight: </strong>
          <p className="pb-2">
            {
              "Clients can book tickets all over the world using our state-of-the-art app and website. The client can use any local or international debit or credit card to pay for the flight after booking from the Website or App."
            }
          </p>
        </div>
        <p className="pb-2">
          {
            "The refund amount will be disbursed after deducting the OTA service fee. Please note that it takes a minimum of 10-12 bank working weeks to complete the refund process. This is not applicable for non-refundable tickets."
          }
        </p>
        <p className="pb-2">
          {"* OTA convenience fee is non-refundable for online purchases."}
        </p>
        <p className="pb-2">
          {
            "* In case of cancellation of Bangladesh Biman Airlines flight, the refund will be processed within a minimum of 12 bank working weeks as per airlines policy."
          }
        </p>
        <p className="pb-2">
          {
            "* For Saudia Airlines flights, the refund will be processed within a minimum of 12 bank working weeks as per airlines policy."
          }
        </p>
        <p className="pb-2">
          {
            "* In the case of Air India half portion flight refund, the refund will be processed within a minimum of 12 bank working weeks as per airlines policy."
          }
        </p>
        <p className="pb-2">
          {
            "* In case of changing the date of your flight, we first look into that particular airline's policy."
          }
        </p>
        <p className="pb-2">
          {"* Cancellation and refund policies differ from airline to airline."}
        </p>
        <p className="pb-2">
          {
            "* For cancellation by Airline, OTA will not charge any additional fees.  For voluntary cancellation charges are applicable and given below (effective from 11th January 2023)"
          }
        </p>

        <table className="table-auto md:w-4/5 mx-auto my-10">
          <thead className="">
            <tr>
              <th className="border border-black text-center">
                Type of Service
              </th>
              <th className="border border-black text-center">
                Airline Charge
              </th>
              <th className="border border-black text-center">
                ST Service Charge (Domestic)
              </th>
              <th className="border border-black text-center">
                ST Service Charge (International)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black font-bold">Refund</td>
              <td className="border border-black">As per Airline Policy</td>
              <td className="border border-black">
                BDT 300 (Adult)
                <br />
                BDT 300 (Child)
                <br />
                BDT 0 (Infant)
              </td>
              <td className="border border-black">
                BDT 1500 (Adult)
                <br />
                BDT 1500 (Child)
                <br />
                BDT 0 (Infant)
              </td>
            </tr>
            <tr>
              <td className="border border-black font-bold">Refund</td>
              <td className="border border-black">As per Airline Policy</td>
              <td className="border border-black">
                BDT 200 (Adult)
                <br />
                BDT 200 (Child)
                <br />
                BDT 0 (Infant)
              </td>
              <td className="border border-black">
                BDT 500 (Adult)
                <br />
                BDT 500 (Child)
                <br />
                BDT 0 (Infant)
              </td>
            </tr>
            <tr>
              <td className="border border-black font-bold">Refund</td>
              <td className="border border-black">As per Airline Policy</td>
              <td className="border border-black">
                BDT 300 (Adult)
                <br />
                BDT 300 (Child)
                <br />
                BDT 0 (Infant)
              </td>
              <td className="border border-black">
                BDT 1000 (Adult)
                <br />
                BDT 1000 (Child)
                <br />
                BDT 0 (Infant)
              </td>
            </tr>
          </tbody>
        </table>

        <p className="pb-2">
          {
            "* For cancellations and refunds, we always follow the airline's refund policy. The airline solely holds the right to change any policy. OTA has no control over the airline's policy."
          }
        </p>
        <p className="pb-2">
          {
            "* For any refund/cancellation/date change-related queries kindly email us at flight@OTA.net. "
          }
        </p>
        <p className="pb-2">
          {
            "* If airlines increase the fare of a ticket during the booking period, a client has to pay the additional amount, else we will refund the paid amount."
          }
        </p>
        <p className="pb-2">
          {
            "* In case of date change/re-issue of the ticket for a child who will be crossing the child age to adult (as per airline policy) in the new travel date, a new charge of the ticket will be the difference of airfare, plus a date change fee of an adult along with any other charges applicable as per airline policy."
          }
        </p>

        <p className="pb-3 pt-3">
          <strong>
            Important Notice! One-way & Round Trip flight ticket issuance
          </strong>
        </p>
        <ul className="list-decimal pl-5">
          <li className="pb-2">
            Please upload the accurate & proper Passport and Visa copy.
          </li>
          <li className="pb-2">
            When purchasing ticket from OTA, it is mandatory to upload copy of
            your passport and visa. Failure to provide the required documents
            will result in cancellation of your booking by J Travel. OTA
            reserves the right to cancel any booking if the necessary documents
            are not received within the stipulated time frame.
          </li>
          <li className="pb-2">
            Please provide the Surname and Given Name accurately as per your
            Passport. After ticket issuance, name change is not possible
          </li>
          <li className="pb-2">
            Please check the Country Restriction and Airline Policy before any
            instant ticket purchase.
          </li>
          <li className="pb-2">
            Please check the Airline Fare rules - Refundable or Non-refundable &
            Changeable/Non-changeable before any instant ticket purchase.
          </li>
          <li className="pb-2">
            OTA will not be liable for any improper/Fake document submission by
            the agent or the passenger which may cause deportation or offload by
            the concerned airline or the arrival airports.
          </li>
          <li className="pb-2">
            After instant ticket purchase, OTA will not be liable for any
            passenger mistake regarding Name/Documents/Fare policy/Airline
            policy/Country restriction.
          </li>
          <li className="pb-2">
            Passport validity should be over 6 months from the travel date. OTA
            will not be liable if pax are unable to travel due to Passport
            validity issue.
          </li>
          <li className="pb-2">
            In case of Long Pax name, Use short form of Given Name and full form
            of Surname.
          </li>
          <li className="pb-2">
            In case of Single name passenger, for Biman or Sri Lankan Air-
            mandatory given name should be - FNU and surname will be the Pax
            single name as per Passport. For Saudi Airlines, if pax has single
            name on Passport then Booking should be made as per visa.
          </li>
        </ul>
        <p className="pb-3">
          OTA does not issue one-way tickets for Air India and Saudi Airlines
          (labour tickets). We also do not issue any labour tickets to Malaysia
          & Middle Eastern Countries.
        </p>
        <p className="pb-3">
          After payment, your e-ticket will get issued and be sent via email
          within 24 Hrs during Working Days & 48 Hrs during holidays & Weekends
        </p>

        <div className="pb-3">
          <p className="pb-2">
            <strong>Hotel: </strong>
            {
              "OTA provides various types of accommodation services. This includes hotels, hostels, serviced apartments, B&Bs, rooms for rent, cottages, etc. By making a booking through OTA, you accept the following hotel's terms and conditions."
            }
          </p>
          <p className="pb-2">
            {
              "The information that you see on our website is the information provided by our suppliers and hoteliers. The hotelier can change the rent of their hotel anytime. Although we try to verify each and every piece of information, we cannot be held responsible if any misinformation is given by the suppliers or hoteliers. If you find rooms in a hotel on another website and not OTA, that means we do not have access to the other rooms as hoteliers usually use more than one platform to rent their property."
            }
          </p>
          <p className="pb-2">
            {
              "The ratings shown on our website are based on customer reviews provided to us by our suppliers, which may be updated or changed from time to time. "
            }
          </p>
          <p className="pb-2">
            {
              "OTA reserves the right to cancel a confirmed or booked hotel reservation, for any illegal use of our platform. The illegal use of our platform includes reselling and providing misinformation."
            }
          </p>
          <p className="pb-2">
            {
              "For any refund/cancellation/date change related queries kindly email us at vacation@OTA.net"
            }
          </p>
          <p className="pb-2">
            {
              "In rare cases, we can also cancel the booking if the hotel is out of rooms, but you are still able to book the hotel, We will refund you the charged amount in those cases."
            }
          </p>
          <p className="pb-2">
            {
              "Be sure to let the Accommodation know any special requests or requirements you have at check-in. We cannot guarantee to provide with extra requirements after booking confirmation, it will depend on the hotelier to provide that extra services or not."
            }
          </p>
          <p className="pb-2">
            {
              "It is your responsibility to check before the booking if the hotel is refundable or not. If the hotel is refundable, the customer will get the refund within 7-10 working days (Depending on the specific hotel and bank policy)"
            }
          </p>
        </div>

        <div className="pb-3">
          <p className="pb-2">
            <strong>Holiday: </strong>Package rates are valid as per our
            mentioned validity dates and for the room category specified. Should
            the period of stay or room type change, the above rates will not be
            valid. Hotel rates are not valid during trade fairs, exhibitions,
            and special events. A surcharge will be levied in those cases.
          </p>
          <p className="pb-2">
            No amendment (name changes, date changes, hotel change etc) will be
            done once the booking is confirmed.
          </p>
          <p className="pb-2">
            Your Confirmation of any of our holiday plans will ensure that you
            have read the following Cancelation policy thoroughly and accepted
            it.
          </p>
          <p className="pb-2">
            For any refund/cancellation/date change related queries kindly email
            us at vacation@OTA.net
          </p>
        </div>
        <div className="pb-3">
          <strong>Refund Policy - </strong>
          <div className="pb-2">
            15 days prior to the Travel Date - 50 % of Total Holiday Cost.
          </div>
          <div className="pb-2">
            10 days prior to the Travel Date - 75 % of Total Holiday Cost.
          </div>
          <div className="pb-2">
            05 days prior to the Travel Date - 100% of Holiday Cost will be
            Non-Refundable.
          </div>
        </div>
        <div className="pb-3">
          <p className="pb-2">
            <strong>Visa: </strong>OTA process visa for all popular destinations
            worldwide. For places where the submission has to be by the
            individuals, we only process the papers for the client. The client
            shall have to face embassy interviews by themselves if needed. We
            also do not provide any assurance of getting a visa, as that depends
            solely on the embassy. In order to have a higher chance of getting a
            visa, clients are suggested to-
          </p>
          <ul className="list-decimal pl-5">
            <li className="pb-2">Provide accurate documents to us.</li>
            <li className="pb-2">Share only true information.</li>
            <li className="pb-2">Not hide any information.</li>
          </ul>
          <p className="pb-2">
            Passport should have at least 6 months validity before applying for
            a visa. The customer will be responsible for checking the passport
            validity before applying.
          </p>
        </div>
        <div className="pb-3">
          <div className="pb-2">
            <strong>Visa fee & Service Charges: </strong>OTA Service charge and
            Processing fee BDT 4,500 in total for UK, USA, Canada, Australia,
            New Zealand and Schengen visa processing.{" "}
          </div>
          <p className="pb-2">
            Visa fees and our service charges are strictly not refundable even
            if the client does not get the visa.
          </p>
        </div>
        <div className="pb-3">
          <p className="pb-2">
            <strong>Prohibited Activities: </strong>Services offered to you
            through our website or any of our representatives, are only
            applicable for personal and non-commercial use. You are not allowed
            to sell, resell, copy, or reproduce any services obtained by us
            unless you have a B2B partnership with us.
          </p>
          <ul className="list-decimal pl-5">
            <li className="pb-2">
              Use the contents of this website anywhere else.
            </li>
            <li className="pb-2">Make any false or fraudulent reservation. </li>
            <li className="pb-2">
              Copy any part of this website without proper permission.
            </li>
          </ul>
          <p className="pb-2">
            If OTA finds any suspicious, or fraudulent booking, booked under a
            false name, we reserve the right to cancel the booking immediately
            and block the email, phone number that is associated with that
            particular account from our website. OTA reserves the right to take
            legal action if needed, in case of any fraudulent activity. If you
            think your account has been blocked by any mistake, we request you
            to contact our customer service with proper verifiable documents
          </p>
        </div>
        <div className="pb-3">
          <p className="pb-2">
            <strong>Privacy: </strong>OTA honours your privacy. Please check our
            current Privacy Policy to understand how we use and process your
            personal data.
          </p>
        </div>
        <div className="pb-3">
          <p className="pb-2">
            <strong>Right to Refuse: </strong>OTA reserve the right to refuse
            user for a service, if:
          </p>
          <ul className="list-decimal pl-5">
            <li className="pb-2">
              The user breaches any of the terms and conditions.
            </li>
            <li className="pb-2">
              OTA is unable to verify any information provided by the user.{" "}
            </li>
            <li className="pb-2">
              {
                "OTA believes that the user's actions may violate any third party rights or breach any other applicable law."
              }
            </li>
          </ul>
          <p className="pb-2">
            If OTA finds any suspicious, or fraudulent booking, booked under a
            false name, we reserve the right to cancel the booking immediately
            and block the email, phone number that is associated with that
            particular account from our website. OTA reserves the right to take
            legal action if needed, in case of any fraudulent activity. If you
            think your account has been blocked by any mistake, we request you
            to contact our customer service with proper verifiable documents
          </p>
        </div>
        <div className="pb-3">
          <p className="pb-2">
            <strong>Right to Cancellation: </strong>If OTA has reasons to
            believe that the user-provided any incorrect information, OTA in its
            sole and absolute discretion reserves the right to cancel the
            booking and take any further legal action against the user. In such
            cases, OTA shall not be responsible for any monetary damage caused
            to the user.
          </p>
        </div>
        <div className="pb-3">
          <p className="pb-2">
            <strong>Modification of these Terms and Conditions: </strong>
            OTA reserves the right to change the terms and conditions, at any
            time without prior notice. The user will respond to regularly
            checking the terms and conditions from this page.
          </p>
        </div>
        <div className="pb-3">
          <p className="pb-2">
            <strong>User Agreement:</strong>By booking any service from our app
            and website you acknowledge and agree to have read, understood, and
            agreed to the terms and conditions (including the privacy
            statement). Disagreement to any of the terms and conditions stated
            above will not be considered after booking any service from OTA.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
