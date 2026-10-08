import { useState } from 'react'

const StudentForm = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [score, setScore] = useState('')
  const [className, setClassName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const scoreNumber = Number(score)

    if (name.trim() === '' || score === '' || className.trim() === '') {
      setError('Vui lòng nhập đầy đủ họ tên, điểm số và lớp!')
      return
    }

    if (isNaN(scoreNumber) || scoreNumber < 0 || scoreNumber > 10) {
      setError('Điểm số phải là số từ 0 đến 10!')
      return
    }

    onAdd({ name: name.trim(), score: scoreNumber, class: className.trim() })

    setName('')
    setScore('')
    setClassName('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Điểm số"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lớp"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <button type="submit">Thêm</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default StudentForm
