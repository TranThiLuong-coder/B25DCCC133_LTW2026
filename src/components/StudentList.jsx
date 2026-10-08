import StudentItem from './StudentItem'

const StudentList = ({ students }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Điểm</th>
          <th>Lớp</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem key={student.id} student={student} />
        ))}
      </tbody>
    </table>
  )
}

export default StudentList