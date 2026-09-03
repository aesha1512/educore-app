import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>EduCore</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/courses">Courses</NavLink>
          </li>
          <li>
            <NavLink to="/progress">Progress</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}