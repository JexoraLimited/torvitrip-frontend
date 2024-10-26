import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import ComboBox from "@/components/ui/Combobox";
import DialCodeDropDown from "@/components/ui/DialCodeDropdown";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useFetchLocation } from "@/hooks/api/location";
import { useEditAccount } from "@/hooks/api/user";
import useSession from "@/hooks/useSession";
import { IEditAccountPayload } from "@/types/api/user";
import { ICSBox } from "@/types/common";
import { getNameInitials } from "@/utils/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumber } from "libphonenumber-js";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { useQueryClient } from "react-query";
import { z } from "zod";
import EditProfilePhotoModal from "./EditProfilePhotoModal";

const formSchema = z.object({
  first_name: z.string({ required_error: "First name is required" }),
  last_name: z.string({ required_error: "Last name is required" }),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    country: z.custom<ICSBox | undefined>((v) => v).optional(),
    postal_code: z.string().optional(),
  }),
  email: z.string({ required_error: "Email is required" }),
  phone: z.object({
    dial_code: z.string({ required_error: "Dial code is required" }),
    phone_number: z
      .string({ required_error: "Phone number is required" })
      .min(4, { message: "Phone number is required" }),
  }),
});

type FormType = z.infer<typeof formSchema>;

const MyAccount = () => {
  const session = useSession();
  const [changeImageOpen, setChangeImageOpen] = useState(false);

  const { data: countries } = useFetchLocation({
    refetchOnWindowFocus: false,
    queryKey: "locations",
  });

  const { mutate: editAccount, status } = useEditAccount();

  const countriesList = useMemo(() => {
    const countriesList: ICSBox[] | undefined = countries?.data.map(
      (country) => ({
        label: country.name,
        value: country.isoCode,
      })
    );

    return countriesList;
  }, [countries]);

  const getCountryValue = useCallback(
    (code: string) => {
      return countriesList?.find((country) => country.value === code);
    },
    [countriesList]
  );

  const defaultValues = useMemo(
    () => ({
      first_name: session.user?.first_name,
      last_name: session.user?.last_name,
      address: {
        city: session.user?.address?.city,
        country: getCountryValue(session?.user?.address?.country || ""),
        postal_code: session?.user?.address?.postal_code,
        street: session?.user?.address?.street,
      },
      email: session.user?.email,
      phone: {
        dial_code: parsePhoneNumber(session.user?.phone || "")
          .countryCallingCode,
        phone_number: parsePhoneNumber(session.user?.phone || "")
          .nationalNumber,
      },
    }),
    [session, getCountryValue]
  );

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const queryClient = useQueryClient();

  const handleFormSubmit = (data: FormType) => {
    toast.loading("Editing your account", { id: "EDIT_ACCOUNT" });
    const editData: IEditAccountPayload = {
      address: { ...data.address, country: data.address.country?.value },
      first_name: data.first_name,
      last_name: data.last_name,
    };
    editAccount(editData, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["my_profile"] });
        toast.success("Account edited successfully", { id: "EDIT_ACCOUNT" });
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Something went wrong", {
          id: "EDIT_ACCOUNT",
        });
      },
    });
  };
  return (
    <div className="w-full h-full p-5">
      <Dialog open={changeImageOpen} onOpenChange={setChangeImageOpen}>
        <DialogContent className="!p-0">
          <EditProfilePhotoModal
            handleClose={() => setChangeImageOpen(false)}
          />
        </DialogContent>
      </Dialog>
      <div className="flex items-center flex-col md:flex-row gap-3">
        <div
          onClick={() => setChangeImageOpen(true)}
          className="w-[100px] h-[100px] relative duration-300 overflow-hidden"
        >
          <Avatar className="w-full h-full">
            <AvatarImage
              src={session.user?.profile_pic?.src}
              alt="Profile Pic"
            />
            <AvatarFallback>
              {getNameInitials(session.user?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute top-0 duration-300 rounded-full left-0 right-0 bottom-0 hover:bg-black/60 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 flex-col">
            <MdEdit className="text-2xl text-white" />
            <h5 className="text-sm text-center text-white">
              Change <br /> Image
            </h5>
          </div>
        </div>
        <div className="md:space-y-1">
          <h2 className="text-2xl md:text-3xl text-center md:text-left font-medium overflow-hidden whitespace-nowrap text-ellipsis w-full">
            {session.user?.full_name}
          </h2>
          <h5 className="text-sm md:text-lg font-medium text-center md:text-left overflow-hidden whitespace-nowrap text-ellipsis w-full">
            {session.user?.email}
          </h5>
        </div>
      </div>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-full mt-5 space-y-5"
      >
        <div className="flex items-center gap-5 md:flex-row flex-col w-full justify-center">
          <Controller
            control={form.control}
            name="first_name"
            render={({ field, fieldState: { error } }) => (
              <div className="flex-1 md:w-auto w-full">
                <Input
                  required
                  {...field}
                  error={error}
                  placeholder="First Name"
                />
              </div>
            )}
          />
          <Controller
            control={form.control}
            name="last_name"
            render={({ field, fieldState: { error } }) => (
              <div className="flex-1 md:w-auto w-full">
                <Input {...field} error={error} placeholder="Last Name" />
              </div>
            )}
          />
        </div>
        <div className="flex items-center gap-5 md:flex-row flex-col w-full justify-center">
          <div className="flex-1 md:w-auto w-full">
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  error={error}
                  readOnly
                  disabled
                  placeholder="Email"
                />
              )}
            />
          </div>
          <div className="flex-1 md:w-auto w-full">
            <Controller
              name="phone.phone_number"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  type="tel"
                  placeholder="Enter your mobile number"
                  name="mobile"
                  required
                  disabled
                  readOnly
                  error={error}
                  inputPrefix={
                    <Controller
                      control={form.control}
                      name="phone.dial_code"
                      render={({ field }) => (
                        <DialCodeDropDown
                          {...field}
                          onChange={(value: any) => {
                            field.onChange(value.value);
                          }}
                          className="min-w-[100px] h-[40px] pointer-events-none"
                        />
                      )}
                    />
                  }
                  inputPrefixClassName="border-l-0 px-0"
                  className="px-2 text-sm"
                />
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-5 md:flex-row flex-col w-full justify-center">
          <div className="flex-1 md:w-auto w-full">
            <Controller
              control={form.control}
              name="address.country"
              render={({ field, fieldState: { error } }) => (
                <ComboBox
                  options={countriesList}
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val as ICSBox[]);
                  }}
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
              )}
            />
          </div>
          <Controller
            control={form.control}
            name="address.street"
            render={({ field, fieldState: { error } }) => (
              <div className="flex-1 md:w-auto w-full">
                <Input {...field} error={error} placeholder="Address" />
              </div>
            )}
          />
        </div>
        <div className="flex items-center gap-5 md:flex-row flex-col w-full justify-center">
          <Controller
            control={form.control}
            name="address.city"
            render={({ field, fieldState: { error } }) => (
              <div className="flex-1 md:w-auto w-full">
                <Input {...field} error={error} placeholder="City" />
              </div>
            )}
          />
          <div className="flex-1 md:w-auto w-full">
            <Controller
              control={form.control}
              name="address.postal_code"
              render={({ field, fieldState: { error } }) => (
                <Input {...field} type="number" placeholder="Postal Code" />
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          isLoading={status === "loading"}
          className="w-[170px] ml-auto block"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default MyAccount;
