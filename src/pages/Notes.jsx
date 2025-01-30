import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Box, Loader2, Moon, Sun } from 'lucide-react';
import moment from 'moment';
import toast from 'react-hot-toast';

import NoteSkeleton from '../components/NoteSkeleton';
import { getAuthHeaders } from '../utils';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const data = await fetch(`${apiUrl}/v1/notes`, {
        headers: getAuthHeaders(),
      });
      const res = await data.json();
      if (res.ok) {
        setNotes(res.data);
        setError(null);
      } else {
        throw new Error(res.message || 'Failed to fetch notes');
      }
    } catch (err) {
      setError(err.message);
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setIsSubmitting(true);
    try {
      const data = await fetch(`${apiUrl}/v1/notes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          createdAt: moment().format(),
        }),
      });
      const res = await data.json();

      if (res.ok) {
        toast.success('Note created successfully');
        await fetchNotes();
        setTitle('');
        setContent('');
        setError(null);
      } else {
        throw new Error(res.message || 'Failed to create note');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async id => {
    setNoteIdToDelete(id);
    setIsDeleting(true);
    try {
      const data = await fetch(`${apiUrl}/v1/notes/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const res = await data.json();

      if (res.ok) {
        toast.success('Note deleted successfully');
        await fetchNotes();
        setError(null);
      } else {
        throw new Error(res.message || 'Failed to delete note');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
      setNoteIdToDelete(null);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <NoteSkeleton />;
    }

    if (error) {
      return (
        <div className='mb-6 p-4 bg-error/10 text-error rounded-lg border border-tertiary flex items-center gap-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 flex-shrink-0'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
          <span>{error}</span>
        </div>
      );
    }

    if (notes?.length === 0) {
      return (
        <div className='flex flex-col items-center justify-center bg-secondary p-8 rounded-2xl shadow-sm border border-tertiary text-center'>
          <Box className='text-tertiary mb-4' size={56} strokeWidth={1.5} />
          <p className='text-white/60 text-lg font-medium mb-2'>Your note space is empty</p>
          <p className='text-sm text-white/40'>Click the "Add Note" button above to create your first note</p>
        </div>
      );
    }

    return (
      <div className='space-y-4'>
        {notes?.map(note => (
          <div
            key={note._id}
            className='group bg-secondary rounded-xl p-4 shadow-sm border border-tertiary flex justify-between items-center transition-all hover:shadow-md hover:bg-secondary/80 group'
          >
            <div className='flex-1 pr-4'>
              <h2 className='text-white/90 text-lg font-semibold break-words mb-1.5'>{note.title}</h2>
              <p className='text-white/70 break-words text-sm mb-2'>{note.content}</p>
              <small className='text-xs text-white/40 font-medium'>
                Created: {moment(note.createdAt).format('MMM Do YYYY, h:mm a')}
              </small>
            </div>
            <div
              className={`gap-1 transition-all duration-300 ease-in-out ${
                noteIdToDelete === note._id && isDeleting
                  ? 'flex opacity-100'
                  : 'opacity-0 hidden group-hover:flex group-hover:opacity-100'
              }`}
            >
              <button
                onClick={() => navigate(`/note/${note._id}/edit`)}
                className='p-2 text-tertiary hover:bg-primary rounded-lg transition-colors'
                title='Edit note'
              >
                <Edit size={18} className='stroke-[2.5]' />
              </button>
              <button
                onClick={() => handleDeleteNote(note._id)}
                disabled={noteIdToDelete === note._id || isDeleting}
                className='p-2 text-error hover:bg-error/10 rounded-lg transition-colors disabled:opacity-50'
                title='Delete note'
              >
                {noteIdToDelete === note._id && isDeleting ? (
                  <Loader2 size={18} className='animate-spin' />
                ) : (
                  <Trash2 size={18} className='stroke-[2.5]' />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className='min-h-screen p-6 md:p-10 bg-primary'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>My Notes</h1>
        <form
          onSubmit={handleSubmit}
          className='mb-10 bg-secondary p-6 rounded-2xl border border-tertiary transition-all hover:shadow-md'
        >
          <input
            placeholder='Note Title'
            type='text'
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='w-full mb-4 bg-transparent border border-tertiary py-3 px-4 rounded-xl outline-none focus:border-white transition-all duration-700 font-medium'
          />
          <textarea
            placeholder='Start typing your note...'
            required
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={3}
            className='w-full mb-4 bg-transparent border border-tertiary py-3 px-4 rounded-xl outline-none focus:border-white transition-all duration-700 font-medium'
          />
          <button
            type='submit'
            className='w-full bg-primary py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed'
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className='animate-spin' size={20} /> : <Plus size={20} className='stroke-[3]' />}
            <span>{isSubmitting ? 'Adding Note...' : 'Add Note'}</span>
          </button>
        </form>

        {renderContent()}
      </div>
    </main>
  );
};

export default Notes;
