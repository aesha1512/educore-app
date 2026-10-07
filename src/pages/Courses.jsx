import { useEffect, useMemo, useState } from 'react';
import CourseCard from '../components/features/courses/CourseCard';
import { authFetch, API_BASE } from '../utils/api';

export default function Courses({ user }) {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    async function loadData() {
      try {
        const [coursesRes, enrolmentsRes] = await Promise.all([
          fetch(`${API_BASE}/api/courses`),
          authFetch(`/api/enrolments/${user.id}`),
        ]);

        const coursesData = await coursesRes.json();
        const enrolmentsData = await enrolmentsRes.json();

        setCourses(coursesData);
        setEnrolledCourseIds(enrolmentsData.map((e) => e.courseId));
        setStatus('ready');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    }

    loadData();
  }, [user.id]);

  const categories = useMemo(() => {
    const unique = new Set(courses.map((c) => c.category));
    return ['All', ...unique];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = category === 'All' || course.category === category;
      const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [courses, query, category]);

  if (status === 'loading') {
    return <p>Loading courses…</p>;
  }

  if (status === 'error') {
    return <p>Could not load courses. Is the backend server running?</p>;
  }

  return (
    <div>
      <h1>Courses</h1>
      <p>Browse available courses here.</p>

      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '8px 12px', marginTop: '12px', marginBottom: '12px', width: '260px' }}
      />

      <div style={{ marginBottom: '16px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              marginRight: '8px',
              padding: '6px 14px',
              borderRadius: '100px',
              border: '1px solid #ccc',
              background: category === cat ? '#2f5d50' : '#fff',
              color: category === cat ? '#fff' : '#333',
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredCourses.length === 0 ? (
        <p>No courses match your search.</p>
      ) : (
        <div>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledCourseIds.includes(course.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}