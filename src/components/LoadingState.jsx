import React from 'react';

export default function LoadingState({ locale }) {
  return (
    <div className="loading-state" role="status" aria-live="polite" aria-label={locale === 'en' ? 'Loading dashboard' : 'Самбар ачаалж байна'}>
      <div className="loading-heading"><span /><span /></div>
      <div className="loading-stats">{[1, 2, 3, 4].map((item) => <span key={item} />)}</div>
      <div className="loading-panels"><span /><span /></div>
    </div>
  );
}