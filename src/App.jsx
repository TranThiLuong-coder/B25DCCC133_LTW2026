import { useState } from 'react'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'

const App = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', score: 8.5, class: 'D25CQCC01' },
    { id: 2, name: 'Trần Thị B', score: 6.5, class: 'D25CQCC01' },
    { id: 3, name: 'Lê Văn C', score: 4, class: 'D25CQCC02' },
    { id: 4, name: 'Phạm Thị D', score: 9, class: 'D25CQCC02' },
  ])
  const [filter, setFilter] = useState('all')

  const handleAdd = (newStudent) => {
    const maxId = students.reduce((max, s) => Math.max(max, s.id), 0)
    setStudents([...students, { id: maxId + 1, ...newStudent }])
  }

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  const filteredStudents = students.filter((s) => {
    if (filter === 'good') return s.score >= 8
    if (filter === 'fail') return s.score < 5
    return true
  })

  const total = students.length
  const average =
    total === 0 ? 0 : students.reduce((sum, s) => sum + s.score, 0) / total

  return (
    <div className="app">
      <h1>Quản lý Điểm Sinh viên</h1>
      <StudentForm onAdd={handleAdd} />

      <div>
        <button onClick={() => setFilter('all')}>Tất cả</button>
        <button onClick={() => setFilter('good')}>Giỏi (≥ 8)</button>
        <button onClick={() => setFilter('fail')}>Trượt (&lt; 5)</button>
      </div>

      <p>{`Tổng số sinh viên: ${total} | Điểm trung bình: ${average.toFixed(2)}`}</p>

      <StudentList students={filteredStudents} onDelete={handleDelete} />
    </div>
  )
}

export default App