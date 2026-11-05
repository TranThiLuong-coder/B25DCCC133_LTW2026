import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { POINTS, LEVELS, formatScore } from '../data';

const QuestionBank = ({ questions }) => {
  const [level, setLevel] = useState('all');
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const filtered = questions.filter(
    (q) =>
      (level === 'all' || q.level === Number(level)) &&
      q.question.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  const handleFilterShift = (e) => setKeyword(e.target.value);

  const handleRandom = () => {
    const picked = filtered[Math.floor(Math.random() * filtered.length)];
    navigate(`/questions/${picked.id}`);
  };

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div className="toolbar">
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="1">Dễ</option>
          <option value="2">Trung bình</option>
          <option value="3">Khó</option>
        </select>
        <input
          type="text"
          placeholder="Tìm theo nội dung câu hỏi"
          value={keyword}
          onChange={handleFilterShift}
        />
        <button onClick={handleRandom} disabled={filtered.length === 0}>
          Câu ngẫu nhiên
        </button>
      </div>
      <p>Có {filtered.length} câu hỏi</p>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Điểm</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{LEVELS[q.level]}</td>
              <td>{formatScore(POINTS[q.level])}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;