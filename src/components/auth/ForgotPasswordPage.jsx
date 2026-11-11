import React, { useState } from 'react';
import AuthShell from './AuthShell.jsx';

export default function ForgotPasswordPage({ locale, onLocaleChange, onLogin }) {
  const english = locale === 'en';
  const [submitted, setSubmitted] = useState(false);

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AuthShell locale={locale} onLocaleChange={onLocaleChange} page="forgot">
      <p className="eyebrow">{english ? 'ACCOUNT RECOVERY' : 'НУУЦ ҮГ СЭРГЭЭХ'}</p>
      <h2>{english ? 'Reset your password' : 'Нууц үгээ сэргээх'}</h2>
      <p className="auth-subtitle">{english ? 'Enter your email and we will prepare a reset link.' : 'Имэйлээ оруулж сэргээх холбоос авна уу.'}</p>
      {submitted ? <div className="auth-success" role="status">{english ? 'If this address is registered, a reset link will be sent.' : 'Энэ имэйл бүртгэлтэй бол сэргээх холбоос илгээгдэнэ.'}</div> : <form className="form-stack login-form" onSubmit={submit}>
        <label>{english ? 'Email address' : 'Имэйл хаяг'}<input name="email" type="email" autoComplete="email" required /></label>
        <button className="primary-btn" type="submit">{english ? 'Send reset link' : 'Сэргээх холбоос авах'} <span aria-hidden="true">→</span></button>
      </form>}
      <div className="auth-links"><button className="text-btn" type="button" onClick={onLogin}>{english ? 'Back to sign in' : 'Нэвтрэх рүү буцах'}</button></div>
      <p className="demo-note">{english ? 'Demo only. No email will be sent.' : 'Туршилтын горим. Имэйл илгээхгүй.'}</p>
    </AuthShell>
  );
}