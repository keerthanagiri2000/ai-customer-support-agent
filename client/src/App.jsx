import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Chat = lazy(() =>import('./pages/chat'))
const Register = lazy(() => import('./pages/register'));
const Login = lazy(() => import('./pages/login'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element = {<Chat />} />
          <Route path='/register' element = {<Register />} />
          <Route path='/login' element = {<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
