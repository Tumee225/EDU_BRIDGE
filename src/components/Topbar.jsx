import React from 'react';
import { NotificationsPanel, ProfileMenu } from '../ui.jsx';

export default function Topbar({
  activeLabel,
  locale,
  theme,
  user,
  role,
  menuOpen,
  notificationsOpen,
  profileOpen,
  unreadCount,
  readIds,
  onMenuToggle,
  onSearch,
  onNotificationsToggle,
  onThemeToggle,
  onLocaleToggle,
  onProfileToggle,
  onNotificationsClose,
  onProfileClose,
  onReadNotifications,
  onNotify,
  onEditProfile,
  onSettings,
  onSignOut
}) {
  const english = locale === 'en';
  return (
    <header className="topbar">
      <button className="mobile-menu" type="button" aria-label={english ? 'Open menu' : 'Цэс нээх'} aria-expanded={menuOpen} onClick={onMenuToggle}>☰</button>
      <div className="breadcrumb">{english ? 'Home' : 'Нүүр хуудас'} <span>/</span> <strong>{activeLabel}</strong></div>
      <div className="top-actions">
        <button className="icon-btn" type="button" aria-label={english ? 'Search' : 'Хайх'} title={english ? 'Search' : 'Хайх'} onClick={onSearch}>⌕</button>
        <button className="icon-btn notification" type="button" aria-label={english ? 'Notifications' : 'Мэдэгдэл'} title={english ? 'Notifications' : 'Мэдэгдэл'} aria-expanded={notificationsOpen} onClick={onNotificationsToggle}>♧{unreadCount > 0 && <span className="dot" />}</button>
        <button className="icon-btn theme-toggle" type="button" aria-label={english ? 'Toggle theme' : 'Загвар солих'} title={english ? 'Toggle theme' : 'Загвар солих'} onClick={onThemeToggle}>{theme === 'light' ? '☾' : '☀'}</button>
        <button className="lang-toggle" type="button" aria-label={english ? 'Switch language' : 'Хэл солих'} onClick={onLocaleToggle}>{locale === 'mn' ? 'MN' : 'EN'} ▾</button>
        <button className="profile-box profile-trigger" type="button" aria-expanded={profileOpen} onClick={onProfileToggle}>
          <span className="avatar">{user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : user.name.charAt(0)}</span>
          <span className="profile-copy"><strong>{user.name}</strong><small>{role}</small></span><span className="caret">▾</span>
        </button>
      </div>
      {notificationsOpen && <NotificationsPanel locale={locale} onClose={onNotificationsClose} onNotify={onNotify} readIds={readIds} onRead={onReadNotifications} />}
      {profileOpen && <ProfileMenu locale={locale} user={{ ...user, role }} onClose={onProfileClose} onProfile={onEditProfile} onSettings={onSettings} onSignOut={onSignOut} />}
    </header>
  );
}