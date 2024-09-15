import React, { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import GameBtn from "./GameBtn";

import greenSound from "./audios/green.mp3";
import redSound from "./audios/red.mp3";
import yellowSound from './audios/yellow.mp3';
import blueSound from "./audios/blue.mp3";

const colors = ["green", "red", "yellow", "blue"];

function SimonGame() {
  // Estados
  const [sequence, setSequence] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);
  const [gameOver, setGameOver] = useState(false); // Nuevo estado para controlar el fin del juego
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem("highScore")) || 0 // Cargar el puntaje más alto
  );

  // Referencias
  const greenRef = useRef(null);
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const blueRef = useRef(null);

  // Sonidos para cada color
  const [playGreen] = useSound(greenSound);
  const [playRed] = useSound(redSound);
  const [playYellow] = useSound(yellowSound);
  const [playBlue] = useSound(blueSound);

  // Reinicia el juego
  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
    setGameOver(false);
  };

  // Añade un color aleatorio a la secuencia
  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  // Inicia el siguiente nivel del juego
  const handleNextLevel = () => {
    if (!playing && !gameOver) {
      setPlaying(true);
      addNewColor();
    }
  };

  // Maneja el color clickeado
  const handleColorClick = (e) => {
    if (!playing || isShowingSequence) return;  // Evitar clics si no se está jugando o si se está mostrando la secuencia
  
    // Reproduce el sonido según el color clickeado
    const color = e.target.getAttribute("color");
    switch (color) {
      case "green":
        playGreen();
        break;
      case "red":
        playRed();
        break;
      case "yellow":
        playYellow();
        break;
      case "blue":
        playBlue();
        break;
      default:
        break;
    }

    e.target.classList.add("opacity-50");
  
    setTimeout(() => {
      e.target.classList.remove("opacity-50");
  
      const clickColor = e.target.getAttribute("color");
  
      // Color correcto de la secuencia clickeado
      if (sequence[playingIdx] === clickColor) {
        // Último color de la secuencia clickeado
        if (playingIdx === sequence.length - 1) {
          setTimeout(() => {
            setPlayingIdx(0);
            addNewColor();
          }, 210);
        } else {
          // Siguiente color de la secuencia
          setPlayingIdx(playingIdx + 1);
        }
      } else {
        // Color incorrecto clickeado, termina el juego
        setGameOver(true);
        updateHighScore(sequence.length); // Actualiza el puntaje más alto
        setIsShowingSequence(true);
      }
    }, 210);
  };  

  // Actualizar el puntaje más alto
  const updateHighScore = (currentScore) => {
    const currentHighScore = parseInt(localStorage.getItem("highScore")) || 0;
    if (currentScore > currentHighScore) {
      localStorage.setItem("highScore", currentScore);
      setHighScore(currentScore); // Actualizar el estado
    }
  };

  // Mostrar la secuencia de colores
  useEffect(() => {
    if (sequence.length > 0) {
      setIsShowingSequence(true);  // Bloquear los clics mientras se muestra la secuencia
  
      const showSequence = (idx = 0) => {
        let ref = null;
  
        // Determina qué botón resaltar y qué sonido reproducir
        if (sequence[idx] === "green") {
            ref = greenRef;
            playGreen();
          }
          if (sequence[idx] === "red") {
            ref = redRef;
            playRed();
          }
          if (sequence[idx] === "yellow") {
            ref = yellowRef;
            playYellow();
          }
          if (sequence[idx] === "blue") {
            ref = blueRef;
            playBlue();
          }
  
        // Resalta la referencia
        setTimeout(() => {
          ref.current.classList.add("brightness-[2.5]");
  
          setTimeout(() => {
            ref.current.classList.remove("brightness-[2.5]");
            if (idx < sequence.length - 1) {
              showSequence(idx + 1);
            } else {
              setIsShowingSequence(false);  // Permitir clics después de mostrar la secuencia
            }
          }, 210);
        }, 210);
      };

      showSequence();
    }
  }, [sequence]);
  

  return (
    // Contenedor principal
    <div className="flex justify-center items-center bg-neutral-900 text-white w-screen h-screen">
      <div className="relative flex flex-col justify-center items-center">
         {/* Puntaje más alto */}
         <h2 className="fixed top-2 left-3 text-2xl font-bungee box-border">Puntaje mas alto: {highScore}</h2>

        {/* Botones de colores */}
        <div>
          <GameBtn
            color="green"
            border="rounded-custom-rounded-tl-full"
            bg="bg-verde"
            onClick={handleColorClick}
            ref={greenRef}
          />
          <GameBtn
            color="red"
            border="rounded-custom-rounded-tr-full"
            bg="bg-rojo"
            onClick={handleColorClick}
            ref={redRef}
          />
        </div>
        <div>
          <GameBtn
            color="yellow"
            border="rounded-custom-rounded-bl-full"
            bg="bg-amarillo"
            onClick={handleColorClick}
            ref={yellowRef}
          />
          <GameBtn
            color="blue"
            border="rounded-custom-rounded-br-full"
            bg="bg-azul"
            onClick={handleColorClick}
            ref={blueRef}
          />
        </div>

        {/* Botón de Play*/}
        {!gameOver && (
          <button
            className="absolute bg-neutral-900 text-white text-xl sm:text-4xl font-bungee rounded-full w-[75px] h-[75px] sm:w-[130px] sm:h-[130px] duration-200 hover:scale-105"
            onClick={handleNextLevel}
          >
            {sequence.length === 0 ? "Play" : sequence.length}
          </button>
        )}

        {/* Botón de Reiniciar*/}
        {gameOver && (
          <button
            className="absolute bg-neutral-900 text-white text-xl sm:text-3xl font-bungee rounded-full w-[75px] h-[75px] sm:w-[130px] sm:h-[130px] duration-200 hover:scale-105"
            onClick={resetGame}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default SimonGame;
