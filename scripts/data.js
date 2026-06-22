window.siteConfig = {
  brandName: "Fabriche Design",
  email: "info@fabriche.ru",
  phone: "+7 (473) 300-38-56",
  phoneHref: "tel:+74733003856",
  address: [
    "Воронежская обл.,",
    "Семилукский район,",
    "г. Семилуки,",
    "ул. Курская,",
    "д. 92Г, оф.1",
  ],
  heroFacts: [
    "Итальянское качество и материалы",
    "Пожизненная гарантия",
    "Трендовые декоры итальянской моды",
    "Защитная пленка",
    "22 мм МДФ",
  ],
  socials: [
    { label: "VK", icon: "assets/common/icons/icon-vk.png", href: "https://vk.com/fabdis" },
    { label: "Telegram", icon: "assets/common/icons/icon-tg.png", href: "https://t.me/fabdis" },
    { label: "Email", icon: "assets/common/icons/icon-mail.png", href: "mailto:info@fabriche.ru" },
    { label: "Phone", icon: "assets/common/icons/icon-call.png", href: "tel:+74733003856" },
  ],
  legal: {
    privacy: "#",
    offer: "#",
  },
  about: {
    intro:
      "Коллекцию разрабатывает арт-директор <strong>Марко Фабрицио</strong>. В основе его метода — не поиск трендов, а их формирование. Прежде чем возглавить направление премиальных фасадов, Марко Фабрицио посвятил два десятилетия работе в ателье северной Италии, где лично контролировал сложнейшие фрезеровки и составы покрытий, не имеющих аналогов на открытом рынке.",
    middle:
      "Сегодня его профессиональная репутация такова, что крупнейшие европейские производители кухонь обращаются к его мнению при формировании годовых коллекций. Имя арт-директора здесь — знак качества, который исключает компромиссы.",
    outro:
      "<strong>FABRICE DESIGN</strong> — ФАСАДЫ ДЛЯ КУХНИ, ПРОИЗВОДИМЫЕ В РОССИИ С ИСПОЛЬЗОВАНИЕМ ИТАЛЬЯНСКИХ МАТЕРИАЛОВ И НА ИТАЛЬЯНСКОМ ОБОРУДОВАНИИ.",
  },
  mission: {
    story: [
      "Миссия бренда — сохранить безупречность фасада на всём пути.",
      "Мы следуем тренду на уникальный стиль и редкие тактильные декоры: конечный покупатель получает не просто цвет, а характер поверхности, который сложно повторить. Поэтому полное соприкосновение владельца с фасадом происходит только после окончательной сборки кухни.",
    ],
    benefits: [
      {
        icon: "shield",
        text: "Каждый фасад прибывает под защитной плёнкой",
      },
      {
        icon: "hand",
        text: "Плёнку снимает сам владелец",
      },
      {
        icon: "gem",
        text: "Только совершенная поверхность",
      },
      {
        icon: "ruler",
        text: "Индивидуальный размер",
      },
      {
        icon: "clock",
        text: "Срок исполнения заказа — 30 дней",
      },
      {
        icon: "slab",
        text: "Фасады выполнены из МДФ-плиты 22 мм",
      },
    ],
    signoff: "",
  },
  organization: [
    { label: "Почта", value: "info@fabriche.ru" },
    { label: "Телефон", value: "+7 (473) 300-38-56" },
    { label: "Адрес", value: "Воронежская обл., Семилукский район, г. Семилуки, ул. Курская, зд. 92Г, оф.1" },
    { label: "Документы", value: "Политика и оферта будут добавлены позже" },
  ],
  legalCard: {
    summary: [
      "ООО «ФАБРИЧЕ РУС»",
    ],
    details: [
      { label: "ИНН", value: "3628018460" },
      { label: "ОГРН", value: "1163668114917" },
    ],
  },
};

const buildCollectionKitchens = (slug, label, files) =>
  files.map((file, index) => ({
    title: `${label} ${String(index + 1).padStart(2, "0")}`,
    image: `assets/collection/kitchens/${slug}/${file}`,
  }));

