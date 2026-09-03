import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import CourseCard from '../components/features/courses/CourseCard';

export default function Courses() {
  const { courses, status } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  // Build the list of category buttons from whatever categories exist in the data
  const categories = useMemo(() => {
    const unique = new Set(courses.map((c) => c.category));
    return ['All', ...unique];
  }, [courses]);

  // Filter the courses list based on both the search text and selected category
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
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}