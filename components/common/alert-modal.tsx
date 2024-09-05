"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title: string;
  description: string;
}

export const AlertModal = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
  title,
  description,
}: AlertModalProps) => {
  const [isMounted, setIsMouted] = useState(false);

  useEffect(() => {
    setIsMouted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleOnChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="pt-2 space-x-2 flex items-center justify-end w-full">
          <Button
            type="button"
            disabled={loading}
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            type="submit"
            variant="destructive"
            onClick={onConfirm}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
