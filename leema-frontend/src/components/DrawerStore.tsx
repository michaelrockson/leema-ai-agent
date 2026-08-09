import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { ButtonProps } from "@base-ui/react";

type DrawerStore = {
  button: React.ComponentType<ButtonProps>;
  ButtonLabel:
    | string
    | React.ComponentType<{ size?: number; color?: string }>
    | React.ReactElement;
  drawerTitle: string;
  drawerContent: React.ReactElement | null;
  drawerSaveButtonLabel: string;
  drawerCancelButtonLabel: string;
};

export default function DrawerStore({
  drawerProps,
}: {
  drawerProps: DrawerStore;
}) {
  const { ButtonLabel } = drawerProps;

  const renderButtonLabel = () => {
    if (typeof ButtonLabel === "string") return ButtonLabel;
    if (React.isValidElement(ButtonLabel)) return ButtonLabel;
    return <ButtonLabel />;
  };

  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger>{renderButtonLabel()}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b py-4">
          <DrawerTitle>
            <h3>{drawerProps.drawerTitle}</h3>
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          {drawerProps.drawerContent}
        </div>
        <DrawerFooter className="flex jus">
          <Button>{drawerProps.drawerSaveButtonLabel}</Button>
          <DrawerClose render={<Button variant="outline" />}>
            {" "}
            {drawerProps.drawerCancelButtonLabel}{" "}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
