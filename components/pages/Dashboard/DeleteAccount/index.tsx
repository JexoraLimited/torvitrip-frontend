import { Button } from "@/components/ui/Button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/Dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/Radio";
import { deletionReasons } from "@/data/common/DeletionReason";
import { logout } from "@/features/auth/authSlice";
import { useDeleteAccount } from "@/hooks/api/user";
import { useAppDispatch } from "@/hooks/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { z } from "zod";

const formSchema = z.object({
  reason: z.enum(deletionReasons as any, {
    required_error: "Reason is required",
    invalid_type_error: "Invalid reason",
  }),
  comment: z.string().optional(),
});

type FormType = z.infer<typeof formSchema>;

const DeleteAccount = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutate: deleteAccount } = useDeleteAccount();
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: deletionReasons[0],
      comment: "",
    },
  });
  const dispatch = useAppDispatch();
  const handleDelete = (data: FormType) => {
    toast.loading("Deleting your account", { id: "DELETE_ACCOUNT" });
    deleteAccount(
      { comment: data.comment || "", reason: data.reason },
      {
        onSuccess: () => {
          toast.success("Account deleted successfully", {
            id: "DELETE_ACCOUNT",
          });
          dispatch(logout());
        },
        onError: (err) => {
          toast.error(err.response?.data.message || "Something went wrong", {
            id: "DELETE_ACCOUNT",
          });
        },
      }
    );
  };
  return (
    <div className="w-full h-full p-5 py-10 flex flex-col items-center justify-center">
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogClose className="absolute top-2 right-2">
            <MdClose className="text-2xl" />
          </DialogClose>
          <form onSubmit={handleSubmit(handleDelete)}>
            <h3 className="text-2xl font-bold">Delete your account</h3>
            <label className="text-lg mb-1 mt-4 block">
              Why are you deleting your account?
            </label>
            <Controller
              control={control}
              name="reason"
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  {deletionReasons.map((reason, i) => (
                    <div key={i} className="flex items-center gap-x-2">
                      <RadioGroupItem value={reason} id={reason} />
                      <label htmlFor={reason}>{reason}</label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            <Controller
              name="comment"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="w-full">
                  <textarea
                    {...field}
                    name="comment"
                    className="min-h-[150px] w-full border-2 p-2 border-border rounded-[10px] mt-4 focus:outline-none"
                    placeholder="Comment"
                  ></textarea>
                  {error?.message && (
                    <p className="font-inter text-start text-xs text-red-400">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
            <p className="text-sm">
              Warning: Your profile, photos, booking, guest list will be
              permanently removed. By clicking confirm you are agreeing to our
              terms & condition.
            </p>
            <div className="flex items-center justify-end mt-3 gap-4">
              <DialogClose>
                <Button variant={"neutral"} type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant={"secondary"} type="submit">
                Delete
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <h3 className="text-2xl md:text-3xl font-semibold text-center">
        Delete Your <span className="text-secondary">Account</span>?
      </h3>
      <p className="text-center text-xs md:text-sm w-full md:w-1/2 mb-4">
        Deleting your account will delete your all travelers, guest list and
        your account. And it can&apos;t be undone.
      </p>
      <Button
        onClick={() => setDeleteOpen(true)}
        variant={"secondary"}
        className="block mx-auto"
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteAccount;
