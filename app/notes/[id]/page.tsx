import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import HydrateClient from "@/components/TanStackProvider/HydrateClient";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const qc = new QueryClient();
    await qc.prefetchQuery({
        queryKey: ["note", params.id],
        queryFn: () => fetchNoteById(params.id),
    });
    const state = dehydrate(qc);

    return (
        <HydrateClient state={state}>
            <NoteDetailsClient />
        </HydrateClient>
    );
}
