import "./App.css";
import {Section} from "@/components/ui/section.tsx";
import Header from "@/features/Header/Header.tsx";
import ResearchTable from "@/features/ResearchTable/ResearchTable.tsx";
import FindingsTable from "@/features/FindingsTable/components/FindingsTable.tsx";

function App() {
    return (
        <Section>
            <Header/>
            <ResearchTable/>
            <FindingsTable/>
        </Section>
    );
}

export default App;
