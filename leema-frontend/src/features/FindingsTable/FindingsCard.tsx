import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card.tsx";


const tagStyles = {
    positive: "bg-green-100 text-green-800 px-2 py-1 text-sm font-semibold rounded-xs text-xs",
    negative: "bg-red-100 text-red-800 px-2 py-1 text-sm font-semibold rounded-xs text-xs",
    neutral: "bg-primary-100 text-primary-800 px-2 py-1 text-sm font-semibold rounded-xs text-xs",
}

export default function FindingsCard() {
    return (
        <Card className="px-6">
            <CardTitle>
                <h4>Automated Multi-Currency Stripe Reconciliation Tool</h4>
            </CardTitle>
            <div className="flex justify-start gap-2">
                <CardDescription className={tagStyles.positive}>
                    <span>High Feasibility</span>
                </CardDescription>
                <CardDescription className={tagStyles.negative}>
                    <span>Activity Log</span>
                </CardDescription>
            </div>
            <CardContent className="-px-2 text-muted-foreground flex flex-col gap-4">
                <span>A streamlined integration that automatically maps multi-currency Stripe payments to accounting software without manual adjustments.
                </span>
                <span className="text-caption">Synthesized from 12 community discussions</span>
            </CardContent>
        </Card>
    );
}