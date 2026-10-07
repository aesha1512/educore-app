import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { authFetch } from '../utils/api';

const breakdown = [
  { label: 'Courses', value: 45, color: '#2f5d50' },
  { label: 'Assignments', value: 32, color: '#e1a23c' },
  { label: 'Quizzes', value: 23, color: '#c56e5a' },
];

export default function Progress({ user }) {
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
    return <p>Loading progress…</p>;
  }

  if (status === 'error') {
    return <p>Could not load your progress. Is the backend server running?</p>;
  }

  const total = breakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <div>
      <h1>Your progress</h1>
      <p>A breakdown of how your learning time is split, and how each course is going.</p>

      <h3 style={{ marginTop: '30px' }}>Overall progress</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ width: 180, height: 180 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={breakdown}
                dataKey="value"
                nameKey="label"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {breakdown.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${Math.round((value / total) * 100)}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul>
          {breakdown.map((item) => (
            <li key={item.label}>
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  background: item.color,
                  marginRight: 8,
                  borderRadius: 3,
                }}
              />
              {item.label}: {Math.round((item.value / total) * 100)}%
            </li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: '30px' }}>Course completion</h3>
      {enrolledCourses.length === 0 ? (
        <p>Enrol in a course to start tracking progress.</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 500 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Course</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Completion</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((course) => (
              <tr key={course.enrolmentId}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{course.title}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{course.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}