import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

const messages = {
  perfect: 'Xuất sắc! Bạn đã trả lời đúng cả 15 câu',
  completed: 'Bạn đã hoàn thành thử thách',
  noLives: 'Bạn đã hết mạng',
  timeUp: 'Hết giờ!',
};

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h2>{messages[state.reason]}</h2>
      <p>Người chơi: {state.name}</p>
      <p>Số câu trả lời đúng: {state.correctCount}</p>
      <p>Số mạng còn lại: {state.livesLeft}</p>
      <p>Điểm: {formatScore(state.score)}</p>
      <button onClick={() => navigate('/play')}>Chơi lại</button>{' '}
      <button onClick={() => navigate('/')}>Về trang chủ</button>
    </div>
  );
};

export default Result;