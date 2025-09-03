import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { dehydrate } from '@tanstack/query-core';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: NoteDetailsProps): Promise<Metadata> => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: note.title,
    description: note.content.slice(0, 15),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 15),
      url: `https://08-zustand-xi-two.vercel.app/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
};

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
