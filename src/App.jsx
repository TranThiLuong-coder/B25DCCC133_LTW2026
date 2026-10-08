import { useState } from 'react'
import StudentList from './components/StudentList'

const App = () => {
  const  [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', score: 8.5, class: 'D25CQCC01' },
    { id: 2, name: 'Trần Thị B', score: 6.5, class: 'D25CQCC01' },
    { id: 3, name: 'Lê Văn C', score: 4, class: 'D25CQCC02' },
    { id: 4, name: 'Phạm Thị D', score: 9, class: 'D25CQCC02' },
  ])

  return (
    <div className="app">
      <h1>Quản lý Điểm Sinh viên</h1>
      <StudentList students={students} />
    </div>
  )
}

export default App