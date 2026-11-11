import React, { useEffect, useState } from 'react';
import { roleMap } from './dashboardData.js';
import {
  AppErrorBoundary,
  AuthDialog,
  Dialog,
  EmptyState,
  LoadingState,
  NotificationsPanel,
  ProfileDialog,
  ProfileMenu,
  SearchDialog,
  SettingsDialog,
  localize
} from './ui.jsx';

const roleOptions = [
  { key: 'student', label: 'Сурагч' },
  { key: 'teacher', label: 'Багш' },
  { key: 'parent', label: 'Эцэг эх' },
  { key: 'admin', label: 'Админ' }
];

function PanelHeader({ title, subtitle, action = 'Бүгдийг харах', onAction }) {
  return (
    <div className="panel-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <button className="text-btn" type="button" onClick={onAction}>{action}</button>
    </div>
  );
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

  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{stat.label}</span>
        <span className={`stat-icon ${iconClass}`} aria-hidden="true">{icon}</span>
      </div>
      <strong>{stat.value}<small>{stat.unit}</small></strong>
      <div className={`stat-meta ${stat.tone === 'positive' ? 'positive' : ''}`}>{stat.meta}</div>
    </article>
  );
}

function ProgressChart({ data, onAction, locale }) {
  const values = data.chart;
  const min = Math.min(...values) - 10;
  const max = Math.max(...values) + 10;
  const points = values.map((value, index) => {
    const x = 20 + index * 90;
    const y = 170 - ((value - min) / (max - min || 1)) * 130;
    return [x, y];
  });
  const polyline = points.map(([x, y]) => `${x},${y}`).join(' ');
  const area = `M 20 170 ${points.map(([x, y]) => `L ${x} ${y}`).join(' ')} L 620 170 L 20 170 Z`;

  return (
    <section className="panel">
      <PanelHeader title={data.title} subtitle={data.subtitle} onAction={onAction} />
      <div className="chart-card">
        <div className="y-axis" aria-hidden="true">
          <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
        </div>
          <div>
          <div className="chart-area">
            <svg viewBox="0 0 640 190" preserveAspectRatio="none" role="img" aria-label={data.title}>
              <defs>
                <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#lineFill)" opacity="0.9" />
              <polyline fill="none" stroke="#2563EB" strokeWidth="3" points={polyline} strokeLinecap="round" strokeLinejoin="round" />
              {points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />)}
            </svg>
          </div>
            <div className="x-axis">{data.labels.map((label) => <span key={label}>{localize(label, locale)}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

function TaskPanel({ data, taskStates, onTaskChange, onAction, locale }) {
  return (
    <section className="panel">
      <PanelHeader title={data.title} subtitle={data.subtitle} onAction={onAction} />
      <div className="task-list">
        {data.items.map((item, index) => {
          const checked = taskStates[index] ?? item.state === 'done';
          return (
            <label className="task-item" key={item.title}>
              <input type="checkbox" checked={checked} onChange={(event) => onTaskChange(index, event.target.checked)} />
              <span className="task-copy">
                <strong>{item.title}</strong>
                <small>{item.meta}</small>
              </span>
              <span className={`tag ${checked ? 'done' : 'pending'}`}>{checked ? (locale === 'en' ? 'Completed' : 'Дууссан') : (locale === 'en' ? 'Pending' : 'Хүлээгдэж буй')}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

function CourseCard({ item, onContinue, locale }) {
  return (
    <article className="course-card">
      <div className={`course-art ${item.color}`} aria-hidden="true">{item.icon}</div>
      <div className="course-copy">
        <small>{item.type}</small>
        <strong>{item.title}</strong>
        <div className="course-bar"><span style={{ width: `${item.progress}%` }} /></div>
        <div className="course-meta">{item.progress}% {locale === 'en' ? 'complete' : 'дууссан'}</div>
      </div>
      <button className="circle-btn" type="button" aria-label={locale === 'en' ? `Continue ${item.title}` : `${item.title} хичээлийг үргэлжлүүлэх`} onClick={onContinue}>→</button>
    </article>
  );
}

function Sidebar({ roleKey, role, activePage, isOpen, onRoleChange, onPageChange, onNotify, onClose, locale }) {
  return (
    <>
      {isOpen && <button className="sidebar-backdrop" type="button" aria-label={locale === 'en' ? 'Close menu' : 'Цэс хаах'} onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
        <div className="sidebar-inner">
          <a className="brand" href="#" aria-label="EDU BRIDGE Home" onClick={(event) => event.preventDefault()}>
            <span className="brand-mark">E</span>
            <span className="brand-text"><strong>EDU</strong><span>BRIDGE</span><small>LEARN • TEACH • GROW</small></span>
          </a>

          <div className="role-switch" aria-label={locale === 'en' ? 'User roles' : 'Хэрэглэгчийн үүрэг'}>
            {roleOptions.map((option) => (
              <button className={`role-btn ${roleKey === option.key ? 'active' : ''}`} data-role={option.key} key={option.key} type="button" onClick={() => onRoleChange(option.key)}>
                {localize(option.label, locale)}
              </button>
            ))}
          </div>

          <div className="menu-label">{locale === 'en' ? 'MAIN MENU' : 'ҮНДСЭН ЦЭС'}</div>
          <nav className="nav" aria-label={locale === 'en' ? 'Sidebar navigation' : 'Үндсэн цэс'}>
            {role.nav.map((item) => (
              <button className={`nav-item ${activePage === item.page ? 'active' : ''}`} data-page={item.page} key={item.page} type="button" onClick={() => onPageChange(item.page)}>
                <span className="nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="help-card">
              <div className="help-icon">?</div>
              <strong>{locale === 'en' ? 'Need help?' : 'Тусламж хэрэгтэй юу?'}</strong>
              <p>{locale === 'en' ? 'Find platform guides and updates here.' : 'Систем ашиглах заавар, аргачлал, шинэчлэлтийг эндээс үзнэ үү.'}</p>
              <button type="button" className="ghost-btn" onClick={() => onNotify(locale === 'en' ? 'Help guide is opening.' : 'Тусламжийн заавар нээгдэж байна.')}>{locale === 'en' ? 'View guide →' : 'Заавар үзэх →'}</button>
            </div>
            <button className="nav-item settings-item" data-page="settings" type="button" onClick={() => onPageChange('settings')}>
              <span className="nav-icon">⚙</span><span>{locale === 'en' ? 'Settings' : 'Тохиргоо'}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function OverviewPage({ role, taskStates, onTaskChange, onNavigate, onNotify, locale }) {
  const nextPage = role.nav[1]?.page ?? role.nav[0].page;
  const materialPage = role.nav.find((item) => item.page === 'materials' || item.page === 'resources')?.page ?? nextPage;

  return (
    <>
      <div className="welcome-row">
        <div className="welcome-copy">
          <p className="eyebrow">{new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'mn-MN', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()).toUpperCase()}</p>
          <h1>{role.welcome} <span aria-hidden="true">👋</span></h1>
          <p className="subtext">{role.subtext}</p>
        </div>
        <button className="primary-btn" type="button" onClick={() => onNavigate(nextPage)}>＋ <span>{role.cta}</span></button>
      </div>

      <div className="stats-grid">{role.stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</div>

      <div className="panel-grid">
        <ProgressChart data={role.primary} onAction={() => onNavigate(nextPage)} locale={locale} />
        <TaskPanel data={role.secondary} taskStates={taskStates} onTaskChange={onTaskChange} onAction={() => onNavigate(nextPage)} locale={locale} />
      </div>

      <div className="resources-grid">
        <section className="panel">
          <PanelHeader title={locale === 'en' ? 'Continue learning' : 'Үргэлжлүүлэн суралцах'} subtitle={locale === 'en' ? 'Recently viewed' : 'Сүүлд үзсэн хичээлүүд'} action={locale === 'en' ? 'View all →' : 'Бүгдийг үзэх →'} onAction={() => onNavigate(materialPage)} />
          <div className="course-list">
            {role.resources.slice(0, 2).map((item) => <CourseCard key={item.title} item={item} locale={locale} onContinue={() => onNotify(locale === 'en' ? `Opening ${item.title}.` : `${item.title} хичээлийг нээж байна.`)} />)}
          </div>
        </section>
        <section className="panel ai-box">
          <div className="ai-badge" aria-hidden="true">✦</div>
          <div className="ai-info">{locale === 'en' ? 'AI ASSISTANT' : 'AI ТУСЛАХ'}</div>
          <h3>{role.ai.title}</h3>
          <p>{role.ai.text}</p>
          <button className="primary-btn" type="button" onClick={() => onNavigate(role.nav.find((item) => item.page === 'ai')?.page ?? nextPage)}>{role.ai.button}</button>
        </section>
      </div>
    </>
  );
}

function TutorPage({ locale, onNotify }) {
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

  return (
    <section className="panel tutor-panel">
      <div className="feature-heading"><div><p className="eyebrow">{english ? 'PERSONAL LEARNING' : 'ХУВИЙН СУРГАЛТ'}</p><h1>{english ? 'AI tutor' : 'AI хувийн багш'}</h1><p className="subtext">{english ? 'Ask a question and get a sample explanation.' : 'Асуултаа бичээд жишээ тайлбар аваарай.'}</p></div><div className="ai-badge" aria-hidden="true">✦</div></div>
      <div className="chat-history">
        {messages.length === 0 ? <EmptyState title={english ? 'Start with a question' : 'Асуултаа бичиж эхлээрэй'} text={english ? 'Your demo conversation will appear here.' : 'Туршилтын харилцан яриа энд харагдана.'} /> : messages.map((message, index) => <div className="chat-pair" key={`${message.question}-${index}`}><p className="chat-question">{message.question}</p><p className="chat-answer">{message.answer}</p></div>)}
      </div>
      <form className="chat-form" onSubmit={sendMessage}><input name="question" placeholder={english ? 'Ask about a lesson...' : 'Хичээлийн талаар асуугаарай...'} aria-label={english ? 'Your question' : 'Таны асуулт'} required /><button className="primary-btn" type="submit">{english ? 'Send' : 'Илгээх'} ↗</button></form>
      <p className="demo-note">{english ? 'Mock mode: no question is sent to an AI service.' : 'Туршилтын горим: асуултыг AI үйлчилгээ рүү илгээхгүй.'}</p>
    </section>
  );
}

function FeaturePage({ role, page, locale, extraItems, onCreate, onOpenItem, onNotify }) {
  const [query, setQuery] = useState('');
  const english = locale === 'en';
  const pageInfo = role.nav.find((item) => item.page === page);
  const title = pageInfo?.label ?? (english ? 'Settings' : 'Тохиргоо');
  const items = [...role.resources, ...extraItems].filter((item) => `${item.title} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="feature-page">
      <div className="feature-heading">
        <div><p className="eyebrow">{english ? 'EDU BRIDGE WORKSPACE' : 'EDU BRIDGE АЖЛЫН ОРЧИН'}</p><h1>{title}</h1><p className="subtext">{english ? `Manage ${title.toLowerCase()} and keep your learning work organized.` : `${title} хэсгийн мэдээлэл, ажлуудыг нэг дороос удирдаарай.`}</p></div>
        <button className="primary-btn" type="button" onClick={onCreate}>＋ <span>{english ? 'Add item' : 'Нэмэх'}</span></button>
      </div>
      <section className="panel feature-panel">
        <div className="feature-toolbar"><strong>{english ? `${items.length} items` : `${items.length} мэдээлэл`}</strong><label className="inline-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={english ? 'Filter this section' : 'Энэ хэсгээс хайх'} /></label></div>
        {items.length === 0 ? <EmptyState title={english ? 'Nothing here yet' : 'Одоогоор мэдээлэл алга'} text={english ? 'Add a new item or change your search.' : 'Шинэ мэдээлэл нэмэх эсвэл хайлтаа өөрчилнө үү.'} action={english ? 'Add item' : 'Мэдээлэл нэмэх'} onAction={onCreate} /> : <div className="feature-list">{items.map((item, index) => <article className="feature-row" key={`${item.title}-${index}`}><span className={`course-art ${item.color}`} aria-hidden="true">{item.icon}</span><div className="feature-row-copy"><small>{item.type}</small><strong>{item.title}</strong><div className="course-bar"><span style={{ width: `${item.progress}%` }} /></div></div><span className="feature-progress">{item.progress}%</span><button className="text-btn" type="button" onClick={() => onOpenItem(item)}>{english ? 'Details' : 'Дэлгэрэнгүй'}</button></article>)}</div>}
      </section>
      <button className="text-btn reset-demo" type="button" onClick={() => onNotify(english ? 'Your demo data is unchanged.' : 'Жишээ өгөгдөл хэвээр байна.')}>{english ? 'Refresh demo data' : 'Жишээ өгөгдөл шинэчлэх'}</button>
    </div>
  );
}

function CreateItemDialog({ locale, onClose, onSave }) {
  const english = locale === 'en';
  return (
    <Dialog title={english ? 'Add a new item' : 'Шинэ мэдээлэл нэмэх'} onClose={onClose}>
      <form className="form-stack" onSubmit={(event) => { event.preventDefault(); onSave(Object.fromEntries(new FormData(event.currentTarget))); }}>
        <label>{english ? 'Title' : 'Нэр'}<input name="title" required maxLength="80" /></label>
        <label>{english ? 'Category' : 'Төрөл'}<select name="type"><option>{english ? 'Learning material' : 'Сургалтын материал'}</option><option>{english ? 'Lesson' : 'Хичээл'}</option><option>{english ? 'Assessment' : 'Шалгалт'}</option></select></label>
        <button className="primary-btn" type="submit">{english ? 'Save demo item' : 'Жишээ мэдээлэл хадгалах'}</button>
      </form>
      <p className="demo-note">{english ? 'This item is stored in memory only.' : 'Энэ мэдээлэл зөвхөн түр хугацаанд хадгалагдана.'}</p>
    </Dialog>
  );
}

function ItemDialog({ item, locale, onClose }) {
  const english = locale === 'en';
  return <Dialog title={item.title} onClose={onClose}><div className="item-detail"><span>{item.type}</span><div className="course-bar"><span style={{ width: `${item.progress}%` }} /></div><strong>{item.progress}% {english ? 'complete' : 'дууссан'}</strong><p>{english ? 'Demo content. Details will come from the connected platform API in a later phase.' : 'Жишээ агуулга. Дэлгэрэнгүй мэдээллийг дараагийн шатанд API-аас авна.'}</p></div></Dialog>;
}

export default function App() {
  const [roleKey, setRoleKey] = useState('student');
  const [activePage, setActivePage] = useState('overview');
  const [taskStates, setTaskStates] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [locale, setLocale] = useState(() => localStorage.getItem('edu-locale') ?? 'mn');
  const [theme, setTheme] = useState(() => localStorage.getItem('edu-theme') ?? 'light');
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dialog, setDialog] = useState('');
  const [authenticated, setAuthenticated] = useState(true);
  const [user, setUser] = useState({ name: roleMap.student.name, email: 'tumen@edubridge.mn', avatarUrl: '' });
  const [extraItems, setExtraItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [readNotificationIds, setReadNotificationIds] = useState(() => {
    try {
      const stored = localStorage.getItem('edu-read-notifications');
      if (stored === null) return ['progress'];
      const saved = JSON.parse(stored);
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const role = localize(roleMap[roleKey], locale);
  const activeLabel = role.nav.find((item) => item.page === activePage)?.label ?? (locale === 'en' ? 'Settings' : 'Тохиргоо');
  const english = locale === 'en';

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('edu-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('edu-locale', locale);
  }, [locale]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function notify(message) {
    setToast(message);
  }

  function selectRole(nextRole) {
    setRoleKey(nextRole);
    setActivePage('overview');
    setTaskStates({});
    setExtraItems([]);
    setUser({ name: roleMap[nextRole].name, email: `${nextRole}@edubridge.mn`, avatarUrl: '' });
    setSidebarOpen(false);
    notify(english ? `${localize(roleMap[nextRole].role, locale)} dashboard opened.` : `${roleMap[nextRole].role} dashboard нээгдлээ.`);
  }

  function selectPage(page) {
    setSidebarOpen(false);
    setProfileOpen(false);
    if (page === 'settings') {
      setDialog('settings');
      return;
    }
    setActivePage(page);
    const item = role.nav.find((navItem) => navItem.page === page);
    if (item) notify(english ? `${item.label} opened.` : `${item.label} хэсэг нээгдлээ.`);
  }

  function updateTask(index, checked) {
    setTaskStates((current) => ({ ...current, [index]: checked }));
  }

  function completeAuthentication(result) {
    if (result.message) {
      setDialog('');
      notify(result.message);
      return;
    }
    setUser((current) => ({ name: result.name || current.name, email: result.email || current.email }));
    setAuthenticated(true);
    setDialog('');
    notify(english ? 'Demo account signed in.' : 'Туршилтын бүртгэлээр нэвтэрлээ.');
  }

  function saveProfile(values) {
    setUser((current) => ({ ...current, name: values.name, email: values.email, avatarUrl: values.avatarUrl }));
    setDialog('');
    notify(english ? 'Profile updated in this browser.' : 'Профайлыг энэ browser-т шинэчиллээ.');
  }

  function saveItem(values) {
    setExtraItems((current) => [...current, { ...values, progress: 0, color: 'blue', icon: '▧' }]);
    setDialog('');
    notify(english ? 'Demo item added.' : 'Жишээ мэдээлэл нэмлээ.');
  }

  function updateReadNotifications(ids) {
    setReadNotificationIds(ids);
    localStorage.setItem('edu-read-notifications', JSON.stringify(ids));
  }

  return (
    <AppErrorBoundary locale={locale}>
      <div className="app-shell" data-theme={theme}>
        <Sidebar
          roleKey={roleKey}
          role={role}
          activePage={activePage}
          isOpen={sidebarOpen}
          locale={locale}
          onRoleChange={selectRole}
          onPageChange={selectPage}
          onNotify={notify}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="main-panel">
          <header className="topbar">
            <button className="mobile-menu" type="button" aria-label={english ? 'Open menu' : 'Цэс нээх'} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen((open) => !open)}>☰</button>
            <div className="breadcrumb">{english ? 'Home' : 'Нүүр хуудас'} <span>/</span> <strong>{activeLabel}</strong></div>
            <div className="top-actions">
              <button className="icon-btn" type="button" aria-label={english ? 'Search' : 'Хайх'} title={english ? 'Search' : 'Хайх'} onClick={() => { setSearchOpen(true); setNotificationsOpen(false); setProfileOpen(false); }}>⌕</button>
              <button className="icon-btn notification" type="button" aria-label={english ? 'Notifications' : 'Мэдэгдэл'} title={english ? 'Notifications' : 'Мэдэгдэл'} aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen((open) => !open); setProfileOpen(false); }}>
                ♧{readNotificationIds.length < 3 && <span className="dot" />}
              </button>
              <button className="icon-btn theme-toggle" type="button" aria-label={english ? 'Toggle theme' : 'Загвар солих'} title={english ? 'Toggle theme' : 'Загвар солих'} onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}>{theme === 'light' ? '☾' : '☀'}</button>
              <button className="lang-toggle" type="button" aria-label={english ? 'Switch language' : 'Хэл солих'} onClick={() => setLocale((current) => current === 'mn' ? 'en' : 'mn')}>{locale === 'mn' ? 'MN' : 'EN'} ▾</button>
              {authenticated ? <button className="profile-box profile-trigger" type="button" aria-expanded={profileOpen} onClick={() => { setProfileOpen((open) => !open); setNotificationsOpen(false); }}>
                <span className="avatar">{user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : user.name.charAt(0)}</span><span className="profile-copy"><strong>{user.name}</strong><small>{role.role}</small></span><span className="caret">▾</span>
              </button> : <button className="profile-box login-trigger" type="button" onClick={() => setDialog('auth')}>{english ? 'Sign in' : 'Нэвтрэх'}</button>}
            </div>
            {notificationsOpen && <NotificationsPanel locale={locale} onClose={() => setNotificationsOpen(false)} onNotify={notify} readIds={readNotificationIds} onRead={updateReadNotifications} />}
            {profileOpen && <ProfileMenu locale={locale} user={{ ...user, role: role.role }} onClose={() => setProfileOpen(false)} onProfile={() => { setProfileOpen(false); setDialog('profile'); }} onSettings={() => { setProfileOpen(false); setDialog('settings'); }} onSignOut={() => { setProfileOpen(false); setAuthenticated(false); setDialog('auth'); }} />}
          </header>

          <section className="content">
            {loading ? <LoadingState locale={locale} /> : activePage === 'overview' ? <OverviewPage role={role} taskStates={taskStates} onTaskChange={updateTask} onNavigate={selectPage} onNotify={notify} locale={locale} /> : activePage === 'ai' ? <TutorPage locale={locale} onNotify={notify} /> : <FeaturePage key={`${roleKey}-${activePage}`} role={role} page={activePage} locale={locale} extraItems={extraItems} onCreate={() => setDialog('create')} onOpenItem={setSelectedItem} onNotify={notify} />}
          </section>
        </main>

        <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
        {searchOpen && <SearchDialog locale={locale} onClose={() => setSearchOpen(false)} onSelect={(item) => { setSearchOpen(false); setSelectedItem(item); }} />}
        {dialog === 'auth' && <AuthDialog locale={locale} onClose={() => setDialog('')} onSuccess={completeAuthentication} />}
        {dialog === 'profile' && <ProfileDialog locale={locale} user={{ ...user, role: role.role }} onClose={() => setDialog('')} onSave={saveProfile} />}
        {dialog === 'settings' && <SettingsDialog locale={locale} theme={theme} onClose={() => setDialog('')} onLocaleChange={setLocale} onThemeChange={setTheme} />}
        {dialog === 'create' && <CreateItemDialog locale={locale} onClose={() => setDialog('')} onSave={saveItem} />}
        {selectedItem && <ItemDialog item={selectedItem} locale={locale} onClose={() => setSelectedItem(null)} />}
      </div>
    </AppErrorBoundary>
  );
}