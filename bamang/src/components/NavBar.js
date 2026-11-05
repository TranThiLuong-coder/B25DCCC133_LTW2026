import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

const NavBar = () => (
  <nav className="navbar">
    <NavLink to="/" end className={getLinkClass}>
      Trang chủ
    </NavLink>
    <NavLink to="/questions" className={getLinkClass}>
      Ngân hàng câu hỏi
    </NavLink>
    <NavLink to="/history" className={getLinkClass}>
      Lịch sử
    </NavLink>
  </nav>
);

export default NavBar;