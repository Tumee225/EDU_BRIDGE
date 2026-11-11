import React, { useState } from 'react';
import { EmptyState } from '../ui.jsx';

export default function FeaturePage({ role, page, locale, extraItems, onCreate, onOpenItem, onNotify }) {
  const [query, setQuery] = useState('');
  const english = locale === 'en';
  const pageInfo = role.nav.find((item) => item.page === page);
  const title = pageInfo?.label ?? (english ? 'Settings' : 'Тохиргоо');
  const items = [...role.resources, ...extraItems].filter((item) => `${item.title} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="feature-page"><div className="feature-heading"><div><p className="eyebrow">{english ? 'EDU BRIDGE WORKSPACE' : 'EDU BRIDGE АЖЛЫН ОРЧИН'}</p><h1>{title}</h1><p className="subtext">{english ? `Manage ${title.toLowerCase()} and keep your learning work organized.` : `${title} хэсгийн мэдээлэл, ажлуудыг нэг дороос удирдаарай.`}</p></div><button className="primary-btn" type="button" onClick={onCreate}>＋ <span>{english ? 'Add item' : 'Нэмэх'}</span></button></div>
    <section className="panel feature-panel"><div className="feature-toolbar"><strong>{english ? `${items.length} items` : `${items.length} мэдээлэл`}</strong><label className="inline-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={english ? 'Filter this section' : 'Энэ хэсгээс хайх'} /></label></div>
      {items.length === 0 ? <EmptyState title={english ? 'Nothing here yet' : 'Одоогоор мэдээлэл алга'} text={english ? 'Add a new item or change your search.' : 'Шинэ мэдээлэл нэмэх эсвэл хайлтаа өөрчилнө үү.'} action={english ? 'Add item' : 'Мэдээлэл нэмэх'} onAction={onCreate} /> : <div className="feature-list">{items.map((item, index) => <article className="feature-row" key={`${item.title}-${index}`}><span className={`course-art ${item.color}`} aria-hidden="true">{item.icon}</span><div className="feature-row-copy"><small>{item.type}</small><strong>{item.title}</strong><div className="course-bar"><span style={{ width: `${item.progress}%` }} /></div></div><span className="feature-progress">{item.progress}%</span><button className="text-btn" type="button" onClick={() => onOpenItem(item)}>{english ? 'Details' : 'Дэлгэрэнгүй'}</button></article>)}</div>}
    </section><button className="text-btn reset-demo" type="button" onClick={() => onNotify(english ? 'Your demo data is unchanged.' : 'Жишээ өгөгдөл хэвээр байна.')}>{english ? 'Refresh demo data' : 'Жишээ өгөгдөл шинэчлэх'}</button>
  </div>;
}