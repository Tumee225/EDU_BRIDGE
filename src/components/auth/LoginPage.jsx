import React, { useState } from 'react';
import AuthShell from './AuthShell.jsx';

const roleOptions = [
  { value: 'student', mn: 'Сурагч', en: 'Student' },
  { value: 'teacher', mn: 'Багш', en: 'Teacher' },
  { value: 'parent', mn: 'Эцэг эх', en: 'Parent' },
  { value: 'admin', mn: 'Админ', en: 'Admin' }
];

export default function LoginPage({ locale, onLocaleChange, onLogin, onRegister, onForgotPassword }) {
  const english = locale === 'en';
  const [error, setError] = useState('');
  const [role, setRole] = useState('student');

  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email')).trim();
    const password = String(form.get('password'));
    if (!email || password.length < 8) {
      setError(english ? 'Enter a valid email and password (8+ characters).' : 'Имэйл болон 8-аас дээш тэмдэгттэй нууц үг оруулна уу.');
      return;
    }
    onLogin({ roleKey: String(form.get('role')), email });
  }

  return (
    <AuthShell locale={locale} onLocaleChange={onLocaleChange} page="login">
      <p className="eyebrow">{english ? 'SIGN IN' : 'НЭВТРЭХ'}</p>
      <h2>{english ? 'Welcome back' : 'Тавтай морил'}</h2>
      <p className="auth-subtitle">{english ? 'Sign in to continue to your workspace.' : 'Өөрийн сургалтын орчинд нэвтэрнэ үү.'}</p>
      <form className="form-stack login-form" onSubmit={submit}>
        <label>{english ? 'I am signing in as' : 'Нэвтрэх үүрэг'}
          <select name="role" value={role} onChange={(event) => setRole(event.target.value)}>
            {roleOptions.map((role) => <option key={role.value} value={role.value}>{english ? role.en : role.mn}</option>)}
          </select>
        </label>
        <label>{english ? 'Email address' : 'Имэйл хаяг'}<input name="email" type="email" autoComplete="username" placeholder="name@example.com" required /></label>
        <label>{english ? 'Password' : 'Нууц үг'}<input name="password" type="password" autoComplete="current-password" minLength="8" required /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-btn" type="submit">{english ? 'Sign in' : 'Нэвтрэх'} <span aria-hidden="true">→</span></button>
      </form>
      <div className="auth-links login-links">
        <button className="text-btn" type="button" onClick={onForgotPassword}>{english ? 'Forgot password?' : 'Нууц үгээ мартсан уу?'}</button>
        <span>{english ? 'New to EDU BRIDGE?' : 'EDU BRIDGE-д бүртгэлгүй юу?'} <button className="text-btn" type="button" onClick={onRegister}>{english ? 'Create account' : 'Бүртгүүлэх'}</button></span>
      </div>
      <p className="demo-note">{english ? 'Demo sign-in. Account credentials are not sent to a server.' : 'Туршилтын нэвтрэлт. Нэвтрэх мэдээлэл серверт илгээгдэхгүй.'}</p>
    </AuthShell>
  );
}