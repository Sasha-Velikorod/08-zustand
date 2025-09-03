'use client';
import css from './Notes.module.css';
import NoteList from '../../../../components/NoteList/NoteList';
import { fetchNotes } from '../../../../lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Pagination from '../../../../components/Pagination/Pagination';
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Loading from '@/components/Loading/Loading';

interface NotesClientProp {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProp) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['notes', currentPage, search, tag],
    queryFn: () =>
      fetchNotes({ page: currentPage, search, tag: tag || undefined }),
    placeholderData: keepPreviousData,
  });

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

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
        <button className={css.button} onClick={() => setModalIsOpen(true)}>
          Create note +
        </button>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {modalIsOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onCloseModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
