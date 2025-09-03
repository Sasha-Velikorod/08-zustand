import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotePreview from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';

interface NotePreviewPageProp {
  params: Promise<{ id: string }>;
}

const NotePreviewPage = async ({ params }: NotePreviewPageProp) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default NotePreviewPage;
