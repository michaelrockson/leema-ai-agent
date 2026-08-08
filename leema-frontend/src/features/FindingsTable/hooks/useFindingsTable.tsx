
type SaveOptions = {
    label: string;
    value: string;
}

const saveOptions: SaveOptions[] = [
    {
        label: "Save to Notion",
        value: "Notion",
    },
    {
        label: "Save to Email",
        value: "Email",
    },
    {
        label: "Save to PDF",
        value: "PDF",
    },
    {
        label: "Save to CSV",
        value: "CSV",
    },
    {
        label: "All Channels",
        value: "All Channels",
    },
];

export type FindingDataProps = {
    id: number;
    title: string;
    feasibility: string;
    tag: string;
    description: string;
    source: string;
}

const findingData: FindingDataProps[] = [
    {
        id: 1,
        title: "Automated Multi-Currency Stripe Reconciliation Tool",
        feasibility: "High Feasibility",
        tag: "Activity Log",
        description: "A streamlined integration that automatically maps multi-currency Stripe payments to accounting software without manual adjustments.",
        source: "Synthesized from 12 community discussions",
    },
    {
        id: 2,
        title: "In-App Feedback Prioritization via Slack",
        feasibility: "High Feasibility",
        tag: "High Demand",
        description: "Help product teams capture, categorize, and prioritize customer requests directly inside team Slack channels.",
        source: "Synthesized from 8 community discussions",
    }
];


export default function useFindingsTable() {
    return { saveOptions, findingData };
}