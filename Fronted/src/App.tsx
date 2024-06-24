import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import LoginPage from './pages/LoginPage';
import RegisterUserPage from './pages/RegisterPage';
import NewMarvelCharacter from './pages/NewMarvelCharacter';
import MarvelCharacterDetails from './pages/MarvelCharacterDetails';
import MarvelCharactersList from './pages/MarvelCharactersList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
  
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/nuevo-marvelCharacter" element={<NewMarvelCharacter />} />
          <Route path="/character/:id" element={<MarvelCharacterDetails />} />
          <Route path="/" element={<MarvelCharactersList />} />
        </Route>
      </Routes>

  );
}

export default App;
