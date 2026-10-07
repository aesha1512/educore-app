import './AuthLayout.css';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-shell">
      <aside className="auth-panel">
        <div className="auth-panel__mark">EduCore</div>

        <div className="auth-panel__message">
          <h1>Pick up a skill, one lesson at a time.</h1>
          <p>Track every course, every deadline, every win — in one place.</p>
        </div>

        <svg
          className="auth-panel__illustration"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="30" y="30" width="110" height="60" rx="14" fill="rgba(255,255,255,0.14)" />
          <path d="M50 90 L50 108 L72 90 Z" fill="rgba(255,255,255,0.14)" />
          <rect x="46" y="48" width="70" height="7" rx="3.5" fill="rgba(255,255,255,0.55)" />
          <rect x="46" y="62" width="50" height="7" rx="3.5" fill="rgba(255,255,255,0.4)" />

          <rect x="110" y="210" width="220" height="14" rx="4" fill="#1c2033" />
          <rect x="130" y="110" width="180" height="110" rx="10" fill="#1c2033" />
          <rect x="140" y="120" width="160" height="90" rx="4" fill="#F6F6F3" />

          <circle cx="220" cy="165" r="34" stroke="#E6E4DC" strokeWidth="10" />
          <circle
            cx="220"
            cy="165"
            r="34"
            stroke="#E1A23C"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="160 214"
            transform="rotate(-90 220 165)"
          />
          <path d="M212 152 L212 178 L236 165 Z" fill="#2F5D50" />

          <circle cx="345" cy="150" r="22" fill="#E1A23C" />
          <rect x="325" y="172" width="40" height="55" rx="18" fill="#E1A23C" />

          <rect x="300" y="60" width="86" height="34" rx="17" fill="#ffffff" />
          <circle cx="320" cy="77" r="9" fill="#2F5D50" />
          <path d="M316 77 L319 80 L325 73" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="335" y="72" width="40" height="8" rx="4" fill="#2F5D50" fillOpacity="0.7" />
        </svg>
      </aside>

      <main className="auth-form-area">
        <div className="auth-form-card">
          <h2>{title}</h2>
          {subtitle && <p className="auth-form-subtitle">{subtitle}</p>}
          {children}
        </div>
      </main>
    </div>
  );
}