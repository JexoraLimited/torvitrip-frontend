import ErrorView from "@/components/shared/ErrorView";
import Pagination from "@/components/shared/Pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Button, buttonVariants } from "@/components/ui/Button";
import ComboBox from "@/components/ui/Combobox";
import DialCodeDropDown from "@/components/ui/DialCodeDropdown";
import { Input } from "@/components/ui/Input";
import LottieLoading from "@/components/ui/LottieLoading";
import NoContent from "@/components/ui/NoContent";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { travelerTitles } from "@/data/common/Travelers";
import { useUploadFile } from "@/hooks/api/file";
import { useFetchLocation } from "@/hooks/api/location";
import {
  useCreateTraveler,
  useDeleteTraveler,
  useEditTraveler,
  useGetTravelers,
} from "@/hooks/api/traveler";
import usePagination from "@/hooks/usePagination";
import { ICreateTravelerPayload } from "@/types/api/traveler";
import { ICSBox, ITraveler } from "@/types/common";
import { cn, formatPhoneNumber, getGender } from "@/utils/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumber } from "libphonenumber-js";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { FaFlag, FaPassport, FaUser, FaUserGroup } from "react-icons/fa6";
import { IoMdCalendar } from "react-icons/io";
import { z } from "zod";

const formSchema = z.object({
  title: z.enum(travelerTitles as any).optional(),
  given_name: z.string({ required_error: "Given name is required" }).optional(),
  surname: z.string({ required_error: "Surname is required" }),
  nationality: z.custom<ICSBox>((v) => v, {
    message: "Nationality is required",
  }),
  gender: z.string({ required_error: "Gender is required" }),
  email: z.string({ required_error: "Email is required" }),
  phone: z.object({
    phone_number: z.string({ required_error: "Phone is required" }),
    dial_code: z.string({ required_error: "Dial code is required" }),
  }),
  birth_date: z.string({ required_error: "Date of birth is required" }),
  frequent_flyer_number: z.string().optional(),
  passport_number: z.string({
    required_error: "Passport number is required",
  }),
  passport_expiry_date: z.string({
    required_error: "Passport Expiry date is required",
  }),
  passport_issue_date: z.string({
    required_error: "Passport issue date is required",
  }),
  passport_img: z.object({
    _id: z.string({ required_error: "Passport image is required" }),
    src: z.string({ required_error: "Passport image is required" }),
  }),
  visa_img: z.object({
    _id: z.string({ required_error: "Passport image is required" }),
    src: z.string({ required_error: "Passport image is required" }),
  }),
});

type FormType = z.infer<typeof formSchema>;

