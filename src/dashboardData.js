import studentNavigation from './navigation/student.js';
import teacherNavigation from './navigation/teacher.js';
import parentNavigation from './navigation/parent.js';
import adminNavigation from './navigation/admin.js';

export const roleMap = {
  student: {
    name: 'Түмэн-Очир',
    role: 'Сурагч',
    nav: studentNavigation,
    welcome: 'Сайн байна уу, Түмэн-Очир!',
    subtext: 'Өнөөдөр өөртөө шинэ зүйл сургах сайхан өдөр.',
    cta: 'Суралцаж эхлэх',
    stats: [
      { label: 'Суралцсан цаг', value: '24.5', unit: 'цаг', meta: '↗ Өнгөрсөн долоо хоногоос 12%', tone: 'positive' },
      { label: 'Тестийн дундаж', value: '86', unit: '/100', meta: '↗ 5 оноогоор өссөн', tone: 'positive' },
      { label: 'Дуусгасан хичээл', value: '18', unit: 'хичээл', meta: 'Энэ сарын үзүүлэлт', tone: 'default' },
      { label: 'Суралцсан өдөр', value: '12', unit: 'өдөр', meta: '↗ 3 өдөр дараалан', tone: 'positive' }
    ],
    primary: {
      title: 'Суралцах ахиц',
      subtitle: 'Сүүлийн 7 хоногийн үзүүлэлт',
      chart: [65, 72, 78, 74, 88, 90, 96],
      labels: ['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня']
    },
    secondary: {
      title: 'Өнөөдрийн төлөвлөгөө',
      subtitle: 'Өдөр бүр бага багаар урагшилъя',
      items: [
        { title: 'Биологи — Эсийн бүтэц', meta: '25 минут · Хичээл үзэх', state: 'done' },
        { title: 'Математик — Функц', meta: '30 минут · Дасгал ажил', state: 'pending' },
        { title: 'Англи хэл — Үгийн сан', meta: '15 минут · Давтлага', state: 'pending' }
      ]
    },
    resources: [
      { type: 'Биологи', title: 'Эсийн бүтэц ба үүрэг', progress: 72, color: 'blue', icon: '✿' },
      { type: 'Математик', title: 'Функц ба график', progress: 45, color: 'green', icon: '∑' },
      { type: 'Хими', title: 'Органик нэгдлүүд', progress: 58, color: 'orange', icon: '⚗' },
      { type: 'Англи', title: 'Vocabulary booster', progress: 64, color: 'purple', icon: 'A' }
    ],
    ai: {
      title: 'Ойлгохгүй зүйл байна уу?',
      text: 'AI хувийн багшаасаа асуугаарай. Чиний түвшинд тохируулж тайлбарлана.',
      button: 'AI багшаас асуух ↗'
    }
  },
  teacher: {
    name: 'Бат-Эрдэнэ',
    role: 'Багш',
    nav: teacherNavigation,
    welcome: 'Сайн байна уу, Бат-Эрдэнэ!',
    subtext: 'Өнөөдрийн хичээл, ангийнхаа ахицыг эндээс удирдаарай.',
    cta: 'Шалгалт үүсгэх',
    stats: [
      { label: 'Нийт сурагч', value: '128', unit: 'сурагч', meta: '↗ 14 сурагч нэмэгдлээ', tone: 'positive' },
      { label: 'Шалгалтын дундаж', value: '78', unit: '/100', meta: '↗ 3 оноогоор өссөн', tone: 'positive' },
      { label: 'Үүсгэсэн тест', value: '24', unit: 'тест', meta: 'Энэ сарын статистик', tone: 'default' },
      { label: 'Шалгах хариулт', value: '16', unit: 'хариулт', meta: '↗ 5 хариулт шинэчлэгдсэн', tone: 'positive' }
    ],
    primary: {
      title: 'Ангиудын ахиц',
      subtitle: 'Сүүлийн 6 сарын үзүүлэлт',
      chart: [52, 58, 61, 69, 73, 80, 86],
      labels: ['Сар1', 'Сар2', 'Сар3', 'Сар4', 'Сар5', 'Сар6', 'Сар7']
    },
    secondary: {
      title: 'Өнөөдрийн ажлууд',
      subtitle: 'Багшийн ажлын жагсаалт',
      items: [
        { title: '10А анги — Биологийн шалгалт', meta: '09:00 · Хариулах', state: 'pending' },
        { title: '11Б анги — Дүн баталгаажуулах', meta: '12:30 · Удирдах', state: 'pending' },
        { title: 'Хичээлийн төлөвлөгөө боловсруулах', meta: '15:00 · Бэлтгэл', state: 'done' }
      ]
    },
    resources: [
      { type: 'Хими', title: 'Органик бодисийн сорил', progress: 78, color: 'blue', icon: '⚗' },
      { type: 'Биологи', title: 'Генетикийн тайлбар', progress: 62, color: 'green', icon: '✿' },
      { type: 'Математик', title: 'Линейр функц', progress: 84, color: 'orange', icon: '∑' },
      { type: 'Англи', title: 'IELTS vocab pack', progress: 71, color: 'purple', icon: 'A' }
    ],
    ai: {
      title: 'Шалгалт зохиох уу?',
      text: 'Хичээлийн сэдвээ сонгоод хэдхэн алхмаар сорил, шалгалтын материал үүсгээрэй.',
      button: 'AI тест зохиогч нээх ↗'
    }
  },
  parent: {
    name: 'Дэлгэрмаа',
    role: 'Эцэг эх',
    nav: parentNavigation,
    welcome: 'Сайн байна уу, Дэлгэрмаа!',
    subtext: 'Хүүхдийн сургалт, ирц, даалгаврын байдалд хяналт тавьж байна.',
    cta: 'Байдал харах',
    stats: [
      { label: 'Нийт оноо', value: '91', unit: '/100', meta: '↗ 8 оноогоор өссөн', tone: 'positive' },
      { label: 'Ирц', value: '96', unit: '%', meta: 'Энэ сар 2 удаа тасалсан', tone: 'default' },
      { label: 'Даалгавар', value: '14', unit: 'даалгавар', meta: '8 нь дууссан', tone: 'positive' },
      { label: 'Хичээл', value: '18', unit: 'хичээл', meta: 'Өнгөрсөн 2 долоо хоногт', tone: 'default' }
    ],
    primary: {
      title: 'Хүүхдийн ахиц',
      subtitle: 'Суралцах үзүүлэлт',
      chart: [40, 52, 58, 61, 76, 84, 91],
      labels: ['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня']
    },
    secondary: {
      title: 'Байгуулсан мэдээлэл',
      subtitle: 'Хүүхдийн энэ сарын тайлан',
      items: [
        { title: 'Математик — Дүн 95', meta: 'Томоор бүрэн боловсруулсан', state: 'done' },
        { title: 'Англи — Давтлага 4/5', meta: 'Эцэг эхийн хяналт шаардлагатай', state: 'pending' },
        { title: 'Биологи — Шалгалт 88', meta: 'Сайн үр дүн', state: 'done' }
      ]
    },
    resources: [
      { type: 'Математик', title: 'Функц ба график', progress: 91, color: 'blue', icon: '∑' },
      { type: 'Англи', title: 'Vocabulary practice', progress: 70, color: 'green', icon: 'A' },
      { type: 'Биологи', title: 'Экосистем', progress: 88, color: 'orange', icon: '✿' },
      { type: 'Түүх', title: 'Нийгмийнүеийн сонголт', progress: 66, color: 'purple', icon: '◍' }
    ],
    ai: {
      title: 'Суралцах тайлан',
      text: 'Хүүхдийн сургалтын явцыг нэг дороос харах боломжтой. Сэдэв тус бүрийн ахицтай танилцаарай.',
      button: 'Тайлан үзэх ↗'
    }
  },
  admin: {
    name: 'Наранзаяа',
    role: 'Админ',
    nav: adminNavigation,
    welcome: 'Сайн байна уу, Наранзаяа!',
    subtext: 'Платформын үйл ажиллагаа, хэрэглэгч, агуулга, тайланг нэг дороос удирдах боломжтой.',
    cta: 'Систем үнэлэх',
    stats: [
      { label: 'Нийт хэрэглэгч', value: '12.4K', unit: 'хэрэглэгч', meta: '↗ 9.2% өсөлт', tone: 'positive' },
      { label: 'Идэвхтэй сурагч', value: '8.7K', unit: 'сурагч', meta: 'Энэ сарын тайлан', tone: 'default' },
      { label: 'Батлагдсан багш', value: '420', unit: 'багш', meta: '↗ 18 шинэ багш', tone: 'positive' },
      { label: 'Дэвшилтэт агуулга', value: '356', unit: 'материал', meta: 'тайлагнасан', tone: 'default' }
    ],
    primary: {
      title: 'Системийн ахиц',
      subtitle: 'Гарын авлагын болон SEO тайлан',
      chart: [48, 63, 59, 74, 81, 88, 94],
      labels: ['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня']
    },
    secondary: {
      title: 'Шинэ ажлууд',
      subtitle: 'Тохиргоо, хяналт, баталгаажуулалт',
      items: [
        { title: 'Багшийн баталгаажуулалт', meta: '26 хүсэлт хүлээгдэж байна', state: 'pending' },
        { title: 'Сургалтын материалын хяналт', meta: '18 шинэ материал шалгагдаж байна', state: 'pending' },
        { title: 'Системийн аюулгүй байдал', meta: 'Ажиллагаа хэвийн байна', state: 'done' }
      ]
    },
    resources: [
      { type: 'Хэрэглэгч', title: 'Ерөнхий хэрэглэгчийн тайлан', progress: 86, color: 'blue', icon: '◫' },
      { type: 'Багш', title: 'Багшийн үнэлгээ', progress: 71, color: 'green', icon: '✓' },
      { type: 'Сургууль', title: 'Сургуулиудын статистик', progress: 78, color: 'orange', icon: '▣' },
      { type: 'Агуулга', title: 'Материалын сан', progress: 92, color: 'purple', icon: '▧' }
    ],
    ai: {
      title: 'Системийн дүн шинжилгээ',
      text: 'Автомат анализ, хэрэглэгчийн хөдөлгөөн, агуулгын чанар, системийн эрсдэлд хяналт тавих боломжтой.',
      button: 'Тайланг үзэх ↗'
    }
  }
};