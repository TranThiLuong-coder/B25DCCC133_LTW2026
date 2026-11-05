import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TOTAL_TIME, MAX_LIVES } from '../data';
import { calcScore } from '../utils';
import QuestionCard from '../components/QuestionCard';
import StatusBar from '../components/StatusBar';
import ProgressBar from '../components/ProgressBar';
import Helpers from '../components/Helpers';

const KEYS = ['a', 'b', 'c', 'd'];

const Play = ({ playerName, questions, addRecord }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [status, setStatus] = useState('answering');
  const [selected, setSelected] = useState(null);
  const [hidden, setHidden] = useState([]);
  const [used, setUsed] = useState({ fifty: false, skip: false, life: false });

  const total = questions.length;
  const current = questions[index];
  const { score, streak } = calcScore(results, questions);

  const finish = (finalResults, finalLives, reason) => {
    const finalScore = calcScore(finalResults, questions).score;
    const correctCount = finalResults.filter((r) => r === 'correct').length;
    addRecord({
      id: Date.now(),
      name: playerName,
      score: finalScore,
      correctCount,
      livesLeft: finalLives,
      playedAt: new Date().toLocaleString('vi-VN'),
    });
    navigate('/result', {
      replace: true,
      state: { name: playerName, score: finalScore, correctCount, livesLeft: finalLives, reason },
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
    setHidden([]);
    setStatus('answering');
  };

  const handleFifty = () => {
    const wrongIndexes = current.options.map((_, i) => i).filter((i) => i !== current.answer);
    const shuffled = [...wrongIndexes].sort(() => Math.random() - 0.5);
    setHidden(shuffled.slice(0, 2));
    setUsed({ ...used, fifty: true });
  };

  const handleSkip = () => {
    const newResults = [...results, 'skipped'];
    setUsed({ ...used, skip: true });
    if (index + 1 >= total) {
      finish(newResults, lives, 'completed');
      return;
    }
    setResults(newResults);
    setIndex(index + 1);
    setHidden([]);
  };

  const handleLife = () => {
    if (lives >= MAX_LIVES) return;
    setLives(lives + 1);
    setUsed({ ...used, life: true });
  };

  useEffect(() => {
    if (status !== 'answering') return undefined;
    const timer = setInterval(() => setTimeLeft((t) => Math.max(t - 1, 0)), 1000);
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

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const i = KEYS.indexOf(e.key.toLowerCase());
      if (i === -1 || status !== 'answering' || hidden.includes(i)) return;
      handleSelect(i);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, hidden]);

  useEffect(() => {
    document.title = `Câu ${index + 1}/${total} – còn ${lives} mạng`;
    return () => {
      document.title = 'Thử thách 3 mạng';
    };
  }, [index, lives, total]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <StatusBar timeLeft={timeLeft} lives={lives} score={score} streak={streak} />
      <QuestionCard
        question={current}
        index={index}
        total={total}
        status={status}
        selected={selected}
        hidden={hidden}
        onSelect={handleSelect}
      />
      <Helpers
        status={status}
        lives={lives}
        used={used}
        onFifty={handleFifty}
        onSkip={handleSkip}
        onLife={handleLife}
      />
      <ProgressBar results={results} current={index} total={total} />
    </div>
  );
};

export default Play;