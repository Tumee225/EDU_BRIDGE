import React, { useState } from 'react';
import { EmptyState } from '../ui.jsx';

export default function TutorPage({ locale, onNotify }) {
  const english = locale === 'en';
  const [messages, setMessages] = useState([]);

  function sendMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const question = new FormData(form).get('question').trim();
    if (!question) return;
    setMessages((current) => [...current, { question, answer: english ? 'This is a demo response. The AI service will be connected in a later phase.' : 'Энэ бол жишээ хариулт. AI үйлчилгээг дараагийн шатанд холбоно.' }]);
    form.reset();
    onNotify(english ? 'Demo answer added.' : 'Жишээ хариулт нэмэгдлээ.');
  }

  return <section className="panel tutor-panel"><div className="feature-heading"><div><p className="eyebrow">{english ? 'PERSONAL LEARNING' : 'ХУВИЙН СУРГАЛТ'}</p><h1>{english ? 'AI tutor' : 'AI хувийн багш'}</h1><p className="subtext">{english ? 'Ask a question and get a sample explanation.' : 'Асуултаа бичээд жишээ тайлбар аваарай.'}</p></div><div className="ai-badge" aria-hidden="true">✦</div></div>
    <div className="chat-history">{messages.length === 0 ? <EmptyState title={english ? 'Start with a question' : 'Асуултаа бичиж эхлээрэй'} text={english ? 'Your demo conversation will appear here.' : 'Туршилтын харилцан яриа энд харагдана.'} /> : messages.map((message, index) => <div className="chat-pair" key={`${message.question}-${index}`}><p className="chat-question">{message.question}</p><p className="chat-answer">{message.answer}</p></div>)}</div>
    <form className="chat-form" onSubmit={sendMessage}><input name="question" placeholder={english ? 'Ask about a lesson...' : 'Хичээлийн талаар асуугаарай...'} aria-label={english ? 'Your question' : 'Таны асуулт'} required /><button className="primary-btn" type="submit">{english ? 'Send' : 'Илгээх'} ↗</button></form>
    <p className="demo-note">{english ? 'Mock mode: no question is sent to an AI service.' : 'Туршилтын горим: асуултыг AI үйлчилгээ рүү илгээхгүй.'}</p>
  </section>;
}