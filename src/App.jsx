import React, { useEffect, useState } from 'react';
import { roleMap } from './dashboardData.js';
import { AppErrorBoundary, ProfileDialog, SearchDialog, SettingsDialog, localize } from './ui.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import RegisterPage from './components/auth/RegisterPage.jsx';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import DashboardOverview from './components/DashboardOverview.jsx';
import LoadingState from './components/LoadingState.jsx';
import TutorPage from './components/TutorPage.jsx';
import FeaturePage from './components/FeaturePage.jsx';
import { CreateItemDialog, ItemDialog } from './components/DashboardDialogs.jsx';

export default function App() {
  const [session, setSession] = useState(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem('edu-demo-session') ?? 'null');
      return saved && roleMap[saved.roleKey] ? saved : null;
    } catch {
      return null;
    }
  });
  const roleKey = session?.roleKey ?? 'student';
  const [authScreen, setAuthScreen] = useState('login');
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
  const [user, setUser] = useState(() => ({
    name: session?.name ?? roleMap[session?.roleKey ?? 'student'].name,
    email: session?.email ?? '',
    avatarUrl: ''
  }));
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

  function signIn({ roleKey: nextRole, email, name }) {
    const nextSession = { roleKey: nextRole, email, name: name || roleMap[nextRole].name };
    sessionStorage.setItem('edu-demo-session', JSON.stringify(nextSession));
    setSession(nextSession);
    setActivePage('overview');
    setTaskStates({});
    setExtraItems([]);
    setUser({ ...nextSession, avatarUrl: '' });
    setSidebarOpen(false);
    setAuthScreen('login');
    notify(english ? `${localize(roleMap[nextRole].role, locale)} workspace opened.` : `${roleMap[nextRole].role} эрхээр нэвтэрлээ.`);
  }

  function signOut() {
    sessionStorage.removeItem('edu-demo-session');
    setSession(null);
    setAuthScreen('login');
    setProfileOpen(false);
    setActivePage('overview');
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

  function updateReadNotifications(ids) {
    setReadNotificationIds(ids);
    localStorage.setItem('edu-read-notifications', JSON.stringify(ids));
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

  if (!session) {
    const authProps = { locale, onLocaleChange: setLocale };
    return <AppErrorBoundary locale={locale}>{authScreen === 'register'
      ? <RegisterPage {...authProps} onRegister={signIn} onLogin={() => setAuthScreen('login')} />
      : authScreen === 'forgot'
        ? <ForgotPasswordPage {...authProps} onLogin={() => setAuthScreen('login')} />
        : <LoginPage {...authProps} onLogin={signIn} onRegister={() => setAuthScreen('register')} onForgotPassword={() => setAuthScreen('forgot')} />}</AppErrorBoundary>;
  }

  return (
    <AppErrorBoundary locale={locale}>
      <div className="app-shell" data-theme={theme}>
        <Sidebar role={role} activePage={activePage} isOpen={sidebarOpen} locale={locale} onPageChange={selectPage} onNotify={notify} onClose={() => setSidebarOpen(false)} />
        <main className="main-panel">
          <Topbar
            activeLabel={activeLabel}
            locale={locale}
            theme={theme}
            user={user}
            role={role.role}
            menuOpen={sidebarOpen}
            notificationsOpen={notificationsOpen}
            profileOpen={profileOpen}
            unreadCount={Math.max(0, 3 - readNotificationIds.length)}
            readIds={readNotificationIds}
            onMenuToggle={() => setSidebarOpen((open) => !open)}
            onSearch={() => { setSearchOpen(true); setNotificationsOpen(false); setProfileOpen(false); }}
            onNotificationsToggle={() => { setNotificationsOpen((open) => !open); setProfileOpen(false); }}
            onThemeToggle={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
            onLocaleToggle={() => setLocale((current) => current === 'mn' ? 'en' : 'mn')}
            onProfileToggle={() => { setProfileOpen((open) => !open); setNotificationsOpen(false); }}
            onNotificationsClose={() => setNotificationsOpen(false)}
            onProfileClose={() => setProfileOpen(false)}
            onReadNotifications={updateReadNotifications}
            onNotify={notify}
            onEditProfile={() => { setProfileOpen(false); setDialog('profile'); }}
            onSettings={() => { setProfileOpen(false); setDialog('settings'); }}
            onSignOut={signOut}
          />
          <section className="content">
            {loading ? <LoadingState locale={locale} />
              : activePage === 'overview' ? <DashboardOverview role={role} taskStates={taskStates} onTaskChange={(index, checked) => setTaskStates((current) => ({ ...current, [index]: checked }))} onNavigate={selectPage} onNotify={notify} locale={locale} />
                : activePage === 'ai' ? <TutorPage locale={locale} onNotify={notify} />
                  : <FeaturePage key={`${roleKey}-${activePage}`} role={role} page={activePage} locale={locale} extraItems={extraItems} onCreate={() => setDialog('create')} onOpenItem={setSelectedItem} onNotify={notify} />}
          </section>
        </main>
        <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
        {searchOpen && <SearchDialog locale={locale} onClose={() => setSearchOpen(false)} onSelect={(item) => { setSearchOpen(false); setSelectedItem(item); }} />}
        {dialog === 'profile' && <ProfileDialog locale={locale} user={{ ...user, role: role.role }} onClose={() => setDialog('')} onSave={saveProfile} />}
        {dialog === 'settings' && <SettingsDialog locale={locale} theme={theme} onClose={() => setDialog('')} onLocaleChange={setLocale} onThemeChange={setTheme} />}
        {dialog === 'create' && <CreateItemDialog locale={locale} onClose={() => setDialog('')} onSave={saveItem} />}
        {selectedItem && <ItemDialog item={selectedItem} locale={locale} onClose={() => setSelectedItem(null)} />}
      </div>
    </AppErrorBoundary>
  );
}