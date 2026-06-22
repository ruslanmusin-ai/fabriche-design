# Fabriche Landing

Статический лендинг на чистом `HTML/CSS/JS`.

## Быстрый запуск

```bash
python3 -m http.server 4173
```

Открыть: `http://127.0.0.1:4173`

## Куда складывать ассеты

- `assets/hero/hero-banner.jpg` — главный баннер
- `assets/collection/collection-banner.jpg` — баннер блока коллекции
- `assets/designer/designer-photo.jpg` — фото дизайнера
- `assets/catalog/catalog-cover.jpg` — обложка каталога
- `assets/catalog/organization-banner.jpg` — нижний баннер в блоке каталога

### Галереи по цветам

Для каждого цвета сейчас ожидаются такие файлы:

- `assets/kitchens/liberty-01.jpg`
- `assets/kitchens/liberty-02.jpg`
- `assets/kitchens/liberty-03.jpg`
- `assets/kitchens/ambra-01.jpg`
- `assets/kitchens/ambra-02.jpg`
- `assets/kitchens/ambra-03.jpg`
- `assets/kitchens/notte-01.jpg`
- `assets/kitchens/notte-02.jpg`
- `assets/kitchens/notte-03.jpg`
- `assets/kitchens/oliva-01.jpg`
- `assets/kitchens/oliva-02.jpg`
- `assets/kitchens/oliva-03.jpg`

### Блок преимуществ

- `assets/advantages/advantage-01-quality.jpg`
- `assets/advantages/advantage-02-warranty.jpg`
- `assets/advantages/advantage-03-trends.jpg`
- `assets/advantages/advantage-04-protection.jpg`
- `assets/advantages/advantage-05-mdf.jpg`

Если названия будут другими, обновите пути в `scripts/data.js`.

## Где менять контент

- `scripts/data.js` — тексты, соцсети, контакты, коллекции, преимущества, конфиг формы
- `index.html` — структура блоков
- `styles/main.css` — стили и адаптив
- `scripts/main.js` — интерактив, модалка, отправка форм

## Подключение формы

В `scripts/data.js` настройте `window.formConfig`.

### Formspree

```js
window.formConfig = {
  provider: "formspree",
  formspreeEndpoint: "https://formspree.io/f/your-id",
};
```

### EmailJS

```js
window.formConfig = {
  provider: "emailjs",
  emailjs: {
    serviceId: "service_xxx",
    templateId: "template_xxx",
    publicKey: "public_xxx",
  },
};
```

Пока конфиг не заполнен, форма покажет понятное сообщение, что отправка еще не подключена.
