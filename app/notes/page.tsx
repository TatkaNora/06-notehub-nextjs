import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/api";
import HydrateClient from "@/components/TanStackProvider/HydrateClient";
import NotesClient from "./Notes.client";

const PER_PAGE = 12;

export default async function NotesPage() {
    const qc = new QueryClient();
    await qc.prefetchQuery({
        queryKey: ["notes", 1, PER_PAGE, ""],
        queryFn: () => fetchNotes(1, ""),
    });
    const state = dehydrate(qc);

    return (
        <HydrateClient state={state}>
            <NotesClient />
        </HydrateClient>
    );
}
