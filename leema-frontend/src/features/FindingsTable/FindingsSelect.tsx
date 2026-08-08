import useFindingsTable from "@/features/FindingsTable/useFindingsTable.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";


export default function FindingsSelect() {

    const { saveOptions } = useFindingsTable();

    return <Select items={saveOptions} >
        <SelectTrigger className="px-5 py-5 w-4/5">
            <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {saveOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>

}