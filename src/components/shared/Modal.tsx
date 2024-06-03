import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ModalProps = {
  triggerTitle: string;
  children: React.ReactNode;
  triggerClassName?: string;
  icon?: JSX.Element;
};

export default function Modal({
  triggerTitle,
  children,
  triggerClassName,
  icon,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "flex border h-fit w-full justify-center items-center px-4 py-2 gap-2 rounded-full border-green-600 text-green-600",
          triggerClassName
        )}
      >
        {icon}
        {triggerTitle}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">{children}</DialogContent>
    </Dialog>
  );
}
