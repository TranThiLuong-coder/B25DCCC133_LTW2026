const ProgressBar = ({ results, current, total }) => (
  <div className="progress-bar">
    {Array.from({ length: total }, (_, i) => {
      let className = 'cell';
      if (results[i] === 'correct') className += ' correct';
      else if (results[i] === 'wrong') className += ' wrong';
      else if (results[i] === 'skipped') className += ' skipped';
      if (i === current) className += ' current';
      return (
        <span key={i} className={className}>
          {i + 1}
        </span>
      );
    })}
  </div>
);

export default ProgressBar;