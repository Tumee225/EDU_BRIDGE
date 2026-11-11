import React from 'react';
import { localize } from '../ui.jsx';

function PanelHeader({ title, subtitle, action = 'Бүгдийг харах', onAction }) {
  return <div className="panel-header"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="text-btn" type="button" onClick={onAction}>{action}</button></div>;
}

function StatCard({ stat }) {
  const iconClass = stat.label.includes('Цаг') || stat.label.includes('hours') || stat.label.includes('сурагч') || stat.label.includes('student') || stat.label.includes('хэрэглэгч') || stat.label.includes('users')
    ? 'blue'
    : stat.label.includes('дундаж') || stat.label.includes('оноо') || stat.label.includes('average') || stat.label.includes('score')
      ? 'purple'
      : stat.label.includes('Дуусгасан') || stat.label.includes('Даалгавар') || stat.label.includes('Батлагдсан') || stat.label.includes('Идэвхтэй') || stat.label.includes('completed') || stat.label.includes('assignment') || stat.label.includes('verified') || stat.label.includes('active')
        ? 'green'
        : 'orange';
  const icon = stat.label.includes('Цаг') || stat.label.includes('hours') ? '◷'
    : stat.label.includes('дундаж') || stat.label.includes('оноо') || stat.label.includes('average') || stat.label.includes('score') ? '▤'
      : stat.label.includes('Дуусгасан') || stat.label.includes('Даалгавар') || stat.label.includes('Батлагдсан') || stat.label.includes('Идэвхтэй') || stat.label.includes('completed') || stat.label.includes('assignment') || stat.label.includes('verified') || stat.label.includes('active') ? '✓' : '♧';
  return <article className="stat-card"><div className="stat-top"><span>{stat.label}</span><span className={`stat-icon ${iconClass}`} aria-hidden="true">{icon}</span></div><strong>{stat.value}<small>{stat.unit}</small></strong><div className={`stat-meta ${stat.tone === 'positive' ? 'positive' : ''}`}>{stat.meta}</div></article>;
}

function ProgressChart({ data, onAction, locale }) {
  const values = data.chart;
  const min = Math.min(...values) - 10;
  const max = Math.max(...values) + 10;
  const points = values.map((value, index) => [20 + index * 90, 170 - ((value - min) / (max - min || 1)) * 130]);
  const polyline = points.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `M 20 170 ${points.map(([x, y]) => `L ${x} ${y}`).join(' ')} L 620 170 L 20 170 Z`;
  return (
    <section className="panel">
      <PanelHeader title={data.title} subtitle={data.subtitle} onAction={onAction} />
      <div className="chart-card"><div className="y-axis" aria-hidden="true"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
        <div><div className="chart-area"><svg viewBox="0 0 640 190" preserveAspectRatio="none" role="img" aria-label={data.title}>
          <defs><linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" /><stop offset="100%" stopColor="#2563EB" stopOpacity="0" /></linearGradient></defs>
          <path d={area} fill="url(#lineFill)" opacity="0.9" /><polyline fill="none" stroke="#2563EB" strokeWidth="3" points={polyline} strokeLinecap="round" strokeLinejoin="round" />
          {points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />)}
        </svg></div><div className="x-axis">{data.labels.map((label) => <span key={label}>{localize(label, locale)}</span>)}</div></div>
      </div>
    </section>
  );
}

function TaskPanel({ data, taskStates, onTaskChange, onAction, locale }) {
  return <section className="panel"><PanelHeader title={data.title} subtitle={data.subtitle} onAction={onAction} /><div className="task-list">
    {data.items.map((item, index) => {
      const checked = taskStates[index] ?? item.state === 'done';
      return <label className="task-item" key={item.title}><input type="checkbox" checked={checked} onChange={(event) => onTaskChange(index, event.target.checked)} /><span className="task-copy"><strong>{item.title}</strong><small>{item.meta}</small></span><span className={`tag ${checked ? 'done' : 'pending'}`}>{checked ? (locale === 'en' ? 'Completed' : 'Дууссан') : (locale === 'en' ? 'Pending' : 'Хүлээгдэж буй')}</span></label>;
    })}
  </div></section>;
}

function CourseCard({ item, onContinue, locale }) {
  return <article className="course-card"><div className={`course-art ${item.color}`} aria-hidden="true">{item.icon}</div><div className="course-copy"><small>{item.type}</small><strong>{item.title}</strong><div className="course-bar"><span style={{ width: `${item.progress}%` }} /></div><div className="course-meta">{item.progress}% {locale === 'en' ? 'complete' : 'дууссан'}</div></div><button className="circle-btn" type="button" aria-label={locale === 'en' ? `Continue ${item.title}` : `${item.title} хичээлийг үргэлжлүүлэх`} onClick={onContinue}>→</button></article>;
}

export default function DashboardOverview({ role, taskStates, onTaskChange, onNavigate, onNotify, locale }) {
  const nextPage = role.nav[1]?.page ?? role.nav[0].page;
  const materialPage = role.nav.find((item) => item.page === 'materials' || item.page === 'resources')?.page ?? nextPage;
  return <>
    <div className="welcome-row"><div className="welcome-copy"><p className="eyebrow">{new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'mn-MN', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()).toUpperCase()}</p><h1>{role.welcome} <span aria-hidden="true">👋</span></h1><p className="subtext">{role.subtext}</p></div><button className="primary-btn" type="button" onClick={() => onNavigate(nextPage)}>＋ <span>{role.cta}</span></button></div>
    <div className="stats-grid">{role.stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div>
    <div className="panel-grid"><ProgressChart data={role.primary} onAction={() => onNavigate(nextPage)} locale={locale} /><TaskPanel data={role.secondary} taskStates={taskStates} onTaskChange={onTaskChange} onAction={() => onNavigate(nextPage)} locale={locale} /></div>
    <div className="resources-grid">
      <section className="panel"><PanelHeader title={locale === 'en' ? 'Continue learning' : 'Үргэлжлүүлэн суралцах'} subtitle={locale === 'en' ? 'Recently viewed' : 'Сүүлд үзсэн хичээлүүд'} action={locale === 'en' ? 'View all →' : 'Бүгдийг үзэх →'} onAction={() => onNavigate(materialPage)} /><div className="course-list">{role.resources.slice(0, 2).map((item) => <CourseCard key={item.title} item={item} locale={locale} onContinue={() => onNotify(locale === 'en' ? `Opening ${item.title}.` : `${item.title} хичээлийг нээж байна.`)} />)}</div></section>
      <section className="panel ai-box"><div className="ai-badge" aria-hidden="true">✦</div><div className="ai-info">{locale === 'en' ? 'AI ASSISTANT' : 'AI ТУСЛАХ'}</div><h3>{role.ai.title}</h3><p>{role.ai.text}</p><button className="primary-btn" type="button" onClick={() => onNavigate(role.nav.find((item) => item.page === 'ai')?.page ?? nextPage)}>{role.ai.button}</button></section>
    </div>
  </>;
}