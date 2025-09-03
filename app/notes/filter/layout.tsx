import { ReactNode } from 'react';
import css from './layout.module.css';

interface NotesFilterLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

const NotesFilterLayout = ({ children, sidebar }: NotesFilterLayoutProps) => {
  return (
    <section className={css.section}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesFilterLayout;
