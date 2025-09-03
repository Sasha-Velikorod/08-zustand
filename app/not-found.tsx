import css from './not-found.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Page does not exist.',
  openGraph: {
    title: 'Page not found',
    description: 'Page does not exist.',
    url: 'https://08-zustand-xi-two.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Page not found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
