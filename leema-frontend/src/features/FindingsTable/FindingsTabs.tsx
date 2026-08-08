import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import FindingsCard from "@/features/FindingsTable/FindingsCard.tsx";

export function FindingsTabs() {
    return (
        <Tabs className="flex flex-col">
            <TabsList variant="line" className="divide-y">
                <TabsTrigger value="findings">Discoveries</TabsTrigger>
                <TabsTrigger value="details">Activity Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="findings" className="py-2 flex flex-col gap-4">
                <FindingsCard/>
                <FindingsCard/>
            </TabsContent>
            <TabsContent value="details" className="py-2 flex flex-col gap-4">
                <FindingsCard/>
                <FindingsCard/>
            </TabsContent>
        </Tabs>
    );
}