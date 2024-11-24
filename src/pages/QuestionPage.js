import React, { useState, useEffect } from 'react'; // Hooks do React para estados e efeitos colaterais
import axios from '../services/AxiosConfig.js'; // Instância configurada do axios

const QuestionPage = () => {
  const [question, setQuestion] = useState(null); // Armazena a pergunta atual
  const [options, setOptions] = useState([]); // Armazena as opções de resposta
  const [score, setScore] = useState(0); // Armazena a pontuação do jogador
  const [skips, setSkips] = useState(2); // Armazena o número de pulos restantes
  const [gameOver, setGameOver] = useState(false); // Indica se o jogo terminou

  // Busca uma pergunta do backend ao carregar a página
  useEffect(() => {
    fetchQuestion();
  }, []);

  // Função para buscar uma pergunta do backend
  const fetchQuestion = () => {
    axios.get('/pergunta/nivel/1') // Altere o nível conforme o progresso do jogador
      .then((response) => {
        setQuestion(response.data.question); // Define a pergunta atual
        setOptions(response.data.options); // Define as opções de resposta
      })
      .catch((error) => {
        console.error('Erro ao buscar pergunta:', error);
      });
  };

  // Função chamada ao jogador responder a uma pergunta
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + question.prize); // Atualiza o montante
      alert(`Resposta correta! Você ganhou R$ ${question.prize}.`);
      fetchQuestion(); // Carrega a próxima pergunta
    } else {
      alert('Resposta errada! Você perdeu tudo.');
      setGameOver(true); // Termina o jogo
    }
  };

  // Função chamada ao jogador pular uma pergunta
  const handleSkip = () => {
    if (skips > 0) {
      setSkips(skips - 1); // Reduz o número de pulos restantes
      fetchQuestion(); // Carrega uma nova pergunta
    } else {
      alert('Você não tem mais pulos disponíveis!');
    }
  };

  // Função chamada ao jogador decidir parar o jogo
  const handleStop = () => {
    alert(`Você parou o jogo com R$ ${score}. Parabéns!`);
    setGameOver(true); // Termina o jogo
  };

  return (
    <div>
      {gameOver ? ( // Verifica se o jogo terminou
        <div>
          <h1>Fim de Jogo!</h1>
          <h2>Montante Final: R$ {score}</h2>
        </div>
      ) : (
        <>
          {question ? ( // Exibe a pergunta quando carregada
            <>
              <h1>{question.text}</h1>
              <div>
                {/* Renderiza as opções de resposta */}
                {options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(option.isCorrect)}>
                    {option.text}
                  </button>
                ))}
              </div>
              {/* Botões para pular ou parar o jogo */}
              <button onClick={handleSkip}>Pular (Restam {skips})</button>
              <button onClick={handleStop}>Parar e Sair com o Montante</button>
              <h2>Montante Atual: R$ {score}</h2>
            </>
          ) : (
            <p>Carregando pergunta...</p> // Mensagem enquanto a pergunta carrega
          )}
        </>
      )}
    </div>
  );
};

export default QuestionPage;