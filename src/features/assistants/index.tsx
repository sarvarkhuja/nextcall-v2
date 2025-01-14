
import BlankPage from "./components/blank-page";
import AssistantList from "./components/assistant-list";

export default function Assistants() {
    const isListEmpty = false
    return isListEmpty ? <BlankPage /> : <AssistantList />
}