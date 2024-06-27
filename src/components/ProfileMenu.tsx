import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut, Pencil, UserCog } from "lucide-react";
import Link from "next/link";

export default function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <UserCog className="stroke-casal-700" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/edit-profile">
          <DropdownMenuItem className="gap-2 hover:!bg-casal-100">
            <Pencil className="stroke-1" /> Edit Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="bg-casal-700" />
        <SignOutButton>
          <DropdownMenuItem className="gap-2">
            <LogOut className="stroke-1" />
            Log out
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
