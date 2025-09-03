'use client';

import { fetchNoteById } from '../../../lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';
import Loading from '@/components/Loading/Loading';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