const buildSequentialCollectionKitchens = (slug, label, count, extension = "png", extensionMap = {}) =>
  buildCollectionKitchens(
    slug,
    label,
    Array.from({ length: count }, (_, index) => {
      const position = index + 1;
      const ext = extensionMap[position] || extension;
      return `${slug}-${String(position).padStart(2, "0")}.${ext}`;
    })
  );

const sharedCollectionMillings = Array.from({ length: 7 }, (_, index) => ({
  title: `Фрезеровка ${index + 1}`,
  image: `assets/collection/millings/sardinia/milling-${index + 1}.jpg`,
}));

window.collectionData = {
  bannerImage: "assets/collection/collection-banner.jpg",
  cards: [
    {
      id: "lucent-white",
      title: "Lucent White",
      place: "Сардиния",
      image: "assets/collection/cards/lucent-white.jpg",
      code: "11-0700TPG",
      mood: "белоснежные пляжи, бирюзовое море, скалы.",
      associations: "чистота моря, песок, солнечный свет.",
      description:
        "Lucent White — сияющий белый. Напоминает о песке пляжей и бликах на воде.",
      kitchens: buildSequentialCollectionKitchens("sardinia", "Sardinia", 20, "jpg"),
      millings: sharedCollectionMillings,
    },
    {
      id: "moonbeam",
      title: "Moonbeam",
      place: "Пьемонт",
      image: "assets/collection/cards/moonbeam.jpg",
      code: "13-0000TPG",
      mood: "предгорье Альп, виноградники, озёра.",
      associations: "утренний туман над долинами, тишина гор, элегантность.",
      description:
        "Moonbeam — мягкий, серебристый оттенок. Передаёт прохладу горных рек и лунный свет над холмами.",
      kitchens: buildSequentialCollectionKitchens("piedmont", "Piedmont", 21),
      millings: sharedCollectionMillings,
    },
    {
      id: "crystal-gray",
      title: "Crystal Gray",
      place: "Позитано",
      image: "assets/collection/cards/crystal-gray.jpg",
      code: "13-3801TPG",
      mood: "красочные домики на склоне, лазурное море, атмосфера праздника.",
      associations: "яркие фасады, шум волн, летний отдых.",
      description:
        "Crystal Gray — прозрачный, лёгкий серый. Передаёт игру света на воде и тени от домов.",
      kitchens: buildSequentialCollectionKitchens("positano", "Positano", 22),
      millings: sharedCollectionMillings,
    },
    {
      id: "castle-wall",
      title: "Castle Wall",
      place: "Амальфи",
      image: "assets/collection/cards/castle-wall.jpg",
      code: "14-0108TPG",
      mood: "обрывы над морем, яркие домики, лимонные рощи.",
      associations: "старинная архитектура, средиземноморский шик, величие природы.",
      description:
        "Castle Wall — тёплый, землистый оттенок. Передаёт цвет старинных стен и скал побережья.",
      kitchens: buildSequentialCollectionKitchens("amalfi", "Amalfi", 18),
      millings: sharedCollectionMillings,
    },
    {
      id: "northern-droplet",
      title: "Northern Droplet",
      place: "Лацио",
      image: "assets/collection/cards/northern-droplet.jpg",
      code: "14-4104TPG",
      mood: "побережье Тирренского моря, пляжи рядом с Римом, виллы.",
      associations: "свежесть моря, римская роскошь, отдых у воды.",
      description:
        "Northern Droplet — мягкий, прозрачный оттенок. Напоминает о каплях утренней росы и бризе с моря.",
      kitchens: buildSequentialCollectionKitchens("lazio", "Lazio", 18, "png", {
        5: "bmp",
        6: "bmp",
        7: "bmp",
      }),
      millings: sharedCollectionMillings,
    },
    {
      id: "ghost-gray",
      title: "Ghost Gray",
      place: "Умбрия",
      image: "assets/collection/cards/ghost-gray.jpg",
      code: "16-4703TPG",
      mood: "«зелёное сердце» Италии, средневековые города, оливковые рощи.",
      associations: "тенистые аллеи, старинные стены, умиротворение.",
      description:
        "Ghost Gray — приглушённый серый. Отражает древность архитектуры и прохладу тенистых улиц.",
      kitchens: buildSequentialCollectionKitchens("umbria", "Umbria", 18),
      millings: sharedCollectionMillings,
    },
    {
      id: "shadow",
      title: "Shadow",
      place: "Ломбардия",
      image: "assets/collection/cards/shadow.jpg",
      code: "17-6206TPG",
      mood: "предгорье Альп, озёра Комо и Гарда, элегантная архитектура Милана.",
      associations: "величественные горы, туманные долины, старинные замки.",
      description:
        "Shadow — глубокий, приглушённый оттенок. Передаёт таинственность горных пейзажей и историческую глубину региона.",
      kitchens: buildSequentialCollectionKitchens("lombardy", "Lombardy", 15, "png", {
        1: "jpeg",
        2: "jpeg",
        3: "jpeg",
      }),
      millings: sharedCollectionMillings,
    },
    {
      id: "new-wheat",
      title: "New Wheat",
      place: "Сорренто",
      image: "assets/collection/cards/new-wheat.jpg",
      code: "14-1038TPG",
      mood: "лимонные сады на склонах, вид на Неаполитанский залив, средиземноморская атмосфера.",
      associations: "солнечный свет, аромат цитрусов, терракотовые крыши.",
      description:
        "New Wheat — тёплый, золотистый оттенок. Напоминает о спелых колосьях и солнечном свете, идеально передаёт тепло юга.",
      kitchens: buildSequentialCollectionKitchens("sorrento", "Sorrento", 20),
      millings: sharedCollectionMillings,
    },
    {
      id: "autumn-glaze",
      title: "Autumn Glaze",
      place: "Сицилия",
      image: "assets/collection/cards/autumn-glaze.jpg",
      code: "18-1451TPG",
      mood: "вулкан Этна, древние руины, пляжи с чёрным песком.",
      associations: "жаркий полдень, древние мифы, богатство природы.",
      description:
        "Autumn Glaze — тёплый, слегка дымчатый оттенок. Отражает закаты над морем и величие вулкана.",
      kitchens: buildSequentialCollectionKitchens("sicily", "Sicily", 14),
      millings: sharedCollectionMillings,
    },
    {
      id: "china-blue",
      title: "China Blue",
      place: "Венето",
      image: "assets/collection/cards/china-blue.jpg",
      code: "18-3918TPG",
      mood: "каналы Венеции, лагуны, пляжи Лидо.",
      associations: "голубая вода каналов, парусники, романтика гондол.",
      description:
        "China Blue — глубокий синий. Напоминает о водах Адриатики и вечернем небе над Венецией.",
      kitchens: buildSequentialCollectionKitchens("veneto", "Veneto", 25, "png", {
        25: "jpg",
      }),
      millings: sharedCollectionMillings,
    },
  ],
  colors: [
    {
      id: "liberty",
      name: "Liberty",
      color: "#d8cab8",
      tagline: "Теплый бежевый с эффектом архитектурной мягкости.",
      description:
        "Liberty раскрывается как спокойный итальянский нейтрал: он делает кухню светлой, статусной и хорошо работает с латунью, камнем и сложными древесными тонами.",
      kitchens: [
        { title: "Фасад 01", image: "assets/kitchens/liberty-01.jpg" },
        { title: "Фасад 02", image: "assets/kitchens/liberty-02.jpg" },
        { title: "Фасад 03", image: "assets/kitchens/liberty-03.jpg" },
      ],
      millings: ["Milano", "Riva", "Forma", "Scala", "Vento", "Linea", "Modo"],
    },
    {
      id: "ambra",
      name: "Ambra",
      color: "#ab7f58",
      tagline: "Медовый декор с мягкой глубиной и эффектом тепла.",
      description:
        "Ambra добавляет интерьеру мягкое янтарное сияние и особенно эффектно выглядит в проектах, где фасады должны стать главным визуальным акцентом.",
      kitchens: [
        { title: "Фасад 01", image: "assets/kitchens/ambra-01.jpg" },
        { title: "Фасад 02", image: "assets/kitchens/ambra-02.jpg" },
        { title: "Фасад 03", image: "assets/kitchens/ambra-03.jpg" },
      ],
      millings: ["Milano", "Riva", "Forma", "Scala", "Vento", "Linea", "Modo"],
    },
    {
      id: "notte",
      name: "Notte",
      color: "#514848",
      tagline: "Глубокий графит для собранных и смелых кухонь.",
      description:
        "Notte работает как вечерняя нота коллекции: делает композицию выразительной, подчеркивает геометрию фасада и хорошо сочетается со светлым камнем.",
      kitchens: [
        { title: "Фасад 01", image: "assets/kitchens/notte-01.jpg" },
        { title: "Фасад 02", image: "assets/kitchens/notte-02.jpg" },
        { title: "Фасад 03", image: "assets/kitchens/notte-03.jpg" },
      ],
      millings: ["Milano", "Riva", "Forma", "Scala", "Vento", "Linea", "Modo"],
    },
    {
      id: "oliva",
      name: "Oliva",
      color: "#75806a",
      tagline: "Приглушенный оливковый в духе европейских интерьеров.",
      description:
        "Oliva дает интерьеру модную природную основу и помогает собрать более сложный, живой и премиальный образ кухни без лишней декоративности.",
      kitchens: [
        { title: "Фасад 01", image: "assets/kitchens/oliva-01.jpg" },
        { title: "Фасад 02", image: "assets/kitchens/oliva-02.jpg" },
        { title: "Фасад 03", image: "assets/kitchens/oliva-03.jpg" },
      ],
      millings: ["Milano", "Riva", "Forma", "Scala", "Vento", "Linea", "Modo"],
    },
  ],
};

