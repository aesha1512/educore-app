import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { courses, progress, status } = useApp();

  if (status === 'loading') {
    return <p>Loading dashboard…</p>;
  }

  const enrolledCourses = courses.filter((c) => c.enrolled);

  return (
    <div>
      <h1>Hello, Student 👋</h1>
      <p>Let's pick up where you left off.</p>

      <h3 style={{ marginTop: '30px' }}>Weekly study activity</h3>
      <p style={{ color: '#666', fontSize: '13px', marginBottom: '8px' }}>
        Hours studied each day this week, based on the chart below.
      </p>
      <div style={{ width: '100%', maxWidth: '500px', height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={progress.weeklyActivity}>
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
            <li key={course.id}>
              {course.title} — {course.progress}% complete
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ marginTop: '30px' }}>Upcoming deadlines</h3>
      <ul>
        {progress.reminders.map((r) => (
          <li key={r.id}>
            {r.title} — due {r.due}
          </li>
        ))}
      </ul>
    </div>
  );
}