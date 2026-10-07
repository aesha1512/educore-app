import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EnrolForm from '../components/features/courses/EnrolForm';
import { authFetch, API_BASE } from '../utils/api';

export default function CourseDetail({ user }) {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function loadData() {
      try {
        const [courseRes, enrolmentsRes] = await Promise.all([
          fetch(`${API_BASE}/api/courses/${id}`),
          authFetch(`/api/enrolments/${user.id}`),
        ]);

        if (!courseRes.ok) {
          setStatus('not-found');
          return;
        }

        const courseData = await courseRes.json();
        const enrolmentsData = await enrolmentsRes.json();

        setCourse(courseData);
        setIsEnrolled(enrolmentsData.some((e) => e.courseId === courseData.id));
        setStatus('ready');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    }

    loadData();
  }, [id, user.id]);

  if (status === 'loading') {
    return <p>Loading…</p>;
  }

  if (status === 'not-found') {
    return (
      <div>
        <p>Course not found.</p>
        <Link to="/courses">Back to courses</Link>
      </div>
    );
  }

  if (status === 'error') {
    return <p>Could not load this course. Is the backend server running?</p>;
  }

  return (
    <div>
      <Link to="/courses">← Back to courses</Link>
      <h1>{course.title}</h1>
      <p>{course.instructor} · {course.level} · {course.lessons} lessons</p>
      <p>{course.description}</p>

      <hr style={{ margin: '20px 0' }} />

      {isEnrolled ? (
        <p>You're already enrolled in this course.</p>
      ) : (
        <EnrolForm
          course={course}
          userId={user.id}
          onEnrolled={() => setIsEnrolled(true)}
        />
      )}
    </div>
  );
}