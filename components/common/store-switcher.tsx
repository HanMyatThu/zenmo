"use client";
import { useState } from "react";
import { store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";

import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandSeparator,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: store[];
}

export const StoreSwitcher = ({
  className,
  items = [],
}: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const { onOpen } = useStoreModal((state) => state);
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeid
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="size-4 mr-2" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandList>
            <CommandInput placeholder="Search Store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  value={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 size-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="flex flex-row"
                onSelect={() => {
                  setOpen(false);
                  onOpen();
                }}
              >
                <PlusCircle className="mr-2 size-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
