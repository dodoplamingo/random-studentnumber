import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Confetti from 'react-confetti';

const goldenGradient = 'linear-gradient(45deg, #FFD700, #FFA500)';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000033;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  position: relative;
`;

const MachineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #111;
  border: 10px solid #FFD700;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
  position: relative;
`;

const MachineTop = styled.div`
  width: 100%;
  background: #0033cc;
  border-bottom: 5px solid #FFD700;
  text-align: center;
  padding: 10px 0;
  color: #FFD700;
  font-size: 2rem;
`;

const SlotReel = styled.div`
  display: flex;
  background: #fff;
  border: 5px solid #FFD700;
  padding: 10px;
  border-radius: 5px;
`;

const SlotItem = styled.div`
  width: 80px;
  height: 120px;
  background-color: #000033;
  border: 3px solid #FFD700;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: bold;
  color: #FFD700;
  text-shadow: 0 0 10px #FFD700;
  ${props => props.isBlinking && css`
    animation: ${blinkingLight} 0.5s linear infinite;
  `}
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 15px 30px;
  font-size: 1.5rem;
  background: ${goldenGradient};
  color: #000033;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  z-index: 1;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  }
`;

const blinkingLight = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const RandomStudentNumber = () => {
  const [number, setNumber] = useState([0, 0, 0, 0]);
  const [finalNumber, setFinalNumber] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (finalNumber) {
      const timer = setInterval(() => {
        setNumber(prev => {
          const newNumber = [...prev];
          for (let i = 0; i < 4; i++) {
            if (newNumber[i] !== parseInt(finalNumber[i])) {
              newNumber[i] = Math.floor(Math.random() * 10);
            }
          }
          return newNumber;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(timer);
        setNumber(finalNumber.split('').map(Number));
        setShowConfetti(true);
        setIsBlinking(true);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [finalNumber]);

  const generateNumber = () => {
    setShowConfetti(false);
    setIsBlinking(false);
    const grade = Math.floor(Math.random() * 3) + 1; // 1~3
    const classNum = Math.floor(Math.random() * 4) + 1; // 1~4
    const studentNum = Math.floor(Math.random() * 18) + 1; // 1~18
    const randomNum = `${grade}${classNum}${studentNum.toString().padStart(2, '0')}`;
    setFinalNumber(randomNum);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        generateNumber();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <AppContainer>
      <MachineContainer>
        <MachineTop>🌟 학번 추첨기 🌟</MachineTop>
        <SlotReel>
          {number.map((digit, index) => (
            <SlotItem key={index} isBlinking={isBlinking}>{digit}</SlotItem>
          ))}
        </SlotReel>
      </MachineContainer>
      <Button onClick={generateNumber}>학번 생성!</Button>
      {showConfetti && <Confetti />}
    </AppContainer>
  );
};
