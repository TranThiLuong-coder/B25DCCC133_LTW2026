import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TOTAL_TIME, MAX_LIVES } from '../data';
import { calcScore } from '../utils';
import QuestionCard from '../components/QuestionCard';
import StatusBar from '../components/StatusBar';
import ProgressBar from '../components/ProgressBar';

const Play = ({ playerName, questions }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [status, setStatus] = useState('answering');
  const [selected, setSelected] = useState(null);

  const total = questions.length;
  const current = questions[index];
  const { score, streak } = calcScore(results, questions);

  const finish = (finalResults, finalLives, reason) => {
    const finalScore = calcScore(finalResults, questions).score;
    navigate('/result', {
      replace: true,
      state: {
        name: playerName,
        score: finalScore,
        correctCount: finalResults.filter((r) => r === 'correct').length,
        livesLeft: finalLives,
        reason,
      },
    });
  };

  const handleSelect = (i) => {
    if (status !== 'answering') return;
    setSelected(i);
    setStatus('locked');
  };

  const handleReveal = () => {
    const isCorrect = selected === current.answer;
    setResults([...results, isCorrect ? 'correct' : 'wrong']);
    if (!isCorrect) setLives(lives - 1);
    setStatus('revealed');
  };

  const goNext = () => {
    if (lives <= 0) {
      finish(results, lives, 'noLives');
      return;
    }
    if (index + 1 >= total) {
      const perfect = results.length === total && results.every((r) => r === 'correct');
      finish(results, lives, perfect ? 'perfect' : 'completed');
      return;
    }
    setIndex(index + 1);
    setSelected(null);
    setStatus('answering');
  };

  useEffect(() => {
    if (status !== 'answering') return undefined;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (timeLeft <= 0) finish(results, lives, 'timeUp');
  }, [timeLeft]);

  useEffect(() => {
    let timer;
    if (status === 'locked') timer = setTimeout(handleReveal, 1000);
    if (status === 'revealed') timer = setTimeout(goNext, 1000);
    return () => clearTimeout(timer);
  }, [status]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <StatusBar timeLeft={Math.max(timeLeft, 0)} lives={lives} score={score} streak={streak} />
      <QuestionCard
        question={current}
        index={index}
        total={total}
        status={status}
        selected={selected}
        onSelect={handleSelect}
      />
      <ProgressBar results={results} current={index} total={total} />
    </div>
  );
};

export default Play;