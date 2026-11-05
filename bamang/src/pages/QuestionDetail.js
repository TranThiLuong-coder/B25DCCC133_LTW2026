import { Link, useParams, useNavigate } from 'react-router-dom';
import { POINTS, LEVELS, LETTERS, formatScore } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionId = Number(id);

  const question = questions.find((q) => q.id === questionId);
  const prev = questions.find((q) => q.id === questionId - 1);
  const next = questions.find((q) => q.id === questionId + 1);

  if (!question) {
    return (
      <div>
        <p>Không tìm thấy câu hỏi</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>
        {`Câu hỏi số ${question.id} (${LEVELS[question.level]} · ${formatScore(POINTS[question.level])})`}
      </h2>
      <p>{question.question}</p>
      <ul className="options">
        {question.options.map((option, index) => (
          <li key={index} className={index === question.answer ? 'option correct' : 'option'}>
            {LETTERS[index]}. {option}
            {index === question.answer && ' (Đáp án đúng)'}
          </li>
        ))}
      </ul>
      <div className="detail-nav">
        {prev && <Link to={`/questions/${prev.id}`}>← Câu trước</Link>}
        {next && <Link to={`/questions/${next.id}`}>Câu sau →</Link>}
      </div>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default QuestionDetail;