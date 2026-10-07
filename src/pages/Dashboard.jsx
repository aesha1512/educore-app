import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { authFetch } from '../utils/api';

// Weekly study activity is still simulated for now, since we aren't tracking
// actual study-time sessions in the database yet — this could be a future enhancement.
const weeklyActivity = [
  { day: 'Mon', hours: 1.2 },
  { day: 'Tue', hours: 0.8 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 0.4 },
  { day: 'Fri', hours: 2.1 },
  { day: 'Sat', hours: 0.6 },
  { day: 'Sun', hours: 0.9 },
];

export default function Dashboard({ user }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await authFetch(`/api/enrolments/${user.id}`);
        if (!response.ok) {
          setStatus('error');
          return;
        }
        const data = await response.json();
        setEnrolledCourses(data);
        setStatus('ready');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    }

    loadData();
  }, [user.id]);

  if (status === 'loading') {
    return <p>Loading dashboard…</p>;
  }

  if (status === 'error') {
    return <p>Could not load your dashboard. Is the backend server running?</p>;
  }

  return (
    <div>
      <h1>Hello, {user.name} 👋</h1>
      <p>Let's pick up where you left off.</p>

      <h3 style={{ marginTop: '30px' }}>Weekly study activity</h3>
      <div style={{ width: '100%', maxWidth: '500px', height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={weeklyActivity}>
            <XAxis dataKey="day" />
            <Tooltip formatter={(value) => [`${value}h`, 'Studied']} />
            <Bar dataKey="hours" fill="#2f5d50" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 style={{ marginTop: '30px' }}>Continue learning</h3>
      {enrolledCourses.length === 0 ? (
        <p>You haven't enrolled in anything yet.</p>
      ) : (
        <ul>
          {enrolledCourses.map((course) => (
            <li key={course.enrolmentId}>
              {course.title} — {course.progress}% complete
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}