import React, { useState } from 'react';
import AuthShell from './AuthShell.jsx';

export default function RegisterPage({ locale, onLocaleChange, onRegister, onLogin }) {
  const english = locale === 'en';
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (values.password !== values.confirmPassword) {
      setError(english ? 'Passwords do not match.' : 'Нууц үг таарахгүй байна.');
      return;
    }
    onRegister({ name: values.name, email: values.email, roleKey: values.role });
  }

  return (
    <AuthShell locale={locale} onLocaleChange={onLocaleChange} page="register">
      <p className="eyebrow">{english ? 'CREATE ACCOUNT' : 'БҮРТГҮҮЛЭХ'}</p>
      <h2>{english ? 'Join EDU BRIDGE' : 'EDU BRIDGE-д нэгдэх'}</h2>
      <p className="auth-subtitle">{english ? 'Create your learning account.' : 'Сургалтын бүртгэлээ үүсгэнэ үү.'}</p>
      <form className="form-stack login-form" onSubmit={submit}>
        <label>{english ? 'Full name' : 'Овог нэр'}<input name="name" autoComplete="name" required /></label>
        <label>{english ? 'Email address' : 'Имэйл хаяг'}<input name="email" type="email" autoComplete="email" required /></label>
        <label>{english ? 'Your role' : 'Таны үүрэг'}<select name="role" defaultValue="student"><option value="student">{english ? 'Student' : 'Сурагч'}</option><option value="teacher">{english ? 'Teacher' : 'Багш'}</option><option value="parent">{english ? 'Parent' : 'Эцэг эх'}</option></select></label>
        <label>{english ? 'Password' : 'Нууц үг'}<input name="password" type="password" autoComplete="new-password" minLength="8" required /></label>
        <label>{english ? 'Confirm password' : 'Нууц үг давтах'}<input name="confirmPassword" type="password" autoComplete="new-password" minLength="8" required /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-btn" type="submit">{english ? 'Create account' : 'Бүртгэл үүсгэх'} <span aria-hidden="true">→</span></button>
      </form>
      <div className="auth-links"><span>{english ? 'Already have an account?' : 'Бүртгэлтэй юу?'} <button className="text-btn" type="button" onClick={onLogin}>{english ? 'Sign in' : 'Нэвтрэх'}</button></span></div>
      <p className="demo-note">{english ? 'Demo account is stored only for this browser session.' : 'Туршилтын бүртгэл зөвхөн энэ browser session-д хадгалагдана.'}</p>
    </AuthShell>
  );
}