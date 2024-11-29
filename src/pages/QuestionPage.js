import React, { useState, useEffect } from "react"; // Hooks do React para estados e efeitos colaterais
import axios from "../services/AxiosConfig.js"; // Instância configurada do axios
import "./QuestionPage.css";

const QuestionPage = () => {
  const listTrail = [
    "R$ 1.000,00",
    "R$ 1.000,00",
    "R$ 1.000,00",
    "R$ 1.000,00",
    "R$ 1.000,00",
    "R$ 10.000,00",
    "R$ 10.000,00",
    "R$ 10.000,00",
    "R$ 10.000,00",
    "R$ 10.000,00",
    "R$ 100.000,00",
    "R$ 100.000,00",
    "R$ 100.000,00",
    "R$ 100.000,00",
    "R$ 100.000,00",
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  // PERGUNTA
  const [question, setQuestion] = useState(null); // Armazena a pergunta atual
  // ALTERNATIVAS
  const [options, setOptions] = useState([]); // Armazena as opções de resposta
  // PONTUACAO
  const [score, setScore] = useState(0); // Armazena a pontuação do jogador

  // NIVEL
  const [level, setLevel] = useState("FACIL");

  // NUMERO DA QUESTAO
  const [questionNumber, setQuestionNumber] = useState(0);

  const [gameOver, setGameOver] = useState(false); // Indica se o jogo terminou
  const [gameStarted, setGameStarted] = useState(false);

  // Transição
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionNumber, setTransitionNumber] = useState(3);

  const [error, setError] = useState("");

  // Busca uma pergunta do backend ao carregar a página
  useEffect(() => {
    fetchQuestion();
  }, []);

  // Função para buscar uma pergunta do backend
  const fetchQuestion = () => {
    verifyLevel();

    axios
      .get(`/perguntas/${level}`) // Altere o nível conforme o progresso do jogador
      .then((response) => {
        if (questionNumber >= 15) {
          setQuestion(response.data[0].pergunta); // Define a pergunta atual
          setOptions(response.data[0].alternativas); // Define as opções de resposta
        } else if (questionNumber >= 10) {
          setQuestion(response.data[questionNumber - 10].pergunta); // Define a pergunta atual
          setOptions(response.data[questionNumber - 10].alternativas); // Define as opções de resposta
        } else {
          setQuestion(response.data[questionNumber].pergunta); // Define a pergunta atual
          setOptions(response.data[questionNumber].alternativas); // Define as opções de resposta
        }
      })
      .catch((error) => {
        setError("Erro ao buscar pergunta:", error);
        console.error("Erro ao buscar pergunta:", error);
      });
  };

  // Função chamada ao jogador responder a uma pergunta
  const handleAnswer = () => {
    if (selectedOption.correta) {
      if (questionNumber < 5) {
        setScore(score + 1000); // Atualiza o montante
      } else if (questionNumber < 10) {
        setScore(score + 10000); // Atualiza o montante
      } else if (questionNumber < 15) {
        setScore(score + 10000); // Atualiza o montante
      } else {
        setScore(score + 10000); // Atualiza o montante
      }

      setQuestionNumber(questionNumber + 1);
      alert(`Resposta correta! Você ganhou R$ ${score}`);
      setSelectedOption(null);
      handleTransition(true);
    } else {
      alert("Resposta errada! Você perdeu tudo.");
      setGameOver(true); // Termina o jogo
    }
  };

  // Função chamada ao jogador decidir parar o jogo
  const handleStop = () => {
    alert(`Você parou o jogo com R$ ${score}. Parabéns!`);
    setGameOver(true); // Termina o jogo
  };

  const handleTransition = (shouldFetchQuestion) => {
    setGameStarted(true);
    setIsTransitioning(true);
    setTransitionNumber(3);

    const interval = setInterval(() => {
      setTransitionNumber((previousNumber) => {
        if (previousNumber === 0) {
          clearInterval(interval);
          setIsTransitioning(false);
          return previousNumber;
        }
        return previousNumber - 1;
      });
    }, 1000);

    if (shouldFetchQuestion) {
      fetchQuestion();
    }
  };

  const verifyLevel = () => {
    if (score > 555000) {
      setLevel("AVANCADO");
    } else if (score > 55000) {
      setLevel("DIFICIL");
    } else if (score > 5000) {
      setLevel("MODERADO");
    } else {
      setLevel("FACIL");
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option); // Atualiza o estado com a opção selecionada
  };

  return (
    <div className="questionpage-container">
      <div className="questionpage-photo-container">
        {!gameStarted ? (
          <button
            className="start-button"
            onClick={() => handleTransition(true)}
            disabled={isTransitioning}
          >
            Iniciar
          </button>
        ) : isTransitioning ? (
          <h1 className="transition-number">{transitionNumber}</h1>
        ) : (
          <div className="question-container">
            <h1 className="question-title">{question}</h1>
            <div className="options-container">
              {options.map((option) => (
                <div key={option.id} className="option-wrapper">
                  <button
                    className={`option-button ${
                      selectedOption && selectedOption.id === option.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleSelect(option)}
                    type="select"
                  >
                    {option.descricao}
                  </button>
                </div>
              ))}
            </div>
            <div className="actions-container">
              <button className="action-button stop-button">PARAR</button>
              <button
                className="action-button confirm-button"
                onClick={() => handleAnswer()}
              >
                CONFIRMAR ALTERNATIVA
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="questionpage-trilha-container">
        <div className="questionpage-trilha-mini-container">
          <ul className="list-trilha list-1milhao">
            {questionNumber >= 15 ? (
              <li className="li-1milhao">R$ 1.000.000,00</li>
            ) : (
              <li>R$ 1.000.000,00</li>
            )}
          </ul>
          <ul className="list-trilha list-100mil">
            {listTrail.map((item, index) => {
              if (index > 9) {
                if (index === questionNumber) {
                  return <li className="current-question-number">{item}</li>;
                }
                return <li>{item}</li>;
              }
            })}
            <li>Nível 3</li>
          </ul>
          <ul className="list-trilha list-10mil">
            {listTrail.map((item, index) => {
              if (index > 4 && index < 10) {
                if (index === questionNumber) {
                  return <li className="current-question-number">{item}</li>;
                }
                return <li>{item}</li>;
              }
            })}
            <li>Nível 2</li>
          </ul>
          <ul className="list-trilha list-1mil" reversed>
            {listTrail.map((item, index) => {
              if (index < 5) {
                if (index === questionNumber) {
                  return <li className="current-question-number">{item}</li>;
                }
                return <li>{item}</li>;
              }
            })}
            <li>Nível 1</li>
          </ul>
          <ul className="list-trilha">
            <li>
              Você tem:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(score)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
