import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LucidePlus } from "lucide-react";

type ModalProps = {
  triggerTitle: string;
  children: React.ReactNode;
};

export default function Modal({ triggerTitle, children }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger className="flex border h-fit px-4 py-2 gap-2 rounded-full border-green-600 text-green-600">
        <LucidePlus />
        {triggerTitle}
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
