import { createContext, useContext, useEffect, useState } from 'react';
import coursesData from '../data/courses.json';
import progressData from '../data/progress.json';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [courses, setCourses] = useState([]);
   const [progress, setProgress] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready

  useEffect(() => {
    // Simulates an async API call — in a real app this would be a fetch()
    setTimeout(() => {
      setCourses(coursesData);
      setProgress(progressData);
      setStatus('ready');
    }, 500);
  }, []);

  function toggleEnroll(courseId) {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, enrolled: !course.enrolled } : course
      )
    );
  }

  return (
    <AppContext.Provider value={{ courses, progress, status, toggleEnroll }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}