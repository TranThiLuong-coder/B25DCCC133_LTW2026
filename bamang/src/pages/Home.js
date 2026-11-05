import { useNavigate } from 'react-router-dom';
import { TOTAL_TIME, MAX_LIVES, STREAK_BONUS, formatScore } from '../data';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();

  const record =
    history.length > 0 ? history.reduce((top, r) => (r.score > top.score ? r : top), history[0]) : null;

  const handleStart = (e) => {
    e.preventDefault();
    navigate('/play');
  };

  return (
    <div>
      <h2>Thử thách 3 mạng</h2>
      {record && <p>{`Kỷ lục: ${formatScore(record.score)} – ${record.name}`}</p>}
      <ul>
        <li>{`Bạn có ${MAX_LIVES} mạng và ${TOTAL_TIME} giây cho cả lượt chơi.`}</li>
        <li>Trả lời lần lượt 15 câu hỏi, đúng được cộng điểm theo mức độ.</li>
        <li>{`Từ câu đúng thứ 3 liên tiếp, mỗi câu thưởng thêm ${formatScore(STREAK_BONUS)}.`}</li>
        <li>Trả lời sai mất 1 mạng nhưng vẫn đi tiếp.</li>
        <li>Lượt chơi kết thúc khi hết câu, hết mạng hoặc hết giờ.</li>
      </ul>
      <form onSubmit={handleStart}>
        <label htmlFor="playerName">Tên người chơi: </label>
        <input
          id="playerName"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button type="submit" disabled={!playerName.trim()}>
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;