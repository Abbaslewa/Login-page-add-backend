import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import ErrorAlert from '../components/ErrorAlert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_USING_APP_URL;

  if (localStorage.getItem('token')) {
    return <Navigate to='/notes' replace />;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const data = await fetch(`${apiUrl}/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const res = await data.json();

      if (res.ok) {
        localStorage.setItem('token', res.token);
        navigate('/notes');
      } else {
        throw new Error(res.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-blue-500 to-purple-700 p-6">
      <div className="backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl shadow-lg p-8 sm:p-10 max-w-sm w-full">
        <h1 className="text-3xl font-bold font-semibold text-white text-center mb-6">Login</h1>
        <p className="text-white/80 text-center mb-6">
          Please sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <ErrorAlert
              className="bg-red-200 text-red-600 p-3 rounded-md border border-red-400 mb-4"
              message={error}
            />
          )}

          <div>
            <label className="block text-white/70 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/40 placeholder-white/70 text-white focus:ring-4 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur-lg"
            />
          </div>

          <div>
            <label className="block text-white/70 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/40 placeholder-white/70 text-white focus:ring-4 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur-lg"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-500 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : null}
            <span>{isSubmitting ? 'Logging in...' : 'Login'}</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="text-white/60 hover:text-white transition-colors"
          >
            Don't have an account? Sign up
            <ArrowRight size={16} className="inline ml-1" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
