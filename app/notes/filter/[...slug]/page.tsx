import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

interface NotesPageProp {
  params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: NotesPageProp) => {
  const { slug } = await params;

  const currentTag = slug?.[0] || 'All';
  const tag = currentTag === 'All' ? '' : currentTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: '',
        tag: tag || undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag || undefined} />
    </HydrationBoundary>
  );
};

export default NotesPage;
