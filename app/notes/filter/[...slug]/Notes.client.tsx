'use client';
import css from './Notes.module.css';
import NoteList from '../../../../components/NoteList/NoteList';
import { fetchNotes } from '../../../../lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Pagination from '../../../../components/Pagination/Pagination';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Loading from '@/components/Loading/Loading';
import Link from 'next/link';

interface NotesClientProp {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProp) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['notes', currentPage, search, tag],
    queryFn: () =>
      fetchNotes({ page: currentPage, search, tag: tag || undefined }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
    setCurrentPage(1);
  }, 1000);

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  if (isLoading) return <Loading />;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onChange={setCurrentPage}
            totalPages={totalPages}
          />
        )}
        <Link className={css.button} href={'/notes/action/create'}>
          Create note +
        </Link>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
};

export default NotesClient;
