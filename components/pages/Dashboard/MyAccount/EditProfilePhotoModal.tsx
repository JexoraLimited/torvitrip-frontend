import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { useGetMe } from "@/hooks/api/auth";
import { useUploadFile } from "@/hooks/api/file";
import { useChangeProfilePicture } from "@/hooks/api/user";
import useSession from "@/hooks/useSession";
import { APIResponse } from "@/types/common";
import { getNameInitials } from "@/utils/common";
import { getCroppedImg } from "@/utils/image";
import { AxiosError } from "axios";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import Cropper, { Point } from "react-easy-crop";
import toast from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdClose, MdRotateLeft, MdRotateRight } from "react-icons/md";

interface EditCoverModalProps {
  handleClose: () => void;
}

const EditProfilePhotoModal: FC<EditCoverModalProps> = ({ handleClose }) => {
  const { user } = useSession();

  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(100);
  const [file, setFile] = useState<File>();
  const [croppedFile, setCroppedFile] = useState<File>();
  const [rotate, setRotate] = useState(0);

  const { refetch: refetchProfile } = useGetMe({
    refetchOnWindowFocus: false,
    enabled: false,
    queryKey: "my_profile",
  });

  const { mutateAsync: uploadFile, isLoading: isUploadingFile } =
    useUploadFile();
  const { mutateAsync: uploadProfileImage, isLoading: isUpdatingProfileImage } =
    useChangeProfilePicture();

  useEffect(() => {
    if (zoom < 100) setZoom(100);
    if (zoom > 300) setZoom(300);
  }, [zoom]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size > 1024 * 1024)
        return toast.error("Image must be less than 1 MB");

      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    toast.loading("Uploading your Image", { id: "uploading" });

    if (!croppedFile) return toast.error("Please select an image");

    try {
      const fileData = await uploadFile(croppedFile);

      toast.loading("Changing your profile image..", { id: "uploading" });

      const res = await uploadProfileImage(fileData.data._id);

      await refetchProfile();

      handleClose();

      toast.success("Profile picture changed successfully", {
        id: "uploading",
      });
    } catch (e) {
      const error = e as unknown as AxiosError<APIResponse>;

      toast.error(error.response?.data.message as string, { id: "uploading" });
    }
  };

  return (
    <>
      {/* Delete Modal */}
      {!image ? (
        <>
          <div className="flex items-center justify-between p-4 lg:p-5">
            <span className=" font-inter text-lg font-medium text-indigo-950 lg:text-xl lg:leading-[22px]">
              Change Photo
            </span>
            <span
              onClick={handleClose}
              className="cursor-pointer text-2xl text-[#888] md:text-[32px]"
            >
              <MdClose />
            </span>
          </div>
          {user && (
            <label
              htmlFor="fileData"
              className="relative mx-auto h-[220px] w-[220px] rounded-full md:h-[250px] md:w-[250px]"
            >
              <Avatar className="w-full h-full">
                <AvatarImage src={user?.profile_pic?.src} alt="Profile Pic" />
                <AvatarFallback>
                  {getNameInitials(user?.full_name)}
                </AvatarFallback>
              </Avatar>
            </label>
          )}
          <div className="mt-[22px] flex items-end justify-end border-t border-[#C0C0C0] p-4 md:px-[32px] md:py-5">
            <div className="h-[34px]">
              <label
                htmlFor="fileData"
                className="flex h-[34px] w-[135px] items-center justify-center rounded-full bg-primary font-inter text-[13px] font-bold leading-4 text-white"
              >
                Upload Photo
              </label>
              <input
                onChange={onSelectFile}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                id="fileData"
                name="file"
                className="h-0 w-0 appearance-none"
              />
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-4">
            <span className="font-inter text-lg font-medium text-indigo-950 lg:text-xl lg:leading-[22px]">
              Edit
            </span>
            <span
              onClick={handleClose}
              className="cursor-pointer text-2xl text-[#888] md:text-[32px]"
            >
              <MdClose />
            </span>
          </div>
          <div className="h-[270px] w-full bg-slate-900">
            <div className="relative mx-auto h-full w-full bg-white ">
              <Cropper
                objectFit="contain"
                classes={{
                  containerClassName: "w-full h-full",
                }}
                cropShape="round"
                showGrid={true}
                zoomWithScroll
                zoom={zoom / 100}
                crop={crop}
                rotation={rotate}
                image={image as string}
                aspect={1 / 1}
                onZoomChange={(zoom) => setZoom(zoom * 100)}
                onCropChange={setCrop}
                onCropComplete={async (_, croppedAreaPixels) => {
                  try {
                    const croppedImage = await getCroppedImg(
                      image,
                      croppedAreaPixels,
                      rotate
                    );

                    fetch(croppedImage as string)
                      .then((response) => response.blob())
                      .then((blobData) => {
                        if (file) {
                          // Create a File object from the Blob data
                          const files = new File([blobData], file.name, {
                            type: file.type,
                          });

                          setCroppedFile(files);
                        }
                      })
                      .catch((error) => {
                        console.error("Error fetching Blob data:", error);
                      });
                  } catch (e) {
                    console.error(e);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-end justify-between gap-4 p-3 md:p-5">
            <div className="w-full">
              <span className="pl-8 text-[15px] font-bold leading-[22px] text-[#8A8787]">
                Zoom
              </span>
              <div className="flex w-full items-center space-x-2">
                <div
                  onClick={() => setZoom((prev) => prev - 10)}
                  className="cursor-pointer text-2xl text-[#888]"
                >
                  <AiOutlineMinus />
                </div>
                <div className="w-full max-w-[362px]">
                  <Slider
                    min={100}
                    max={300}
                    defaultValue={[100]}
                    step={1}
                    value={[zoom]}
                    onValueChange={(v) => setZoom(v[0])}
                  />
                </div>
                <div
                  onClick={() => setZoom((prev) => prev + 10)}
                  className="cursor-pointer text-2xl text-[#888]"
                >
                  <AiOutlinePlus />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-7">
              <div
                onClick={() => setRotate((prev) => prev - 90)}
                className="cursor-pointer text-3xl text-[#888]"
              >
                <MdRotateLeft />
              </div>
              <div
                onClick={() => setRotate((prev) => prev + 90)}
                className="cursor-pointer text-3xl text-[#888]"
              >
                <MdRotateRight />
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end border-t border-[#C0C0C0] px-5 py-[10px]">
            <Button
              isLoading={isUpdatingProfileImage || isUploadingFile}
              type="submit"
              className="flex h-[34px] w-[135px] items-center justify-center rounded-full bg-primary font-inter text-[13px] font-bold leading-4 text-white disabled:bg-opacity-60"
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditProfilePhotoModal;
