import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import ErrorAlert from '../components/ErrorAlert';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Check if user is already logged in
  if (localStorage.getItem('token')) {
    return <Navigate to='/notes' replace />;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !firstName.trim() || !lastName.trim() || !age) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const data = await fetch(`${apiUrl}/v1/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          age: parseInt(age),
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const res = await data.json();

      if (res.ok) {
        toast.success(res.message);
        navigate('/');
      } else {
        throw new Error(res.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='min-h-screen p-6 md:p-10 bg-primary flex items-center justify-center'>
      <div className='w-full max-w-2xl'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Create Account</h1>

        <form
          onSubmit={handleSubmit}
          className='bg-secondary p-6 rounded-2xl border border-tertiary transition-all hover:shadow-md'
        >
          {error && (
            <ErrorAlert
              className='mb-6 p-4 bg-error/10 text-error rounded-lg border border-tertiary flex items-center gap-3'
              message={error}
            />
          )}

          <div className='flex gap-4 mb-4'>
            <input
              type='text'
              placeholder='First Name'
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className='flex-1 bg-transparent border border-tertiary py-3 px-4 rounded-xl outline-none focus:border-white transition-all duration-700 font-medium'
            />

            <input
              type='text'
              placeholder='Last Name'
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className='flex-1 bg-transparent border border-tertiary py-3 px-4 rounded-xl outline-none focus:border-white transition-all duration-700 font-medium'
            />

            <input
              type='number'
              placeholder='Age'
              required
              min='1'
              max='150'
              value={age}
              onChange={e => setAge(e.target.value)}
              className='w-24 bg-transparent border border-tertiary py-3 px-4 rounded-xl outline-none focus:border-white transition-all duration-700 font-medium'
            />
          </div>

          <div className='flex gap-4 mb-4'>
            <input
              type='email'
              placeholder='Email'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='flex-1 bg-transparent border border-tertiary py-3 px-4 rounded-xl outline-none focus:border-white transition-all duration-700 font-medium'
            />

            <input
              type='password'
              placeholder='Password'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='flex-1 bg-transparent border border-tertiary py-3 px-4 rounded-xl outline-none focus:border-white transition-all duration-700 font-medium'
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-primary py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isSubmitting && <Loader2 className='animate-spin' size={20} />}
            <span>{isSubmitting ? 'Creating account...' : 'Create Account'}</span>
          </button>

          <div className='mt-6 text-center'>
            <Link to='/' className='text-white/60 hover:text-white transition-colors inline-flex items-center gap-2'>
              Already have an account? Login
              <ArrowRight size={16} />
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
