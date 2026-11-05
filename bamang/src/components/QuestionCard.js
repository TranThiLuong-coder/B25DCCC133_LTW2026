import { POINTS, LEVELS, LETTERS, formatScore } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({ question, index, total, status, selected, onSelect }) => {
  const getState = (i) => {
    if (status === 'locked') return i === selected ? 'chosen' : '';
    if (status === 'revealed') {
      if (i === question.answer) return 'correct';
      if (i === selected) return 'wrong';
    }
    return '';
  };

  return (
    <div>
      <p className="question-meta">
        {`Câu ${index + 1}/${total} · ${LEVELS[question.level]} · ${formatScore(POINTS[question.level])}`}
      </p>
      <h3>{question.question}</h3>
      <div className="answer-grid">
        {question.options.map((option, i) => (
          <AnswerButton
            key={i}
            letter={LETTERS[i]}
            text={option}
            state={getState(i)}
            disabled={status !== 'answering'}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;