import { formatScore } from '../data';

const StatusBar = ({ timeLeft, lives, score, streak }) => (
  <div className="status-bar">
    <p className={timeLeft <= 15 ? 'time low' : 'time'}>Thời gian: {timeLeft} giây</p>
    <p>
      Mạng: {lives}{' '}
      <span className="hearts">
        {Array.from({ length: lives }, (_, i) => (
          <span key={i}>❤</span>
        ))}
      </span>
    </p>
    <p>Điểm: {formatScore(score)}</p>
    <p>Chuỗi đúng: {streak}</p>
  </div>
);

export default StatusBar;