import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface NotesPageProp {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: NotesPageProp): Promise<Metadata> => {
  const { slug } = await params;
  return {
    title: slug[0] === 'All' ? 'All notes' : `${slug[0]} notes`,
    description: slug[0] === 'All' ? 'All notes' : `Notes with tag ${slug[0]}`,
    openGraph: {
      title: slug[0] === 'All' ? 'All notes' : `${slug[0]} notes`,
      description:
        slug[0] === 'All' ? 'All notes' : `Notes with tag ${slug[0]}`,
      url: `https://08-zustand-xi-two.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: slug[0] === 'All' ? 'All notes' : `${slug[0]} notes`,
        },
      ],
    },
  };
};

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
