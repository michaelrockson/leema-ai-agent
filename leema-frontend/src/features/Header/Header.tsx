import {Button} from "@/components/ui/button.tsx";
import {Settings} from "lucide-react";
import DrawerStore from "@/components/DrawerStore.tsx";
import SettingsForm from "@/features/Settings/components/SettingsForm.tsx";

export default function Header() {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                <h2 className="font-bold">Leema: Customer Problem Discovery</h2>
                <span className="py-2 text-muted-foreground">
          Uncover, validate and prioritize customer pain points from
          online discussions
        </span>
            </div>

            <Button variant="secondary" className="py-5 px-3 border-b border-accent">
                <DrawerStore drawerProps={{
                    button: Button,
                    ButtonLabel: <Settings className="size-5"/>,
                    drawerTitle: "Settings",
                    drawerContent: <SettingsForm />,
                    drawerSaveButtonLabel: "Save Changes",
                    drawerCancelButtonLabel: "Cancel"
                }} />

            </Button>
        </div>
    );
}
