import Head from "next/head";
import Link from "next/link";
import {
  cookieStatement,
  privacyData,
  securityRetention,
} from "../../data/privacy";
import Layout from "../../layouts/Layout";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Head>
        <title>OTA Privacy Policy</title>
        <meta
          name="description"
          content="Understand OTA's privacy practices and policies"
        />
        <meta name="keywords" content="OTA Privacy, Policies" />
      </Head>
      <div className="main-container">
        <div className={`${styles.termsBanner}`}>
          <h1 className="text-[1.5rem] md:text-[2.5rem] pt-[5rem] pb-[3rem] font-bold text-black mx-3 md:mx-0">
            Privacy Policy
          </h1>
        </div>
        <div className="mb-[10rem] mt-6 bg-white z-10 mx-4 md:mx-0">
          <p className="text-base font-normal leading-6 mb-[10px]">
            This Privacy Policy is prepared by OTA Ltd. and whose registered
            address is JCX Business Tower, 3rd & 6th Floor, Plot - 1136/A, Block
            - I, Bashundhara R/A,Dhaka 1229, Bangladesh (“We”) are committed to
            protecting and preserving the privacy of our visitors when visiting
            our site or communicating electronically with us.
          </p>
          <p className="text-base font-normal leading-6 mb-[10px]">
            This policy sets out how we process any personal data we collect
            from you or that you provide to us through our website and social
            media sites. We confirm that we will keep your information secure
            and comply fully with all applicable Bangladesh Data Protection
            legislation and regulations. Please read the following carefully to
            understand what happens to personal data that you choose to provide
            to us, or that we collect from you when you visit our sites and app.
            By submitting information you are accepting and consenting to the
            practices described in this policy.
          </p>
          <br />
          <h3 className="text-xl font-bold leading-[25px]">
            Types of Information We May Collect From You
          </h3>
          <br />
          <p className="text-base font-normal leading-6 mb-[10px]">
            We may collect, store and use the following kinds of personal
            information about individuals who visit and use our website and
            social media sites:
          </p>
          <p className="text-base font-normal leading-6 mb-[10px]">
            <span className="font-bold">Information You Supply to Us.</span> We
            usually ask for basic things like your name, address, e-mail
            address, and phone number, and the details of anyone traveling with
            you, as well as your payment details. You might also choose to give
            us extra information about your Trip, such as when you expect to
            arrive.
          </p>
          <p className="text-base font-normal leading-6 mb-[10px]">
            When you use our services, we also collect information about the
            device you are using, like your computer or phone, such as your IP
            address, web browser, and language settings. Sometimes we get
            information from other people, or automatically collect more
            information about you.{" "}
          </p>{" "}
          <br />
          <div>
            {privacyData?.map((d) => {
              return (
                <div key={d?.id}>
                  <h4 className="font-bold mb-[18px]">{d?.title}</h4>
                  <p className="text-base font-normal leading-6 mb-[10px]">
                    {d?.description}
                  </p>{" "}
                  <br />
                </div>
              );
            })}
          </div>
          <div>
            <h4 className="text-xl font-bold leading-[25px]">
              How We May Use the Information We Collect
            </h4>
            <br />
            <p className="text-base font-normal leading-6 mb-[10px]">
              We use the information in the following ways:
            </p>
            <p className="text-base font-normal leading-6 mb-[10px]">
              <span className="font-bold">Information You Supply to Us.</span>{" "}
              We will use this information:
            </p>
            <li className="text-base font-normal leading-6">
              To provide you with information and/or services that you request
              from us;
            </li>
            <li className="text-base font-normal leading-6 mb-[10px]">
              To contact you to provide the information requested.
            </li>
            <br />
            <br />
            <h4 className="text-xl font-bold leading-[25px]">
              How Does OTA Use Personal Data Belonging to Children
            </h4>
            <p className="text-base font-normal leading-6 mb-[10px]">
              This service is not for use by anyone under the age of 13. We do
              not knowingly collect Personal Information from children under 13.
              If we discover that a child under 13 has provided us with personal
              information, we will immediately delete it from our servers. If
              you are a parent or guardian and you become aware that your child
              has provided us with personal information, please contact us
              immediately so that we can delete the information from our
              servers.
            </p>{" "}
            <br />
          </div>
          <div>
            {securityRetention?.map((d) => {
              return (
                <div key={d?.id}>
                  <h4 className="text-xl font-bold leading-[25px]">
                    {d?.title}
                  </h4>
                  <br />
                  {d?.description?.map((d) => {
                    return (
                      <div key={d?.id}>
                        <p className="text-base font-normal leading-6 mb-[10px]">
                          {d?.title}
                        </p>
                      </div>
                    );
                  })}{" "}
                  <br />
                </div>
              );
            })}
          </div>
          <div>
            <h4 className="text-xl font-bold leading-[25px]">
              How Does OTA Share Your Data with Third Parties
            </h4>
            <p className="text-base font-normal leading-6 mb-[10px]">
              OTA is services involve various parties for different reasons and
              in different ways. The primary reason we share your data is to
              provide the Trip Provider with the necessary information to
              complete your Trip Reservation.
            </p>
            <p className="text-base font-normal leading-6 mb-[10px]">
              In addition, we engage other parties to provide you with OTA
              Travel services, such as financial institutions, and advertisers
              of the OTA corporate group. We may also share your data with
              governmental or other authorities if required by law in some
              instances.
            </p>
            <p className="text-base font-normal leading-6 mb-[10px]">
              Users can request the deletion of their data through deletion of
              the user account from the app or by contacting us.
            </p>
            <br />
          </div>
          <div>
            <h4 className="text-xl font-bold leading-[25px]">
              Your Rights – Access/Delete Your Personal Data
            </h4>
            <br />
            <p className="text-base font-normal leading-6 mb-[10px]">
              You have the right to ensure that your personal data is being
              processed lawfully according to{" "}
              <Link className="text-[#1882ff]" href="/">
                Bangladeshi Law
              </Link>{" "}
              . Access rights can be exercised in accordance with data
              protection laws and regulations. Any subject access request must
              be made in writing to{" "}
              <Link className="text-[#1882ff]" href="/">
                ask@OTA.net
              </Link>
              . We will provide your personal data to you within the statutory
              time frames. To enable us to trace any of your personal data that
              we may be holding, we may need to request further information from
              you.
            </p>
            <p className="text-base font-normal leading-6 mb-[10px]">
              To maintain control over how we use your personal information,
              there are a few ways you can do so:
            </p>
            <p className="text-base font-normal leading-6 mb-[10px]">
              OTA keeps user data for the duration necessary to fulfill the
              purposes outlined previously. The duration for which we keep user
              data is based on the type of data, user category, and the reasons
              why we gathered the data.
            </p>
            <p className="text-base font-normal leading-6 mb-[10px]">
              Legal and regulatory requirements, safety, security, fraud
              prevention, and account-related concerns, such as outstanding
              credit or unresolved claims or disputes, may also determine the
              duration for which OTA retains user data.
            </p>
            <p className="text-base font-normal leading-6 mb-[10px]">
              Users can delete their accounts at any time through the Profile
              Manage Data Delete Account in the OTA app. Upon a deletion
              request, OTA deletes the user s account and data, unless they are
              required to be retained due to legal, regulatory, or
              account-related issues. In case of deleting data collected from
              social media platforms such as facebook, users have to delete data
              through their facebook account. For more details, user’s can visit
              this{" "}
              <Link className="text-[#1882ff]" href="/">
                link
              </Link>
              .
            </p>
            <p className="text-base font-normal leading-6 mb-[10px]">
              However, anyone concerned about the data can directly contact us
              at:{" "}
              <Link className="text-[#1882ff]" href="/">
                ask@OTA.net
              </Link>
            </p>
            <br />
          </div>
          <div>
            {cookieStatement?.map((d) => {
              return (
                <div key={d?.id}>
                  <h4 className="text-xl font-bold leading-[25px]">
                    {d?.title}
                  </h4>
                  <br />
                  <div>
                    {d?.description?.map((s) => {
                      return (
                        <div key={s?.id}>
                          <p className="text-base font-normal leading-6 mb-[10px]">
                            {s?.title}
                          </p>
                          <br />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h4 className="text-xl font-bold leading-[25px]">Contact</h4>
            <br />
            <p className="text-base font-normal leading-6 mb-[10px]">
              Questions, comments, and requests regarding this privacy policy
              are welcomed and should be addressed to{" "}
              <Link className="text-[#1882ff]" href="/">
                ask@OTA.net.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