const Travelers = () => {
  const { limit, page, setPage, offset } = usePagination([10], {
    type: "state",
  });
  const [mode, setMode] = useState<"add" | "edit" | "list">("list");
  const [editingTravelerId, setEditingTravelerId] = useState<
    string | undefined
  >(undefined);
  const [passportImage, setPassportImage] = useState<File | undefined>(
    undefined
  );
  const [visaImage, setVisaImage] = useState<File | undefined>(undefined);

  const passportImageURL = useMemo(
    () => passportImage && URL.createObjectURL(passportImage),
    [passportImage]
  );

  const visaImageURL = useMemo(
    () => visaImage && URL.createObjectURL(visaImage),
    [visaImage]
  );

  const { control, setValue, reset, handleSubmit, watch } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "male",
      phone: {
        dial_code: "880",
      },
    },
  });

  const {
    mutate: deleteTraveler,
    variables,
    status: deleteTravelerStatus,
  } = useDeleteTraveler();

  const { mutate: uploadPassportImage, status: passportImageStatus } =
    useUploadFile();
  const { mutate: uploadVisaImage, status: visaImageStatus } = useUploadFile();

  const onPassportImageDrop = useCallback(
    (acceptedFiles: any) => {
      setPassportImage(acceptedFiles[0]);
      uploadPassportImage(acceptedFiles[0], {
        onSuccess: (data) => {
          setValue("passport_img", { _id: data.data._id, src: data.data.src });
        },
        onError: (err) => {
          toast.error(
            err.response?.data.message || "Error uploading passport image"
          );
        },
      });
    },
    [uploadPassportImage, setValue]
  );
  const onVisaImageDrop = useCallback(
    (acceptedFiles: any) => {
      setVisaImage(acceptedFiles[0]);
      uploadVisaImage(acceptedFiles[0], {
        onSuccess: (data) => {
          setValue("visa_img", { _id: data.data._id, src: data.data.src });
        },
        onError: (err) => {
          toast.error(
            err.response?.data.message || "Error uploading visa image"
          );
        },
      });
    },
    [uploadVisaImage, setValue]
  );

  const {
    getRootProps: getPassportImageRootProps,
    getInputProps: getPassportImageInputProps,
    isDragActive: isPassportImageDragging,
  } = useDropzone({
    onDrop: onPassportImageDrop,
    accept: {
      "image/jpeg": [".jpg", ".JPG", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    maxSize: 1024 * (1024 * 2),
  });

  const {
    getRootProps: getVisaImageRootProps,
    getInputProps: getVisaImageInputProps,
    isDragActive: isVisaImageDragging,
  } = useDropzone({
    onDrop: onVisaImageDrop,
    accept: {
      "image/jpeg": [".jpg", ".JPG", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    maxSize: 1024 * (1024 * 2),
  });

  const { data: countries } = useFetchLocation({
    refetchOnWindowFocus: false,
    queryKey: "locations",
  });

  const countriesList = useMemo(() => {
    const countriesList: ICSBox[] | undefined = countries?.data.map(
      (country) => ({
        label: country.name,
        value: country.isoCode,
      })
    );

    return countriesList;
  }, [countries]);

  const { mutate: createTraveler } = useCreateTraveler();
  const { mutate: editTraveler } = useEditTraveler();

  const {
    data: travelersResponse,
    status,
    error,
    refetch,
  } = useGetTravelers({
    queryKey: ["travelers", { offset, limit }],
  });
  const travelers = travelersResponse?.data?.docs || [];
  const totalDocs = travelersResponse?.data?.totalDocs || 0;

  const onSubmit = (data: FormType) => {
    if (mode === "add") {
      toast.loading("Creating traveler", { id: "CREATE_TRAVELER" });
      const travelerObj: ICreateTravelerPayload = {
        ...data,
        passport_img: data.passport_img._id,
        visa_img: data.visa_img._id,
        nationality: data.nationality.value,
        phone: formatPhoneNumber(data.phone.dial_code, data.phone.phone_number),
        given_name: data.given_name || undefined,
      };
      createTraveler(travelerObj, {
        onSuccess: () => {
          toast.success("Traveler created successfully", {
            id: "CREATE_TRAVELER",
          });
          refetch();
          setMode("list");
          setPassportImage(undefined);
          setVisaImage(undefined);
          reset({
            gender: "male",
            phone: {
              dial_code: "880",
            },
          });
        },
        onError: (err) => {
          toast.error(err.response?.data.message || "Something went wrong", {
            id: "CREATE_TRAVELER",
          });
        },
      });
    } else if (mode === "edit") {
      if (!editingTravelerId) return;
      toast.loading("Editing traveler", { id: "EDIT_TRAVELER" });
      const travelerObj: ICreateTravelerPayload = {
        ...data,
        passport_img: data.passport_img._id,
        visa_img: data.visa_img._id,
        nationality: data.nationality.value,
        phone: formatPhoneNumber(data.phone.dial_code, data.phone.phone_number),
      };
      editTraveler(
        { id: editingTravelerId, data: travelerObj },
        {
          onSuccess: () => {
            toast.success("Traveler edited successfully", {
              id: "EDIT_TRAVELER",
            });
            refetch();
            setMode("list");
            setPassportImage(undefined);
            setVisaImage(undefined);
            reset({
              gender: "male",
              phone: {
                dial_code: "880",
              },
            });
          },
          onError: (err) => {
            toast.error(err.response?.data.message || "Something went wrong", {
              id: "EDIT_TRAVELER",
            });
          },
        }
      );
    }
  };

  const handleDeleteTraveler = (id: string) => {
    toast.loading("Deleting traveler", { id: "DELETE_TRAVELER" });
    deleteTraveler(id, {
      onSuccess: () => {
        refetch();
        toast.success("Traveler deleted successfully", {
          id: "DELETE_TRAVELER",
        });
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Something went wrong", {
          id: "DELETE_TRAVELER",
        });
      },
    });
  };

  const handleEdit = (traveler: ITraveler) => {
    setEditingTravelerId(traveler._id);
    reset({
      birth_date: moment(traveler.birth_date).format("YYYY-MM-DD"),
      email: traveler.email,
      gender: traveler.gender,
      given_name: traveler.given_name,
      surname: traveler.surname,
      nationality: {
        label: traveler.nationality.country_name,
        value: traveler.nationality.country_code,
      },
      frequent_flyer_number: traveler.frequent_flyer_number,
      passport_expiry_date: moment(traveler.passport_expiry_date).format(
        "YYYY-MM-DD"
      ),
      passport_issue_date: moment(traveler.passport_issue_date).format(
        "YYYY-MM-DD"
      ),
      passport_img: {
        _id: traveler.passport_img?._id,
        src: traveler.passport_img?.src,
      },
      visa_img: {
        _id: traveler.visa_img?._id,
        src: traveler.visa_img?.src,
      },
      passport_number: traveler.passport_number,
      phone: {
        dial_code: parsePhoneNumber(traveler.phone).countryCallingCode,
        phone_number: parsePhoneNumber(traveler.phone).nationalNumber,
      },
      title: traveler.title,
    });
    setMode("edit");
  };

  return (
    <div className="w-full h-full p-5 font-nunito-sans">
      {mode === "list" && (
        <>
          {status === "success" && (
            <>
              {travelers.length > 0 && (
                <div className="w-full">
                  <Button
                    onClick={() => setMode("add")}
                    className="mx-auto block mb-5"
                  >
                    Add Traveler
                  </Button>
                  <Accordion type="single" collapsible>
                    {travelers.map((traveler, i) => {
                      return (
                        <AccordionItem value={`traveler-${i + 1}`} key={i}>
                          <AccordionTrigger>
                            <span>
                              Traveler Name:{" "}
                              <span className="font-bold">
                                {traveler.given_name} {traveler.surname}
                              </span>
                              {traveler.myself && (
                                <span className="text-primary font-bold pl-2">
                                  (Myself)
                                </span>
                              )}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="w-full py-5 flex items-center gap-4">
                              <FaUser className="text-xl text-gray-600" />{" "}
                              <div>
                                <h4 className="text-sm font-normal">
                                  Full Name
                                </h4>
                                <h6 className="text-base leading-5 font-bold">
                                  {traveler.given_name} {traveler.surname}
                                </h6>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-full flex-1 w-full md:w-auto py-5 flex items-center gap-4">
                                <FaFlag className="text-xl text-gray-600" />{" "}
                                <div>
                                  <h4 className="text-sm font-normal">
                                    Nationality
                                  </h4>
                                  <h6 className="text-base leading-5 font-bold">
                                    {traveler.nationality?.country_code ||
                                      "Unavailable"}
                                  </h6>
                                </div>
                              </div>
                              <div className="w-full flex-1 w-full md:w-auto py-5 flex items-center gap-4">
                                <FaUserGroup className="text-xl text-gray-600" />{" "}
                                <div>
                                  <h4 className="text-sm font-normal">
                                    Gender
                                  </h4>
                                  <h6 className="text-base leading-5 font-bold">
                                    {getGender(traveler.gender) ||
                                      "Unavailable"}
                                  </h6>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-full flex-1 w-full md:w-auto py-5 flex items-center gap-4">
                                <IoMdCalendar className="text-xl text-gray-600" />{" "}
                                <div>
                                  <h4 className="text-sm font-normal">
                                    Date Of Birth
                                  </h4>
                                  <h6 className="text-base leading-5 font-bold">
                                    {traveler.birth_date
                                      ? moment(traveler.birth_date).format(
                                          "DD MMM YYYY"
                                        )
                                      : "Unavailable"}
                                  </h6>
                                </div>
                              </div>
                              <div className="w-full flex-1 w-full md:w-auto py-5 flex items-center gap-4">
                                <FaPassport className="text-xl text-gray-600" />{" "}
                                <div>
                                  <h4 className="text-sm font-normal">
                                    Passport Number
                                  </h4>
                                  <h6 className="text-base leading-5 font-bold">
                                    {traveler.passport_number || "Unavailable"}
                                  </h6>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-full flex-1 w-full md:w-auto py-5 flex items-center gap-4">
                                <FaPassport className="text-xl text-gray-600" />{" "}
                                <div>
                                  <h4 className="text-sm font-normal">
                                    Passport Expiry Date
                                  </h4>
                                  <h6 className="text-base leading-5 font-bold">
                                    {traveler.passport_expiry_date
                                      ? moment(
                                          traveler.passport_expiry_date
                                        ).format("DD MMM YYYY")
                                      : "Unavailable"}
                                  </h6>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-start mb-5 gap-5">
                              {traveler.visa_img && (
                                <Link
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className={cn(
                                    "text-primary font-bold !text-sm flex-1 w-full md:w-auto md:flex-none md:!text-lg !px-0 md:!px-3",
                                    buttonVariants({
                                      variant: "outlinePrimary",
                                    })
                                  )}
                                  href={traveler.passport_img?.src || ""}
                                >
                                  Passport Image
                                </Link>
                              )}
                              {traveler.passport_img && (
                                <Link
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className={cn(
                                    "text-primary font-bold !text-sm flex-1 w-full md:w-auto md:flex-none md:!text-lg !px-0 md:!px-3",
                                    buttonVariants({
                                      variant: "outlinePrimary",
                                    })
                                  )}
                                  href={traveler.visa_img?.src || ""}
                                >
                                  Visa Image
                                </Link>
                              )}
                            </div>
                            <div className="flex items-center justify-end gap-3">
                              <Button
                                onClick={() => handleEdit(traveler)}
                                className="w-[170px]"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() =>
                                  handleDeleteTraveler(traveler?._id)
                                }
                                isLoading={
                                  deleteTravelerStatus === "loading" &&
                                  variables === traveler._id
                                }
                                variant={"destructive"}
                                className="w-[170px]"
                              >
                                Delete
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              )}
              {travelers.length === 0 && (
                <NoContent
                  text="No Travelers found"
                  className="h-[200px]"
                  button
                  buttonText={"Add Traveler"}
                  onButtonClick={() => setMode("add")}
                />
              )}
              {true && (
                <div className="flex items-center justify-end mt-3">
                  <Pagination
                    currentPage={page}
                    onChange={setPage}
                    totalPages={travelersResponse.data.totalPages}
                  />
                </div>
              )}
            </>
          )}
          {status === "loading" && <LottieLoading className="w-full h-full" />}
          {status === "error" && (
            <ErrorView className="w-full h-full" {...error?.response?.data} />
          )}
        </>
      )}
      {(mode === "edit" || mode === "add") && (
        <div className="w-full h-full">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
            <div className="flex items-center flex-col md:flex-row gap-3 w-full">
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState: { error } }) => {
                  return (
                    <div className="flex-1 w-full md:w-auto">
                      <SelectGroup>
                        <SelectLabel>Title</SelectLabel>
                        <Select>
                          <SelectTrigger {...field}>
                            <SelectValue placeholder="Title"></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {travelerTitles.map((title, i) => (
                              <SelectItem key={i} value={title}>
                                {title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </SelectGroup>
                      {error !== undefined && (
                        <p className="font-inter text-start text-xs text-red-400">
                          {error.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                control={control}
                name="given_name"
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <Input
                      {...field}
                      error={error}
                      label="Given Name"
                      placeholder="Enter your Given name"
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="surname"
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <Input
                      {...field}
                      error={error}
                      required
                      label="Surname"
                      placeholder="Enter your Surname"
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex items-center flex-col md:flex-row gap-3 w-full">
              <Controller
                control={control}
                name="nationality"
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <ComboBox
                      options={countriesList}
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val as ICSBox[]);
                      }}
                      required
                      label="Nationality"
                      formatOptionLabel={(data) => {
                        return (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start gap-4">
                              <Image
                                src={`https://flagcdn.com/48x36/${(
                                  data as ICSBox
                                ).value.toLowerCase()}.png`}
                                height={34}
                                width={28}
                                className="object-contain"
                                alt={(data as ICSBox).label}
                              />
                              <span>{(data as ICSBox).label}</span>
                            </div>
                            <h5>{(data as ICSBox).value}</h5>
                          </div>
                        );
                      }}
                      placeholder="Search Country"
                      error={error}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="gender"
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <SelectGroup>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectLabel>
                          Select Gender <span className="text-red-500">*</span>
                        </SelectLabel>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </SelectGroup>
                    {error !== undefined && (
                      <p className="font-inter text-start text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex items-center flex-col md:flex-row gap-3 w-full">
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <Input
                      {...field}
                      required
                      label="Email"
                      error={error}
                      placeholder="Enter traveler email"
                    />
                  </div>
                )}
              />
              <Controller
                name="phone.phone_number"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Enter your mobile number"
                      name="mobile"
                      label="Phone number"
                      required
                      error={error}
                      inputPrefix={
                        <Controller
                          control={control}
                          name="phone.dial_code"
                          render={({ field }) => (
                            <DialCodeDropDown
                              {...field}
                              onChange={(value: any) => {
                                field.onChange(value.value);
                              }}
                              className="min-w-[100px] h-[40px]"
                            />
                          )}
                        />
                      }
                      inputPrefixClassName="border-l-0 px-0"
                      className="px-2 text-sm"
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex items-center flex-col md:flex-row gap-3 w-full">
              <Controller
                control={control}
                name="frequent_flyer_number"
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <Input
                      {...field}
                      error={error}
                      label="Frequent Flyer Number"
                      placeholder="Enter frequent flyer number"
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="passport_number"
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <Input
                      {...field}
                      error={error}
                      required
                      label="Passport Number"
                      placeholder="Enter passport number"
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex items-center flex-col md:flex-row gap-3 w-full">
              <Controller
                control={control}
                name="birth_date"
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <Input
                      {...field}
                      error={error}
                      required
                      type="date"
                      label="Date of birth"
                      max={moment(new Date()).format("YYYY-MM-DD")}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="passport_issue_date"
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <Input
                      {...field}
                      error={error}
                      required
                      type="date"
                      label="Passport Issue date"
                      max={moment(new Date()).format("YYYY-MM-DD")}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="passport_expiry_date"
                render={({ field, fieldState: { error } }) => (
                  <div className="flex-1 w-full md:w-auto">
                    <Input
                      {...field}
                      error={error}
                      required
                      type="date"
                      label="Passport expiry date"
                      min={moment(new Date()).format("YYYY-MM-DD")}
                    />
                  </div>
                )}
              />
            </div>
            <div className="w-full flex md:flex-row flex-col items-center gap-3">
              <div className="flex-1 w-full md:w-auto">
                <label
                  className={cn(
                    "text-primary-heading font-inter text-[15px] font-medium leading-[18px]"
                  )}
                >
                  Passport Image <span className="text-red-500">*</span>
                </label>
                <div
                  {...getPassportImageRootProps()}
                  className={cn(
                    "border-2 relative border-dashed border-primary bg-primary/20 rounded-2xl w-full h-[150px] flex items-center flex-col justify-center overflow-hidden",
                    isPassportImageDragging &&
                      "border-secondary bg-secondary/20"
                  )}
                >
                  <input
                    id="passport_img"
                    className="hidden"
                    {...getPassportImageInputProps()}
                  />
                  {!passportImage &&
                    mode !== "edit" &&
                    !watch("passport_img._id") && (
                      <>
                        <h5 className="text-2xl text-center font-semibold">
                          Upload Image
                        </h5>
                        <p className="text-center font-medium">Max 2 MB</p>
                      </>
                    )}
                  {passportImage && (
                    <div className="h-full w-[150px] relative">
                      <Image
                        fill
                        className="max-w-full max-h-full object-contain"
                        src={passportImageURL || ""}
                        alt="Passport image"
                      />
                    </div>
                  )}
                  {mode === "edit" && !passportImage && (
                    <div className="h-full w-[150px] relative">
                      <Image
                        fill
                        className="max-w-full max-h-full object-contain"
                        src={watch("passport_img.src") || ""}
                        alt="Passport image"
                      />
                    </div>
                  )}
                  {passportImageStatus === "loading" && (
                    <div className="absolute left-0 top-0 right-0 bottom-0 w-full h-full flex items-center bg-black/60 justify-center text-white">
                      <CgSpinnerTwo className="animate-spin" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 w-full md:w-auto">
                <label
                  className={cn(
                    "text-primary-heading font-inter text-[15px] font-medium leading-[18px]"
                  )}
                >
                  Visa Image <span className="text-red-500">*</span>
                </label>
                <div
                  {...getVisaImageRootProps()}
                  className={cn(
                    "border-2 border-dashed border-primary bg-primary/20 rounded-2xl w-full h-[150px] relative flex items-center flex-col justify-center",
                    isVisaImageDragging && "border-secondary bg-secondary/20"
                  )}
                >
                  <input
                    id="passport_img"
                    className="hidden"
                    {...getVisaImageInputProps()}
                  />
                  {!visaImage && mode !== "edit" && !watch("visa_img._id") && (
                    <>
                      <h5 className="text-2xl text-center font-semibold">
                        Upload Image
                      </h5>
                      <p className="text-center font-medium">Max 2 MB</p>
                    </>
                  )}
                  {visaImage && (
                    <div className="h-full w-[150px] relative">
                      <Image
                        fill
                        className="max-w-full max-h-full object-contain"
                        src={visaImageURL || ""}
                        alt="Passport image"
                      />
                    </div>
                  )}
                  {mode === "edit" && !visaImage && (
                    <div className="h-full w-[150px] relative">
                      <Image
                        fill
                        className="max-w-full max-h-full object-contain"
                        src={watch("visa_img.src") || ""}
                        alt="Passport image"
                      />
                    </div>
                  )}
                  {visaImageStatus === "loading" && (
                    <div className="absolute left-0 top-0 right-0 bottom-0 w-full h-full flex items-center bg-black/60 justify-center text-white">
                      <CgSpinnerTwo className="animate-spin" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant={"neutral"}
                onClick={() => {
                  setMode("list");
                  reset({
                    gender: "male",
                    phone: {
                      dial_code: "880",
                    },
                  });
                  setEditingTravelerId(undefined);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Travelers;