window.pageContent = {
  collectionBenefits: [
    { icon: "shield", text: "Каждый фасад прибывает под защитной плёнкой" },
    { icon: "hand", text: "Её снимает сам владелец" },
    { icon: "spark", text: "Одним движением" },
    { icon: "gem", text: "Только совершенная поверхность" },
    { icon: "ruler", text: "Индивидуальный размер" },
    { icon: "clock", text: "Срок исполнения заказа — 30 дней" },
    { icon: "slab", text: "Фасады выполнены из МДФ-плиты 22 мм" },
  ],
  advantagesSection: {
    kicker: "Преимущества коллекции",
  },
  advantagesCards: [
    {
      title: "Итальянское качество|и материалы",
      icon: "gem",
      text: "Редкие декоры, тактильные поверхности и визуальная глубина собирают интерьер в более дорогой и точный образ.",
    },
    {
      title: "Пожизненная|гарантия",
      icon: "shield",
      text: "Коллекция рассчитана на долгую эксплуатацию и поддерживает уверенное ощущение надежности в ежедневном использовании.",
    },
    {
      title: "Трендовые декоры|итальянской моды",
      icon: "spark",
      text: "Мы отбираем решения, которые звучат современно, но не устаревают визуально через один сезон.",
    },
    {
      title: "Защитная|пленка",
      icon: "layers",
      text: "Поверхность сохраняет декоративную чистоту и спокойнее переносит бытовую нагрузку в реальной жизни.",
    },
    {
      title: "МДФ|22 мм",
      icon: "slab",
      text: "Материал дает фасаду правильную глубину, устойчивость и выразительность фрезеровки на уровне предметного дизайна.",
    },
  ],
};

window.formConfig = {
  provider: "formspree",
  submitEmail: "info@fabriche.ru",
  formspreeEndpoint: "",
  emailjs: {
    serviceId: "",
    templateId: "",
    publicKey: "",
  },
  successMessage: "Спасибо. Заявка отправлена, мы свяжемся с вами по почте.",
  configErrorMessage:
    "Форма еще не подключена к сервису отправки. Укажите Formspree endpoint или EmailJS параметры в scripts/data.js.",
  requestTypes: {
    price: {
      kicker: "Прайс",
      title: "Получить прайс",
      description: "Оставьте ФИО и e-mail, и мы отправим прайс на коллекцию Fabriche Design.",
      defaultMessage: "Интересует прайс на коллекцию Fabriche Design.",
    },
    catalog: {
      kicker: "Каталог",
      title: "Получить каталог",
      description: "Оставьте ФИО и e-mail, и мы отправим каталог Fabriche Design.",
      defaultMessage: "Хочу получить каталог Fabriche Design.",
    },
  },
};
