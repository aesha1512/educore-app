import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ user, onLogout }) {
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

      <div style={{ marginTop: '24px', fontSize: '13px', color: '#666' }}>
        <p>Logged in as</p>
        <p style={{ fontWeight: 600, color: '#1c2033' }}>{user?.name}</p>
        <button
          onClick={onLogout}
          style={{
            marginTop: '8px',
            background: 'transparent',
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}