import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EnrolForm from '../components/features/courses/EnrolForm';

export default function CourseDetail() {
  const { id } = useParams();
  const { courses, status, toggleEnroll } = useApp();

  if (status === 'loading') {
    return <p>Loading…</p>;
  }

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div>
        <p>Course not found.</p>
        <Link to="/courses">Back to courses</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/courses">← Back to courses</Link>
      <h1>{course.title}</h1>
      <p>{course.instructor} · {course.level} · {course.lessons} lessons</p>
      <p>{course.description}</p>

      <hr style={{ margin: '20px 0' }} />

      {course.enrolled ? (
        <p>You're already enrolled in this course.</p>
      ) : (
        <EnrolForm course={course} onEnrol={toggleEnroll} />
      )}
    </div>
  );
}