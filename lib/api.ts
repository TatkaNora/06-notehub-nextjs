import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const LINK = "https://notehub-public.goit.study/api/notes";
const NOTEHUB_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NoteListResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNotePayload {
    title: string;
    content: string;
    tag: NoteTag;
}

export interface DeleteNoteResponse {
    id: string;
}

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(NOTEHUB_KEY)}`,
    } as const;
}

export async function fetchNotes(
    page: number,
    userQuery: string
): Promise<NoteListResponse> {
    const q = userQuery.trim();
    const res = await axios.get<NoteListResponse>(LINK, {
        params: q ? { page, perPage: 12, search: q } : { page, perPage: 12 },
        headers: authHeaders(),
    });
    return res.data;
}

export async function fetchNoteById(id: string): Promise<Note | null> {
    const res = await axios.get<Note>(`${LINK}/${id}`, {
        headers: authHeaders(),
    });
    return res.data ?? null;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
    const res = await axios.post<Note>(LINK, payload, { headers: authHeaders() });
    return res.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
    const res = await axios.delete<DeleteNoteResponse>(`${LINK}/${id}`, {
        headers: authHeaders(),
    });
    return res.data;
}
