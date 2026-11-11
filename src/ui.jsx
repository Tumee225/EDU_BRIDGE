import React, { Component, useEffect, useState } from 'react';
import { roleMap } from './dashboardData.js';

const englishCopy = {
  'Сурагч': 'Student', 'Багш': 'Teacher', 'Эцэг эх': 'Parent', 'Админ': 'Admin',
  'Ерөнхий самбар': 'Overview', 'AI хувийн багш': 'AI tutor', 'Мэргэжил сонголт': 'Career guidance',
  'ЕЕШ бэлтгэл': 'Exam preparation', 'Материалын сан': 'Learning materials', 'Сурлагын ахиц': 'Learning progress',
  'Миний ангиуд': 'My classes', 'Сурагчид': 'Students', 'Тест үүсгэх': 'Create a quiz', 'Шалгалт засах': 'Grade exams',
  'Хүүхдийн ахиц': 'Child progress', 'Ирц': 'Attendance', 'Дүн': 'Grades', 'Даалгавар': 'Assignments', 'Мэдэгдэл': 'Announcements',
  'Хэрэглэгчид': 'Users', 'Багшид': 'Teachers', 'Сургууль': 'Schools', 'Агуулга': 'Content', 'Тайлан': 'Reports',
  'Тохиргоо': 'Settings', 'Тусламж хэрэгтэй юу?': 'Need help?',
  'Сайн байна уу, Түмэн-Очир!': 'Welcome, Tumen-Ochir!', 'Сайн байна уу, Бат-Эрдэнэ!': 'Welcome, Bat-Erdene!',
  'Сайн байна уу, Дэлгэрмаа!': 'Welcome, Delgermaa!', 'Сайн байна уу, Наранзаяа!': 'Welcome, Naranzaya!',
  'Өнөөдөр өөртөө шинэ зүйл сургах сайхан өдөр.': 'Today is a great day to learn something new.',
  'Өнөөдрийн хичээл, ангийнхаа ахицыг эндээс удирдаарай.': 'Manage today’s lessons and class progress from here.',
  'Хүүхдийн сургалт, ирц, даалгаврын байдалд хяналт тавьж байна.': 'Keep track of your child’s learning, attendance, and assignments.',
  'Платформын үйл ажиллагаа, хэрэглэгч, агуулга, тайланг нэг дороос удирдах боломжтой.': 'Manage platform activity, users, content, and reports in one place.',
  'Суралцаж эхлэх': 'Start learning', 'Шалгалт үүсгэх': 'Create an exam', 'Байдал харах': 'View progress', 'Систем үнэлэх': 'Review system',
  'Суралцсан цаг': 'Study hours', 'Тестийн дундаж': 'Quiz average', 'Дуусгасан хичээл': 'Lessons completed', 'Суралцсан өдөр': 'Study days',
  'Нийт сурагч': 'Total students', 'Шалгалтын дундаж': 'Exam average', 'Үүсгэсэн тест': 'Quizzes created', 'Шалгах хариулт': 'Answers to review',
  'Нийт оноо': 'Overall score', 'Хичээл': 'Lessons', 'Нийт хэрэглэгч': 'Total users',
  'Анги': 'Class',
  'Идэвхтэй сурагч': 'Active students', 'Батлагдсан багш': 'Verified teachers', 'Дэвшилтэт агуулга': 'Published content',
  'цаг': 'hrs', 'сурагч': 'students', 'тест': 'quizzes', 'хариулт': 'answers', 'өдөр': 'days', 'даалгавар': 'assignments',
  'хичээл': 'lessons', 'хэрэглэгч': 'users', 'багш': 'teachers', 'материал': 'items', '/100': '/100', '%': '%',
  '↗ Өнгөрсөн долоо хоногоос 12%': '↗ 12% from last week', '↗ 5 оноогоор өссөн': '↗ Up 5 points', 'Энэ сарын үзүүлэлт': 'This month',
  '↗ 3 өдөр дараалан': '↗ 3-day streak', '↗ 14 сурагч нэмэгдлээ': '↗ 14 students added', '↗ 3 оноогоор өссөн': '↗ Up 3 points',
  'Энэ сарын статистик': 'This month', '↗ 5 хариулт шинэчлэгдсэн': '↗ 5 updated', '↗ 8 оноогоор өссөн': '↗ Up 8 points',
  'Энэ сар 2 удаа тасалсан': '2 absences this month', '8 нь дууссан': '8 completed', 'Өнгөрсөн 2 долоо хоногт': 'Past 2 weeks',
  '↗ 9.2% өсөлт': '↗ 9.2% growth', 'Энэ сарын тайлан': 'Monthly report', '↗ 18 шинэ багш': '↗ 18 new teachers', 'тайлагнасан': 'reported',
  'Суралцах ахиц': 'Learning progress', 'Сүүлийн 7 хоногийн үзүүлэлт': 'Last 7 days', 'Ангиудын ахиц': 'Class progress',
  'Да': 'Mon', 'Мя': 'Tue', 'Лх': 'Wed', 'Пү': 'Thu', 'Ба': 'Fri', 'Бя': 'Sat', 'Ня': 'Sun',
  'Сүүлийн 6 сарын үзүүлэлт': 'Last 6 months', 'Суралцах үзүүлэлт': 'Learning metrics',
  'Системийн ахиц': 'System activity', 'Гарын авлагын болон SEO тайлан': 'Platform operations and quality report',
  'Өнөөдрийн төлөвлөгөө': 'Today’s plan', 'Өдөр бүр бага багаар урагшилъя': 'Make progress every day',
  'Өнөөдрийн ажлууд': 'Today’s tasks', 'Багшийн ажлын жагсаалт': 'Teacher task list', 'Байгуулсан мэдээлэл': 'Progress summary',
  'Хүүхдийн энэ сарын тайлан': 'Your child’s monthly report', 'Шинэ ажлууд': 'New tasks', 'Тохиргоо, хяналт, баталгаажуулалт': 'Settings, review, and approvals',
  'Биологи — Эсийн бүтэц': 'Biology — Cell structure', '25 минут · Хичээл үзэх': '25 min · Watch lesson',
  'Математик — Функц': 'Math — Functions', '30 минут · Дасгал ажил': '30 min · Practice', 'Англи хэл — Үгийн сан': 'English — Vocabulary',
  '15 минут · Давтлага': '15 min · Review', '10А анги — Биологийн шалгалт': 'Class 10A — Biology exam',
  '09:00 · Хариулах': '09:00 · Review', '11Б анги — Дүн баталгаажуулах': 'Class 11B — Confirm grades',
  '12:30 · Удирдах': '12:30 · Manage', 'Хичээлийн төлөвлөгөө боловсруулах': 'Prepare lesson plan', '15:00 · Бэлтгэл': '15:00 · Preparation',
  'Математик — Дүн 95': 'Math — Score 95', 'Томоор бүрэн боловсруулсан': 'Fully reviewed', 'Англи — Давтлага 4/5': 'English — Review 4/5',
  'Эцэг эхийн хяналт шаардлагатай': 'Parent follow-up needed', 'Биологи — Шалгалт 88': 'Biology — Exam 88', 'Сайн үр дүн': 'Good result',
  'Багшийн баталгаажуулалт': 'Teacher verification', '26 хүсэлт хүлээгдэж байна': '26 requests pending',
  'Сургалтын материалын хяналт': 'Learning content review', '18 шинэ материал шалгагдаж байна': '18 new items to review',
  'Системийн аюулгүй байдал': 'System security', 'Ажиллагаа хэвийн байна': 'All systems operational',
  'Биологи': 'Biology', 'Математик': 'Math', 'Хими': 'Chemistry', 'Англи': 'English', 'Түүх': 'History',
  'Эсийн бүтэц ба үүрэг': 'Cell structure and function', 'Функц ба график': 'Functions and graphs',
  'Органик нэгдлүүд': 'Organic compounds', 'Органик бодисийн сорил': 'Organic chemistry quiz',
  'Генетикийн тайлбар': 'Genetics explained', 'Линейр функц': 'Linear functions', 'Vocabulary booster': 'Vocabulary booster',
  'IELTS vocab pack': 'IELTS vocabulary pack', 'Vocabulary practice': 'Vocabulary practice', 'Экосистем': 'Ecosystems',
  'Нийгмийнүеийн сонголт': 'Social studies review', 'Ерөнхий хэрэглэгчийн тайлан': 'User activity report', 'Багшийн үнэлгээ': 'Teacher evaluation',
  'Сургуулиудын статистик': 'School statistics',
  'Ойлгохгүй зүйл байна уу?': 'Need help understanding?', 'AI хувийн багшаасаа асуугаарай. Чиний түвшинд тохируулж тайлбарлана.': 'Ask your AI tutor for an explanation tailored to your level.',
  'Шалгалт зохиох уу?': 'Create an exam?', 'Хичээлийн сэдвээ сонгоод хэдхэн алхмаар сорил, шалгалтын материал үүсгээрэй.': 'Choose a topic and create a quiz or exam in a few steps.',
  'Суралцах тайлан': 'Learning report', 'Хүүхдийн сургалтын явцыг нэг дороос харах боломжтой. Сэдэв тус бүрийн ахицтай танилцаарай.': 'Review your child’s learning and topic-by-topic progress in one place.',
  'Системийн дүн шинжилгээ': 'Platform insights', 'Автомат анализ, хэрэглэгчийн хөдөлгөөн, агуулгын чанар, системийн эрсдэлд хяналт тавих боломжтой.': 'Monitor platform analytics, user activity, content quality, and system health.',
  'AI багшаас асуух ↗': 'Ask AI tutor ↗', 'AI тест зохиогч нээх ↗': 'Open AI quiz maker ↗', 'Тайлан үзэх ↗': 'View report ↗', 'Тайланг үзэх ↗': 'View analytics ↗',
  'Дууссан': 'Completed', 'Хүлээгдэж буй': 'Pending', 'Бүгдийг харах': 'View all', 'Бүгдийг үзэх →': 'View all →',
  'Үргэлжлүүлэн суралцах': 'Continue learning', 'Сүүлд үзсэн хичээлүүд': 'Recently viewed', 'AI туслах': 'AI assistant',
  'Нүүр хуудас': 'Home', 'Үндсэн цэс': 'Main menu', 'Заавар үзэх →': 'View guide →', 'Хайх': 'Search',
  'Өнөөдрийн мэнд': 'Good day', 'MONDAY': 'MONDAY', 'Цэс нээх': 'Open menu', 'Цэс хаах': 'Close menu'
};

