import { Link } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import './CourseCard.css';

export default function CourseCard({ course }) {
  const { toggleEnroll } = useApp();

  return (
    <div className="course-card">
      <div className="course-card__top">
        <span className="course-card__category">{course.category}</span>
        {course.enrolled && <span className="course-card__badge">Enrolled</span>}
      </div>

      <h3>
        <Link to={`/courses/${course.id}`}>{course.title}</Link>
      </h3>
      <p>{course.description}</p>

      <div className="course-card__meta">
        {course.level} · {course.lessons} lessons · {course.duration}
      </div>

      <button onClick={() => toggleEnroll(course.id)}>
        {course.enrolled ? 'Unenrol' : 'Enrol'}
      </button>
    </div>
  );
}