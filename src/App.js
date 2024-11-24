import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importa os componentes das páginas que serão renderizadas nas rotas
import HomePage from './pages/HomePage';
import QuestionPage from './pages/QuestionPage';

function App() {
  return (
    <Router>
      {/* Define as rotas da aplicação */}
      <Routes>
        {/* Rota para a página inicial */}
        <Route path="/" element={<HomePage />} />
        {/* Rota para a página de perguntas */}
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;