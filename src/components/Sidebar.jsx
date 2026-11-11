import React from 'react';
import { localize } from '../ui.jsx';

export default function Sidebar({ role, activePage, isOpen, onPageChange, onNotify, onClose, locale }) {
  return (
    <>
      {isOpen && <button className="sidebar-backdrop" type="button" aria-label={locale === 'en' ? 'Close menu' : 'Цэс хаах'} onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
        <div className="sidebar-inner">
          <a className="brand" href="#" aria-label="EDU BRIDGE Home" onClick={(event) => event.preventDefault()}>
            <span className="brand-mark">E</span>
            <span className="brand-text"><strong>EDU</strong><span>BRIDGE</span><small>LEARN • TEACH • GROW</small></span>
          </a>
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