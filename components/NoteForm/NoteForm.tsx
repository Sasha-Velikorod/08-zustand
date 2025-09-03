'use client';
import { NewNote } from '../../types/note';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '../../lib/store/noteStore';

const NoteForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const validateForm = (formData: FormData): Record<string, string> => {
    const errors: Record<string, string> = {};
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as string;

    if (!title || title.length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }
    if (title && title.length > 50) {
      errors.title = 'Title must be less than 50 characters';
    }
    if (content && content.length > 500) {
      errors.content = 'Content must be less than 500 characters';
    }
    if (!tag) {
      errors.tag = 'Tag is required';
    }

    return errors;
  };

  const handleSubmit = async (formData: FormData) => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const values: NewNote = {
        title: formData.get('title') as string,
        content: (formData.get('content') as string) || '',
        tag: formData.get('tag') as string,
      };

      mutation.mutate(values);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          value={draft.title}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          onChange={handleChange}
          value={draft.content}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          onChange={handleChange}
          value={draft.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={router.back}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
