import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainMenu } from './pages/MainMenu';
import { Game } from './game/Game';
import { HighScores } from './pages/HighScores';
import { Options } from './pages/Options';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/highscores" element={<HighScores />} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