export function localize(value, locale) {
  if (locale !== 'en') return value;
  if (typeof value === 'string') return englishCopy[value] ?? value;
  if (Array.isArray(value)) return value.map((item) => localize(item, locale));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, locale)]));
  }
  return value;
}

export function Dialog({ title, children, onClose, className = '' }) {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`dialog ${className}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="dialog-header"><h2>{title}</h2><button className="icon-btn" type="button" aria-label="Close" onClick={onClose}>×</button></div>
        {children}
      </section>
    </div>
  );
}

export function AuthDialog({ locale, initialMode = 'login', onClose, onSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const english = locale === 'en';
  const labels = english
    ? { login: 'Sign in', register: 'Create account', forgot: 'Reset password', email: 'Email', password: 'Password', name: 'Full name', confirm: 'Confirm password', submit: 'Continue', toLogin: 'Back to sign in', toRegister: 'Create an account', toForgot: 'Forgot password?', success: 'A reset link is ready in this demo.', passwordMismatch: 'Passwords do not match.' }
    : { login: 'Нэвтрэх', register: 'Бүртгүүлэх', forgot: 'Нууц үг сэргээх', email: 'Имэйл', password: 'Нууц үг', name: 'Овог нэр', confirm: 'Нууц үг давтах', submit: 'Үргэлжлүүлэх', toLogin: 'Нэвтрэх рүү буцах', toRegister: 'Бүртгэл үүсгэх', toForgot: 'Нууц үгээ мартсан уу?', success: 'Сэргээх холбоос бэлэн боллоо.', passwordMismatch: 'Нууц үг таарахгүй байна.' };

  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (mode === 'forgot') {
      onSuccess({ message: labels.success });
      return;
    }
    if (mode === 'register' && form.get('password') !== form.get('confirmPassword')) {
      event.currentTarget.elements.confirmPassword.setCustomValidity(labels.passwordMismatch);
      event.currentTarget.reportValidity();
      return;
    }
    onSuccess({ name: form.get('name') || '', email: form.get('email') || '' });
  }

  return (
    <Dialog title={labels[mode]} onClose={onClose} className="auth-dialog">
      <form className="form-stack" onSubmit={submit}>
        {mode === 'register' && <label>{labels.name}<input name="name" autoComplete="name" required /></label>}
        <label>{labels.email}<input name="email" type="email" autoComplete="email" required /></label>
        {mode !== 'forgot' && <label>{labels.password}<input name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength="8" required /></label>}
        {mode === 'register' && <label>{labels.confirm}<input name="confirmPassword" type="password" autoComplete="new-password" minLength="8" required onChange={(event) => event.currentTarget.setCustomValidity('')} /></label>}
        <button className="primary-btn" type="submit">{labels.submit}</button>
      </form>
      <div className="auth-links">
        {mode !== 'login' && <button className="text-btn" type="button" onClick={() => setMode('login')}>{labels.toLogin}</button>}
        {mode === 'login' && <><button className="text-btn" type="button" onClick={() => setMode('forgot')}>{labels.toForgot}</button><button className="text-btn" type="button" onClick={() => setMode('register')}>{labels.toRegister}</button></>}
      </div>
      <p className="demo-note">{english ? 'Demo only. Authentication is not connected to a server.' : 'Туршилтын горим. Нэвтрэлт сервертэй холбогдоогүй.'}</p>
    </Dialog>
  );
}

export function SearchDialog({ locale, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const english = locale === 'en';
  const sources = localize([
    ...Object.values(roleMap).flatMap((role) => role.resources.map((item) => ({ ...item, subtitle: item.type, page: 'materials' }))),
    { title: '10А анги', subtitle: 'Анги', type: 'Анги', progress: 0, page: 'classes' },
    { title: 'Гэрэлт ирээдүй сургууль', subtitle: 'Сургууль', type: 'Сургууль', progress: 0, page: 'schools' }
  ], locale);
  const matches = sources.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <Dialog title={english ? 'Search EDU BRIDGE' : 'EDU BRIDGE хайх'} onClose={onClose} className="search-dialog">
      <label className="search-field"><span aria-hidden="true">⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={english ? 'Lessons, materials, schools...' : 'Хичээл, материал, сургууль...'} /></label>
      <div className="search-results">
        {matches.length ? matches.slice(0, 8).map((item, index) => (
          <button className="search-result" type="button" key={`${item.title}-${index}`} onClick={() => onSelect(item)}>
            <span className="result-icon">⌕</span><span><strong>{item.title}</strong><small>{item.subtitle}</small></span><span aria-hidden="true">↗</span>
          </button>
        )) : <EmptyState title={english ? 'No results found' : 'Илэрц олдсонгүй'} text={english ? 'Try another keyword.' : 'Өөр түлхүүр үгээр дахин хайна уу.'} />}
      </div>
    </Dialog>
  );
}

export function NotificationsPanel({ locale, onClose, onNotify, readIds, onRead }) {
  const english = locale === 'en';
  const items = [
    { id: 'assignment', title: english ? 'Math assignment due tomorrow' : 'Математикийн даалгавар маргааш дуусна', meta: english ? '10 minutes ago' : '10 минутын өмнө' },
    { id: 'grade', title: english ? 'Biology score was updated' : 'Биологийн дүн шинэчлэгдлээ', meta: english ? '2 hours ago' : '2 цагийн өмнө' },
    { id: 'progress', title: english ? 'Weekly progress is ready' : 'Долоо хоногийн ахиц бэлэн боллоо', meta: english ? 'Yesterday' : 'Өчигдөр' }
  ];
  const unread = items.some((item) => !readIds.includes(item.id));

  function markAllRead() {
    onRead(items.map((item) => item.id));
    onNotify(english ? 'All notifications marked as read.' : 'Бүх мэдэгдлийг уншсан болголоо.');
  }

  return (
    <div className="popover-wrap">
      <button className="popover-dismiss" type="button" aria-label={english ? 'Close notifications' : 'Мэдэгдэл хаах'} onClick={onClose} />
      <section className="notification-panel" aria-label={english ? 'Notifications' : 'Мэдэгдэл'}>
        <header><strong>{english ? 'Notifications' : 'Мэдэгдэл'}</strong><button className="text-btn" type="button" disabled={!unread} onClick={markAllRead}>{english ? 'Mark all read' : 'Бүгдийг уншсан'}</button></header>
        {items.map((item) => <button className={`notification-item ${readIds.includes(item.id) ? '' : 'unread'}`} type="button" key={item.id} onClick={() => onRead([...new Set([...readIds, item.id])])}>
          <span className="notification-mark" /><span><strong>{item.title}</strong><small>{item.meta}</small></span>
        </button>)}
      </section>
    </div>
  );
}

export function ProfileMenu({ locale, user, onClose, onProfile, onSettings, onSignOut }) {
  const english = locale === 'en';
  return (
    <div className="popover-wrap profile-popover-wrap">
      <button className="popover-dismiss" type="button" aria-label={english ? 'Close profile menu' : 'Профайл цэс хаах'} onClick={onClose} />
      <section className="profile-menu">
        <div className="profile-menu-user"><div className="avatar">{user.name.charAt(0)}</div><span><strong>{user.name}</strong><small>{user.email}</small></span></div>
        <button type="button" onClick={onProfile}>{english ? 'Edit profile' : 'Профайл засах'}</button>
        <button type="button" onClick={onSettings}>{english ? 'Preferences' : 'Тохиргоо'}</button>
        <button type="button" className="danger-action" onClick={onSignOut}>{english ? 'Sign out' : 'Гарах'}</button>
      </section>
    </div>
  );
}

export function ProfileDialog({ locale, user, onClose, onSave }) {
  const english = locale === 'en';
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl ?? '');

  function readAvatar(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) {
      event.target.setCustomValidity(english ? 'Choose an image smaller than 2 MB.' : '2 МБ-аас бага хэмжээтэй зураг сонгоно уу.');
      event.target.reportValidity();
      return;
    }
    event.target.setCustomValidity('');
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <Dialog title={english ? 'Edit profile' : 'Профайл засах'} onClose={onClose}>
      <form className="form-stack" onSubmit={(event) => { event.preventDefault(); onSave({ ...Object.fromEntries(new FormData(event.currentTarget)), avatarUrl: avatarPreview }); }}>
        <label className="avatar-upload">{english ? 'Profile picture' : 'Профайл зураг'}<span className="avatar avatar-preview">{avatarPreview ? <img src={avatarPreview} alt="" /> : user.name.charAt(0)}</span><input type="file" accept="image/*" onChange={readAvatar} /></label>
        <label>{english ? 'Full name' : 'Овог нэр'}<input name="name" defaultValue={user.name} required /></label>
        <label>{english ? 'Email' : 'Имэйл'}<input name="email" type="email" defaultValue={user.email} required /></label>
        <label>{english ? 'Role' : 'Үүрэг'}<input value={user.role} readOnly /></label>
        <button className="primary-btn" type="submit">{english ? 'Save changes' : 'Өөрчлөлт хадгалах'}</button>
      </form>
    </Dialog>
  );
}

export function SettingsDialog({ locale, theme, onClose, onLocaleChange, onThemeChange }) {
  const english = locale === 'en';
  return (
    <Dialog title={english ? 'Preferences' : 'Тохиргоо'} onClose={onClose}>
      <div className="settings-list">
        <label><span>{english ? 'Language' : 'Хэл'}</span><select value={locale} onChange={(event) => onLocaleChange(event.target.value)}><option value="mn">Монгол</option><option value="en">English</option></select></label>
        <label><span>{english ? 'Appearance' : 'Загвар'}</span><select value={theme} onChange={(event) => onThemeChange(event.target.value)}><option value="light">{english ? 'Light' : 'Цайвар'}</option><option value="dark">{english ? 'Dark' : 'Харанхуй'}</option></select></label>
        <p className="demo-note">{english ? 'Preferences are saved in this browser.' : 'Тохиргоо энэ browser-т хадгалагдана.'}</p>
      </div>
    </Dialog>
  );
}

export function EmptyState({ title, text, action, onAction }) {
  return <div className="empty-state"><span aria-hidden="true">⌕</span><strong>{title}</strong><p>{text}</p>{action && <button className="text-btn" type="button" onClick={onAction}>{action}</button>}</div>;
}

export function LoadingState({ locale }) {
  return (
    <div className="loading-state" role="status" aria-live="polite" aria-label={locale === 'en' ? 'Loading dashboard' : 'Самбар ачаалж байна'}>
      <div className="loading-heading"><span /><span /></div>
      <div className="loading-stats">{[1, 2, 3, 4].map((item) => <span key={item} />)}</div>
      <div className="loading-panels"><span /><span /></div>
    </div>
  );
}

export class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    const english = this.props.locale === 'en' || localStorage.getItem('edu-locale') === 'en';
    return <main className="error-state"><span aria-hidden="true">!</span><h1>{english ? 'Something went wrong' : 'Алдаа гарлаа'}</h1><p>{english ? 'The dashboard could not be displayed.' : 'Самбарыг харуулахад асуудал гарлаа.'}</p><button className="primary-btn" type="button" onClick={() => this.setState({ hasError: false })}>{english ? 'Try again' : 'Дахин оролдох'}</button></main>;
  }
}