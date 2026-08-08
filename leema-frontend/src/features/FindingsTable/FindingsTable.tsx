import {Button} from "@/components/ui/button.tsx";
import FindingsSelect from "@/features/FindingsTable/FindingsSelect.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {FindingsTabs} from "@/features/FindingsTable/FindingsTabs.tsx";

export default function FindingsTable() {

    return (
        <div className="container mx-auto py-12">
            <Card className="flex flex-col gap-6">
                <CardHeader className="flex justify-between items-center px-6 py-2">
                    <h4>Leema Findings: Opportunity Briefs</h4>
                    <div className="flex justify-between items-center gap-4">
                        <FindingsSelect/>
                        <Button className="py-5 px-5">Save Discoveries</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <FindingsTabs />
                </CardContent>
            </Card>
        </div>

    );


}