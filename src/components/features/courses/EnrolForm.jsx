import { useState } from 'react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EnrolForm({ course, onEnrol }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!EMAIL_PATTERN.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading (default HTML form behaviour)

    const validationErrors = validate();
    setErrors(validationErrors);

    // Only proceed if there are no errors
    if (Object.keys(validationErrors).length === 0) {
      onEnrol(course.id);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return <p>You're enrolled! Check your dashboard to start learning.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enrol in this course</h3>

      <div>
        <label htmlFor="name">Full name</label>
        <br />
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <p style={{ color: 'red', fontSize: '13px' }}>{errors.name}</p>}
      </div>

      <div style={{ marginTop: '12px' }}>
        <label htmlFor="email">Email address</label>
        <br />
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <p style={{ color: 'red', fontSize: '13px' }}>{errors.email}</p>}
      </div>

      <button type="submit" style={{ marginTop: '14px' }}>
        Enrol now
      </button>
    </form>
  );
}