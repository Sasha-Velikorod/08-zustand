import axios from 'axios';
import { Note, NewNote } from '../types/note';

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response = await instance.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });
  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await instance.post<Note>(`/notes`, note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await instance.get<Note>(`/notes/${id}`);
  return response.data;
};
