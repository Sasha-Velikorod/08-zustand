'use client';
import css from '../Footer/Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Alexandra Velykorod</p>
          <p>
            Contact us:
            <a href="mailto:sasavelikorod@gmail.com">sasavelikorod@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
