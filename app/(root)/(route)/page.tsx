"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

const HomePage = () => {
  const { isOpen, onOpen } = useStoreModal((state) => state);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return (
    <div>
      Hello
      <UserButton />
    </div>
  );
};

export default HomePage;
