import { useState } from 'react';
import { authFetch } from '../../../utils/api';

export default function EnrolForm({ course, userId, onEnrolled }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await authFetch('/api/enrolments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, courseId: course.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to enrol');
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      setSubmitting(false);
      onEnrolled();
    } catch (err) {
      setError('Could not connect to the server');
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <p>You're enrolled! Check your dashboard to start learning.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enrol in this course</h3>
      <p style={{ color: '#666', fontSize: '13px', marginBottom: '12px' }}>
        Click below to enrol — your account details are already on file.
      </p>

      {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Enrolling...' : 'Enrol now'}
      </button>
    </form>
  );
}