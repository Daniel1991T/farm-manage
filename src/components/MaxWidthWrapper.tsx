import { cn } from "@/lib/utils";

type MaxWidthWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MaxWidthWrapper({
  children,
  className,
}: MaxWidthWrapperProps) {
  return (
    <section className={cn("w-full max-w-5xl mx-auto", className)}>
      {children}
    </section>
  );
}
