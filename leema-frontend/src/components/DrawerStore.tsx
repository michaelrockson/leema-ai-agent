import * as React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer.tsx"
import {Button} from "@/components/ui/button.tsx";
import type {ButtonProps} from "@base-ui/react";


type DrawerStore = {
    button: React.ComponentType<ButtonProps>;
    ButtonLabel: string | React.ComponentType<{ size?: number; color?: string }> | React.ReactElement;
    drawerTitle: string;
    drawerDescription: string;
    drawerContent: React.ReactElement | null;
    drawerSaveButtonLabel: string;
    drawerCancelButtonLabel: string;
}

export default function DrawerStore({drawerProps}: { drawerProps: DrawerStore }) {
    const {ButtonLabel} = drawerProps;

    const renderButtonLabel = () => {
        if (typeof ButtonLabel === 'string') return ButtonLabel;
        if (React.isValidElement(ButtonLabel)) return ButtonLabel;
        return <ButtonLabel />;
    };

    return (
        <Drawer swipeDirection="right">
            <DrawerTrigger> {renderButtonLabel()}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle><h3>{drawerProps.drawerTitle}</h3></DrawerTitle>
                    <DrawerDescription>{drawerProps.drawerDescription}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">{drawerProps.drawerContent}</div>
                <DrawerFooter>
                    <Button>{drawerProps.drawerSaveButtonLabel}</Button>
                    <DrawerClose render={<Button variant="outline"/>}> {drawerProps.drawerCancelButtonLabel} </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}