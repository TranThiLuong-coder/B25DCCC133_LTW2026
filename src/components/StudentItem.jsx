const getRank = (score) => {
  if (score >= 8) return { label: 'Giỏi', type: 'good' }
  if (score < 5) return { label: 'Trượt', type: 'fail' }
  return { label: 'Trung bình', type: 'normal' }
}

const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, class: className } = student
  const { label, type } = getRank(score)

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{score}</td>
      <td>{className}</td>
      <td>
        <span className={`rank ${type}`}>{label}</span>
      </td>
      <td>
        <button onClick={() => onDelete(id)}>Xóa</button>
      </td>
    </tr>
  )
}

export default StudentItem