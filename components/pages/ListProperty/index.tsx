import grow from "@/assets/images/icons/grow.png";
import houseRent from "@/assets/images/icons/house-rent.png";
import house from "@/assets/images/icons/house.png";
import lodging from "@/assets/images/icons/lodging.png";
import peoples from "@/assets/images/icons/peoples.png";
import worldOfTravelers from "@/assets/images/icons/world-locations.png";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/Button";
import ComboBox from "@/components/ui/Combobox";
import DialCodeDropDown from "@/components/ui/DialCodeDropdown";
import { Input } from "@/components/ui/Input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/Radio";
import Layout from "@/layouts/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { LuInfo } from "react-icons/lu";

const ListPropertyPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  return (
    <Layout>
      {step === 0 && (
        <>
          <div className="bg-slate-100">
            <div className="main-container">
              <div className="flex flex-col gap-5 items-center justify-center py-16">
                <SectionHeading
                  title="List Your Property!"
                  description="Connect with millions of people whose purpose, taste and budget make your property the perfect place to stay."
                />
                <div className="flex items-center justify-center gap-3">
                  <div
                    onClick={() => setStep(1)}
                    className="w-[280px] h-[280px] p-5 flex items-center justify-center flex-col bg-white border-2 border-primary text-center rounded-2xl cursor-pointer"
                  >
                    <Image
                      src={lodging}
                      width={70}
                      height={70}
                      alt="Lodging"
                      className="object-container mx-auto"
                    />
                    <h5 className="text-2xl mt-3 font-bold text-gray-900">
                      Lodging
                    </h5>
                    <p className="text-sm">
                      A hotel, motel, or bed and breakfast for your guests
                    </p>
                  </div>
                  <div className="w-[280px] h-[280px] p-5 flex items-center justify-center flex-col bg-white border-2 border-primary text-center rounded-2xl cursor-pointer">
                    <Image
                      src={house}
                      width={70}
                      height={70}
                      alt="Lodging"
                      className="object-container mx-auto"
                    />
                    <h5 className="text-2xl mt-3 font-bold text-gray-900">
                      Private Residence
                    </h5>
                    <p className="text-sm">
                      A private home, apartment, or vacation home
                    </p>
                  </div>
                  <div className="w-[280px] h-[280px] p-5 flex items-center justify-center flex-col bg-white border-2 border-primary text-center rounded-2xl cursor-pointer">
                    <Image
                      src={houseRent}
                      width={70}
                      height={70}
                      alt="Lodging"
                      className="object-container mx-auto"
                    />
                    <h5 className="text-2xl mt-3 font-bold text-gray-900">
                      House Rental
                    </h5>
                    <p className="text-sm">
                      A house for rent. Monthly rent is allowed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white py-16">
            <div className="main-container">
              <SectionHeading
                title="Bring the right guests"
                description="Connect with millions of people whose purpose, taste and budget make your property the perfect place to stay."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-5">
                <div className="text-center">
                  <Image
                    src={worldOfTravelers}
                    width={120}
                    height={120}
                    quality={100}
                    alt="Lodging"
                    className="object-container mx-auto"
                  />
                  <h5 className="text-2xl mt-3 font-bold text-gray-900">
                    Access a world of travelers
                  </h5>
                  <p className="text-sm">
                    From long-range planners to last-minute bookers, bring
                    travelers to your door from around the world.
                  </p>
                </div>
                <div className="text-center">
                  <Image
                    src={peoples}
                    width={120}
                    height={120}
                    quality={100}
                    alt="Lodging"
                    className="object-container mx-auto"
                  />
                  <h5 className="text-2xl mt-3 font-bold text-gray-900">
                    Attract your ideal guests
                  </h5>
                  <p className="text-sm">
                    Book your ideal guests—travelers who delight in what you
                    provide and want to return again and again.
                  </p>
                </div>
                <div className="text-center">
                  <Image
                    src={grow}
                    width={120}
                    height={120}
                    quality={100}
                    alt="Lodging"
                    className="object-container mx-auto"
                  />
                  <h5 className="text-2xl mt-3 font-bold text-gray-900">
                    Grow your business
                  </h5>
                  <p className="text-sm">
                    Make decisions based on real-time data, be more competitive
                    & help increase visibility and bookings.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white py-16">
            <div className="main-container">
              <SectionHeading
                title="Explore the benefits of working with us"
                description="For over 25 years, we’ve learned what travelers seek, what makes properties attractive, and how to bring the two together. Discover how this helps you."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-5">
                <div className="text-center">
                  <Image
                    src={worldOfTravelers}
                    width={120}
                    height={120}
                    quality={100}
                    alt="Lodging"
                    className="object-container mx-auto"
                  />
                  <h5 className="text-2xl mt-3 font-bold text-gray-900">
                    Lodging
                  </h5>
                  <p className="text-sm mx-auto">
                    Confidently fill your rooms so you can do more of what you
                    love—creating wonderful guest experiences
                  </p>
                </div>
                <div className="text-center">
                  <Image
                    src={house}
                    width={120}
                    height={120}
                    quality={100}
                    alt="Lodging"
                    className="object-container mx-auto"
                  />
                  <h5 className="text-2xl mt-3 font-bold text-gray-900">
                    Private Residence
                  </h5>
                  <p className="text-sm mx-auto">
                    Rent your property your way. Set pricing, availability,
                    rules, policies and more to fit your needs
                  </p>
                </div>
                <div className="text-center">
                  <Image
                    src={houseRent}
                    width={120}
                    height={120}
                    quality={100}
                    alt="House rental"
                    className="object-container mx-auto"
                  />
                  <h5 className="text-2xl mt-3 font-bold text-gray-900">
                    House Rental
                  </h5>
                  <p className="text-sm mx-auto">
                    Rent your house your way. Set pricing, availability, rules,
                    policies and more to fit your needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {step === 1 && (
        <div className="py-[150px] lg:max-w-[800px] w-full main-container flex flex-col gap-3">
          <div className="w-full relative bg-secondary text-white text-xl text-center py-5 px-3">
            <div
              onClick={() => setStep((pv) => pv - 1)}
              className="absolute top-6 left-6 text-white text-xl cursor-pointer"
            >
              <FaArrowLeft />
            </div>
            <span>Step 1 of 3</span>
          </div>
          <h3 className="text-2xl font-bold">
            Where is your property located?
          </h3>
          <p className="font-medium">
            Start with your property name, like Hilton Downtown Los Angeles.
            This will make it easier to find your address.
          </p>
          <div>
            <Input
              className="w-full"
              label="Property name"
              placeholder="Enter property name or address"
              inputPrefix={<IoLocationOutline />}
            />
          </div>
          <Button onClick={() => setStep(2)} className="w-full mt-3">
            Next
          </Button>
        </div>
      )}
      {step === 2 && (
        <div className="py-[50px] lg:max-w-[800px] w-full main-container flex flex-col gap-3">
          <div className="w-full relative bg-secondary text-white text-xl text-center py-5 px-3">
            <div
              onClick={() => setStep((pv) => pv - 1)}
              className="absolute top-6 left-6 text-white text-xl cursor-pointer"
            >
              <FaArrowLeft />
            </div>
            <span>Step 1 of 3</span>
          </div>
          <h3 className="text-2xl font-bold">
            Let&apos;s start with the basics
          </h3>
          <h3 className="text-2xl font-bold">Name of property</h3>
          <p className="font-medium">
            Start with your property name, like Hilton Downtown Los Angeles.
            This will make it easier to find your address.
          </p>
          <h3 className="text-2xl font-bold">Property address</h3>
          <p className="font-medium">
            Please provide your address using Latin or Roman characters. The
            Latin or Roman alphabet uses characters like a, b, and c.
          </p>
          <div>
            <ComboBox
              label="Country"
              placeholder="Enter your country"
              options={[{ label: "Bangladesh", value: "bd" }]}
            />
          </div>
          <div>
            <Input
              className="w-full"
              label="Street address"
              placeholder="Enter your street address"
            />
          </div>
          <div>
            <Input
              className="w-full"
              label="Unit number"
              placeholder="Enter your unit number"
            />
          </div>
          <div>
            <Input
              className="w-full"
              label="City"
              placeholder="Enter your city"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                className="w-full"
                label="State"
                placeholder="Enter your state"
              />
            </div>
            <div className="flex-1">
              <Input
                className="w-full"
                label="ZIP Code"
                placeholder="Enter your ZIP Code"
              />
            </div>
          </div>
          <Button onClick={() => setStep(3)} className="w-full mt-3">
            Next
          </Button>
        </div>
      )}
      {step === 3 && (
        <div className="py-[50px] lg:max-w-[800px] w-full main-container flex flex-col gap-3">
          <div className="w-full relative bg-secondary text-white text-xl text-center py-5 px-3">
            <div
              onClick={() => setStep((pv) => pv - 1)}
              className="absolute top-6 left-6 text-white text-xl cursor-pointer"
            >
              <FaArrowLeft />
            </div>
            <span>Step 2 of 3</span>
          </div>
          <h3 className="text-2xl font-bold">
            Tell us a little about your property
          </h3>
          <div className="flex items-center flex-col gap-3">
            <div className="w-full">
              <Input
                label="Property name"
                placeholder="Enter your property name"
                className="w-full"
                inputSuffix={
                  <div className="relative group">
                    <LuInfo className="text-gray-600 text-xl" />
                    <div className="absolute hidden group-hover:block left-10 top-[-10px] w-[250px] text-white text-sm bg-secondary p-3 rounded-lg">
                      <p>
                        Use the official name of your property, for example the
                        one you use on your own website. Avoid special
                        characters. An ideal length for search engine marketing
                        is less than 30 characters.
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
            <div className="w-full">
              <ComboBox
                label="Property type"
                placeholder="Enter your property type"
                options={[{ label: "Hotel", value: "hotel" }]}
              />
            </div>
            <div className="w-full">
              <Input
                label="Number of rooms/units"
                placeholder="Enter Number of rooms/units"
                className="w-full"
                inputSuffix={
                  <div className="relative group">
                    <LuInfo className="text-gray-600 text-xl" />
                    <div className="absolute hidden group-hover:block left-10 top-[-10px] w-[250px] text-white text-sm bg-secondary p-3 rounded-lg">
                      <p>
                        Please note that and apartment or house counts as one
                        unit
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
            <div className="w-full">
              <Input
                label="Legal name of your apartment"
                placeholder="Enter the legal name of your apartment"
                className="w-full"
                inputSuffix={
                  <div className="relative group">
                    <LuInfo className="text-gray-600 text-xl" />
                    <div className="absolute hidden group-hover:block left-10 top-[-10px] w-[250px] text-white text-sm bg-secondary p-3 rounded-lg">
                      <p>
                        The legal name associated with your property that you
                        use for tax purposes or government registration. This
                        could be the name of a company or an individual.
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
            <div className="w-full">
              <ComboBox
                label="Currency"
                placeholder="Enter your property currency"
                options={[{ label: "US Dollars", value: "USD" }]}
              />
            </div>
            <div className="mt-5 w-full space-y-3">
              <div>
                <div className="flex items-center gap-3">
                  <h6 className="font-medium">
                    Does this property works with a channel manager?
                  </h6>
                  <div className="relative group">
                    <LuInfo className="text-gray-600 text-xl" />
                    <div className="absolute hidden group-hover:block left-10 top-[-10px] w-[250px] text-white text-sm bg-secondary p-3 rounded-lg">
                      <p>
                        Channel managers are third-party solutions that
                        eliminate the need for manual inventory or reservation
                        management across multiple marketing channels. If you
                        are not signed up with a channel manager yet, select No
                        and you can add one later.
                      </p>
                    </div>
                  </div>
                </div>
                <RadioGroup defaultValue="option-one" className="mt-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <label htmlFor="option-one">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <label htmlFor="option-two">No</label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h6 className="font-medium">
                    Is this property part of a chain?
                  </h6>
                  <div className="relative group">
                    <LuInfo className="text-gray-600 text-xl" />
                    <div className="absolute hidden group-hover:block left-10 top-[-10px] w-[250px] text-white text-sm bg-secondary p-3 rounded-lg">
                      <p>
                        A chain is a group of properties managed by the same
                        owner or company.
                      </p>
                    </div>
                  </div>
                </div>
                <RadioGroup defaultValue="option-one" className="mt-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <label htmlFor="option-one">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <label htmlFor="option-two">No</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <Button onClick={() => setStep(4)} className="w-full mt-3">
            Next
          </Button>
        </div>
      )}
      {step === 4 && (
        <div className="py-[50px] lg:max-w-[800px] w-full main-container flex flex-col gap-3">
          <div className="w-full relative bg-secondary text-white text-xl text-center py-5 px-3">
            <div
              onClick={() => setStep((pv) => pv - 1)}
              className="absolute top-6 left-6 text-white text-xl cursor-pointer"
            >
              <FaArrowLeft />
            </div>
            <span>Step 3 of 3</span>
          </div>
          <h3 className="text-2xl font-bold">Create your account</h3>
          <p className="font-medium">
            Have an existing account with us? Log in to set up the new property
            under that account. Don&apos;t want to use your existing account?
            Use a different email address below to create a new account. Please
            don&apos;t use a shared email address.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input label="First Name" placeholder="Enter your first name" />
            </div>
            <div className="flex-1">
              <Input label="Last Name" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="w-full">
            <Input
              type="tel"
              label="Mobile Number"
              placeholder="Enter your mobile number"
              name="mobile"
              required
              inputPrefix={
                <DialCodeDropDown className="min-w-[130px] h-[40px]" />
              }
              inputPrefixClassName="border-l-0 px-0"
              className="px-2 text-sm w-full"
            />
          </div>
          <div>
            <Input
              className="w-full"
              label="Email address"
              placeholder="Enter your email address"
            />
          </div>
          <Button
            onClick={() => router.replace("/list-property/auth")}
            className="w-full mt-3"
          >
            Next
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default ListPropertyPage;
