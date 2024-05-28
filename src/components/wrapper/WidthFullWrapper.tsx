import { cn } from "@/lib/utils";

type WidthFullWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function WidthFullWrapper({
  children,
  className,
}: WidthFullWrapperProps) {
  return <div className={cn("flex gap-2 w-full", className)}>{children}</div>;
}
