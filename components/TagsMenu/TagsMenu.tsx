'use client';

import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';

const tagsList: string[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tagsList.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link
                className={css.menuLink}
                onClick={toggle}
                href={`/notes/filter/${tag}`}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
