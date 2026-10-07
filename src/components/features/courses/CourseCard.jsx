import { Link } from 'react-router-dom';
import './CourseCard.css';

export default function CourseCard({ course, isEnrolled }) {
  return (
    <div className="course-card">
      <div className="course-card__top">
        <span className="course-card__category">{course.category}</span>
        {isEnrolled && <span className="course-card__badge">Enrolled</span>}
      </div>

      <h3>
        <Link to={`/courses/${course.id}`}>{course.title}</Link>
      </h3>
      <p>{course.description}</p>

      <div className="course-card__meta">
        {course.level} · {course.lessons} lessons · {course.duration}
      </div>
    </div>
  );
}