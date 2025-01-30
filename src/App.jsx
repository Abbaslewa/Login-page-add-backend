import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Notes from './pages/Notes';
import EditNote from './pages/EditNote';
import NotFound from './pages/NotFound';
import LogoutButton from './components/LogoutButton';

import AuthGuard from './authGuard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/notes'
          element={
            <AuthGuard>
              <>
                <Notes />
                <LogoutButton />
              </>
            </AuthGuard>
          }
        />
        <Route
          path='/note/:id/edit'
          element={
            <AuthGuard>
              <>
                <EditNote />
                <LogoutButton />
              </>
            </AuthGuard>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
