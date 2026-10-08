const StudentItem = ({ student }) => {
  const { id, name, score, class: className } = student

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{score}</td>
      <td>{className}</td>
      <td>
        <button>Xóa</button>
      </td>
    </tr>
  )
}

export default StudentItem