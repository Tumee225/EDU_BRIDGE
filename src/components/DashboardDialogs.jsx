import React from 'react';
import { Dialog } from '../ui.jsx';

export function CreateItemDialog({ locale, onClose, onSave }) {
  const english = locale === 'en';
  return <Dialog title={english ? 'Add a new item' : 'Шинэ мэдээлэл нэмэх'} onClose={onClose}><form className="form-stack" onSubmit={(event) => { event.preventDefault(); onSave(Object.fromEntries(new FormData(event.currentTarget))); }}>
    <label>{english ? 'Title' : 'Нэр'}<input name="title" required maxLength="80" /></label><label>{english ? 'Category' : 'Төрөл'}<select name="type"><option>{english ? 'Learning material' : 'Сургалтын материал'}</option><option>{english ? 'Lesson' : 'Хичээл'}</option><option>{english ? 'Assessment' : 'Шалгалт'}</option></select></label><button className="primary-btn" type="submit">{english ? 'Save demo item' : 'Жишээ мэдээлэл хадгалах'}</button>
  </form><p className="demo-note">{english ? 'This item is stored in memory only.' : 'Энэ мэдээлэл зөвхөн түр хугацаанд хадгалагдана.'}</p></Dialog>;
}

export function ItemDialog({ item, locale, onClose }) {
  const english = locale === 'en';
  return <Dialog title={item.title} onClose={onClose}><div className="item-detail"><span>{item.type}</span><div className="course-bar"><span style={{ width: `${item.progress}%` }} /></div><strong>{item.progress}% {english ? 'complete' : 'дууссан'}</strong><p>{english ? 'Demo content. Details will come from the connected platform API in a later phase.' : 'Жишээ агуулга. Дэлгэрэнгүй мэдээллийг дараагийн шатанд API-аас авна.'}</p></div></Dialog>;
}