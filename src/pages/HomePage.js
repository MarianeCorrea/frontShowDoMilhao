import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para redirecionar o usuário

const HomePage = () => {
  const navigate = useNavigate(); // Permite redirecionar para outras páginas

  // Função chamada ao clicar no botão para começar o jogo
  const startGame = () => {
    navigate('/question'); // Redireciona para a página de perguntas
  };

  return (
    <div>
      <h1>Bem-vindo ao Show do Milhão!</h1>
      <p>Prepare-se para desafiar seus conhecimentos e ainda ganhar 1 milhão de reais!</p>
      {/* Botão que inicia o jogo */}
      <button onClick={startGame}>Começar o Jogo</button>
    </div>
  );
};

export default HomePage;