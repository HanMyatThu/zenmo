import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/navbar/main-nav";

export const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>This will be store switcher</div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
