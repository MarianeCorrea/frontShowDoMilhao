import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import showMilhaoImg from '../assets/show-do-milhao.png';

const HomePage = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/question');
  };

  return (
    <div className="homepage-container">
      <img src={showMilhaoImg} alt="Show do Milhão" className="homepage-image" />
      <h1 className="homepage-title">SHOW DO MILHÃO</h1>
      <p className="homepage-description">
        Desafie seus conhecimentos e ganhe até 1 milhão de reais
      </p>
      <p className="homepage-observation">
        *Obs: O valor é de mentira. Nem sonhe.
      </p>
      <button onClick={startGame} className="homepage-button">COMEÇAR A JOGAR</button>
    </div>
  );
};

export default HomePage;