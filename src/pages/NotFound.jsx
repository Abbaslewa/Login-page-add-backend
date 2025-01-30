import { useNavigate } from 'react-router-dom';
import { Home, FileQuestion } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className='min-h-screen p-6 md:p-10 bg-primary flex items-center justify-center'>
      <div className='max-w-lg w-full  p-8 rounded-2xl text-center'>
        <FileQuestion className='mx-auto text-error mb-4' size={64} strokeWidth={1.5} />
        <h1 className='text-4xl font-bold mb-4 text-white/90'>Page Not Found</h1>
        <p className='text-white/60 mb-8'>
          The page you're looking for doesn't exist <br />
          or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className='inline-flex items-center justify-center gap-2 bg-secondary py-3 px-6 rounded-xl transition-all hover:shadow-lg text-white/90'
        >
          <Home size={20} className='stroke-[2.5]' />
          <span>Back to Home</span>
        </button>
      </div>
    </main>
  );
};

export default NotFound;
