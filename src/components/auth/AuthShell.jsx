import React from 'react';

export default function AuthShell({ locale, onLocaleChange, children, page }) {
  const english = locale === 'en';
  return (
    <main className="auth-screen">
      <section className="auth-story">
        <a className="brand auth-brand" href="#" onClick={(event) => event.preventDefault()} aria-label="EDU BRIDGE">
          <span className="brand-mark">E</span>
          <span className="brand-text"><strong>EDU</strong><span>BRIDGE</span><small>LEARN • TEACH • GROW</small></span>
        </a>
        <div className="auth-story-copy">
          <span className="auth-kicker">{english ? 'YOUR LEARNING SPACE' : 'ТАНЫ СУРАЛЦАХ ОРЧИН'}</span>
          <h1>{english ? 'One place to learn, teach, and grow.' : 'Суралцах, заах, хөгжих нэгдсэн орчин.'}</h1>
          <p>{english ? 'A connected workspace for students, teachers, and families.' : 'Сурагч, багш, гэр бүлийнхэнд зориулсан нэгдсэн платформ.'}</p>
          <div className="auth-story-markers"><span /><span /><span /></div>
        </div>
        <div className="auth-story-footer">EDU BRIDGE <span>·</span> {english ? 'Education for everyone' : 'Боловсрол хүн бүрт'}</div>
      </section>
      <section className="auth-main">
        <div className="auth-toolbar">
          <span>{page === 'login' ? (english ? 'Welcome back' : 'Тавтай морил') : page === 'register' ? (english ? 'Join EDU BRIDGE' : 'EDU BRIDGE-д нэгдэх') : (english ? 'Account support' : 'Бүртгэлийн тусламж')}</span>
          <button type="button" className="lang-toggle" onClick={() => onLocaleChange(locale === 'mn' ? 'en' : 'mn')}>{locale === 'mn' ? 'MN' : 'EN'} ▾</button>
        </div>
        <div className="auth-form-wrap">{children}</div>
      </section>
    </main>
  );
}