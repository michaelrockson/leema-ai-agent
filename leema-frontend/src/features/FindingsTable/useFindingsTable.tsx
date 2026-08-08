
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

export default function useFindingsTable() {
    return { saveOptions };
}