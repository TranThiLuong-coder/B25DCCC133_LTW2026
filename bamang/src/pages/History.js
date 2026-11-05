import { formatScore } from '../data';

const History = ({ history, onClear }) => {
  if (history.length === 0) {
    return (
      <div>
        <h2>Lịch sử</h2>
        <p>Chưa có lượt chơi nào</p>
      </div>
    );
  }

  const sorted = [...history].sort((a, b) => b.score - a.score || b.livesLeft - a.livesLeft);
  const best = history.reduce((max, r) => Math.max(max, r.score), 0);
  const totalCorrect = history.reduce((sum, r) => sum + r.correctCount, 0);

  return (
    <div>
      <h2>Lịch sử</h2>
      <p>Số lượt chơi: {history.length}</p>
      <p>Điểm cao nhất: {formatScore(best)}</p>
      <p>Tổng số câu trả lời đúng: {totalCorrect}</p>
      <button onClick={onClear}>Xóa lịch sử</button>
      <table>
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Mạng còn lại</th>
            <th>Điểm</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.correctCount}</td>
              <td>{r.livesLeft}</td>
              <td>{formatScore(r.score)}</td>
              <td>{r.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;