document.addEventListener("DOMContentLoaded", () => {
    // Конфігурація Firebase 
    // ЗАМІНІТЬ ЦІ ЗНАЧЕННЯ НА ВАШІ ВЛАСНІ ДАНІ З КОНСОЛІ FIREBASE
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // Ініціалізація Firebase
    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    // Функція для підрахунку переглядів
    const incrementViewCount = () => {
        // Використовуємо шлях до сторінки як її унікальний ідентифікатор
        const pageId = window.location.pathname.replace(/[^a-z0-9]/gi, '_') || 'home';
        const pageViewsRef = db.collection('page_views').doc(pageId);

        // Використовуємо транзакцію для безпечного оновлення лічильника
        db.runTransaction((transaction) => {
            return transaction.get(pageViewsRef).then((doc) => {
                let newCount = 1;
                if (doc.exists) {
                    newCount = doc.data().count + 1;
                }
                transaction.set(pageViewsRef, { count: newCount });
                return newCount;
            });
        }).then((newCount) => {
            // Оновлюємо лічильник на сторінці
            const counterElement = document.getElementById('view-counter');
            const counterContainer = document.getElementById('view-counter-container');
            if(counterElement && counterContainer) {
                counterElement.textContent = newCount;
                counterContainer.style.display = 'inline';
            }
        }).catch((error) => {
            console.error("Помилка транзакції Firebase: ", error);
        });
    };
    
    // Викликаємо функцію підрахунку переглядів при завантаженні сторінки
    incrementViewCount();


    // Об'єкт для перекладів
    const translations = {
        'uk': {
            'home': 'Головна',
            'members': 'Учасники',
            'gallery': 'Галерея',
            'music': 'Музика',
            'contacts': 'Контакти',
            'hero-title-home': 'Вас вітає JORS Метал Гурт!',
            'hero-subtitle-home': 'Пориньте у світ музики разом із нами.',
            'members-title': 'Учасники гурту',
            'members-subtitle': 'Познайомтесь з нашими талановитими учасниками!',
            'gallery-title': 'Галерея',
            'gallery-subtitle': 'Дивіться фотографії та моменти гурту JORS!',
            'music-title': 'Музика',
            'music-subtitle': 'Скоро виходить альбом HOPEKILLER!',
            'album-announcement': 'Скоро виходить альбом HOPEKILLER!',
            'countdown-days': 'Дні',
            'countdown-hours': 'Години',
            'countdown-minutes': 'Хвилини',
            'countdown-seconds': 'Секунди',
            'contacts-title': 'Контакти',
            'contacts-email': 'Електронна пошта',
            'instagram-title': 'Instagram',
            'instagram-group': 'Група',
            'instagram-david': 'Давид',
            'instagram-oleksandr': 'Олександр',
            'instagram-yaroslav': 'Ярослав',
            'privacy-title': 'Політика конфіденційності',
            'privacy-subtitle': 'Ми піклуємося про вашу приватність та збереження ваших даних.',
            'privacy-heading1': 'Збір і використання даних',
            'privacy-p1': 'Ми збираємо лише ті дані, які необхідні для забезпечення якісного обслуговування, наприклад, ваші контактні дані, коли ви зв\'язуєтесь з нами.',
            'privacy-heading2': 'Захист даних',
            'privacy-p2': 'Усі ваші дані зберігаються безпечно та не передаються третім сторонам без вашої згоди.',
            'privacy-heading3': 'Ваші права',
            'privacy-p3': 'Ви маєте право дізнатися, які дані ми зберігаємо, виправити їх або вимагати їх видалення. Для цього зв\'яжіться з нами за електронною адресою',
            'privacy-heading4': 'Зміни в політиці',
            'privacy-p4': 'Ми можемо оновлювати цю політику конфіденційності. Усі зміни будуть публікуватися на цій сторінці.',
            'footer-text': '&copy; 2025 Гурт JORS. Всі права захищено. | <a href="privacy.html">Політика конфіденційності</a>',
            'band-info-oleksandr': 'Олександр — ритм-гітарист, співзасновник гурту. Його рифи створюють міцний фундамент для нашого звучання.',
            'band-info-david': 'Давид — соло-гітарист та один із засновників. Його віртуозні соло прорізають простір, даруючи незабутні емоції.',
            'band-info-yaroslav': 'Ярослав — наш потужний барабанщик. Його енергійні ритми тримають увесь гурт і заряджають публіку.',
            'events-title': 'Найближчі заходи',
            'event1-title': 'Стадіон Ювілейний',
            'event1-date': '12.08.2025 о 17:00',
            'event1-entry': 'Вхід безкоштовний',
            'event2-title': 'BunkerPub',
            'event2-date': '15.08.2025',
            'event2-entry': 'Потрібна бронь',
            'views': 'Переглядів'
        },
        'en': {
            'home': 'Home',
            'members': 'Members',
            'gallery': 'Gallery',
            'music': 'Music',
            'contacts': 'Contacts',
            'hero-title-home': 'Welcome to JORS Metal Band!',
            'hero-subtitle-home': 'Immerse yourself in the world of music with us.',
            'members-title': 'Band Members',
            'members-subtitle': 'Meet our talented members!',
            'gallery-title': 'Gallery',
            'gallery-subtitle': 'See photos and moments of the JORS band!',
            'music-title': 'Music',
            'music-subtitle': 'Album HOPEKILLER coming soon!',
            'album-announcement': 'Album HOPEKILLER coming soon!',
            'countdown-days': 'Days',
            'countdown-hours': 'Hours',
            'countdown-minutes': 'Minutes',
            'countdown-seconds': 'Seconds',
            'contacts-title': 'Contacts',
            'contacts-email': 'Email',
            'instagram-title': 'Instagram',
            'instagram-group': 'Group',
            'instagram-david': 'David',
            'instagram-oleksandr': 'Oleksandr',
            'instagram-yaroslav': 'Yaroslav',
            'privacy-title': 'Privacy Policy',
            'privacy-subtitle': 'We care about your privacy and data security.',
            'privacy-heading1': 'Data Collection and Use',
            'privacy-p1': 'We only collect data necessary to provide quality service, such as your contact information when you contact us.',
            'privacy-heading2': 'Data Protection',
            'privacy-p2': 'All your data is securely stored and not transferred to third parties without your consent.',
            'privacy-heading3': 'Your Rights',
            'privacy-p3': 'You have the right to know what data we store, correct it, or request its deletion. To do this, contact us by email at',
            'privacy-heading4': 'Changes to the Policy',
            'privacy-p4': 'We may update this privacy policy. All changes will be published on this page.',
            'footer-text': '&copy; 2025 JORS Band. All rights reserved. | <a href="privacy.html">Privacy Policy</a>',
            'band-info-oleksandr': 'Oleksandr is the rhythm guitarist and co-founder. His riffs provide a solid foundation for our sound.',
            'band-info-david': 'David is the lead guitarist and one of the founders. His virtuosic solos cut through the air, delivering unforgettable emotions.',
            'band-info-yaroslav': 'Yaroslav is our powerful drummer. His energetic rhythms hold the whole band together and electrify the audience.',
            'events-title': 'Upcoming Events',
            'event1-title': 'Yuvileinyi Stadium',
            'event1-date': '12.08.2025 at 17:00',
            'event1-entry': 'Free admission',
            'event2-title': 'BunkerPub',
            'event2-date': '15.08.2025',
            'event2-entry': 'Reservation required',
            'views': 'Views'
        }
    };

    // Дані для галереї зображень
    const images = [
        "images/band1.jpg",
        "images/band2.jpg",
        "images/band3.jpg",
        "images/band4.jpg"
    ];

    // Дані для каруселі учасників
    const bandImages = [
        { src: "images/bandor.JPG", id: "oleksandr" },
        { src: "images/bandd.JPG", id: "david" },
        { src: "images/bandy.JPG", id: "yaroslav" }
    ];

    // Функція для встановлення мови
    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (key === 'footer-text') {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        const bandImageElement = document.getElementById("band-image");
        const bandInfoTextElement = document.getElementById("band-info-text");
        if (bandImageElement && bandInfoTextElement) {
            const currentImageFileName = bandImageElement.src.split('/').pop();
            const currentBandMember = bandImages.find(member => member.src.includes(currentImageFileName));
            
            if (currentBandMember) {
                bandInfoTextElement.textContent = translations[lang][`band-info-${currentBandMember.id}`];
            } else {
                if (!bandImages.some(member => bandImageElement.src.includes(member.src))) {
                     bandImageElement.src = bandImages[0].src;
                     bandInfoTextElement.textContent = translations[lang][`band-info-${bandImages[0].id}`];
                }
            }
        }

        const countdownLabels = document.querySelectorAll('.countdown-label');
        countdownLabels.forEach(label => {
            const key = label.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                label.textContent = translations[lang][key];
            }
        });

        const musicTitleElement = document.querySelector('title[data-key="music"]');
        if (musicTitleElement) {
            musicTitleElement.textContent = translations[lang]['music'];
        }
    };

    // Ініціалізація мови та теми при завантаженні сторінки
    const savedLang = localStorage.getItem('lang') || 'uk';
    setLanguage(savedLang);
    document.body.classList.add('dark-theme');

    // Перемикач мови
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
        langToggleBtn.textContent = savedLang.toUpperCase();
        langToggleBtn.addEventListener('click', () => {
            const currentLang = localStorage.getItem('lang') || 'uk';
            const newLang = currentLang === 'uk' ? 'en' : 'uk';
            setLanguage(newLang);
            langToggleBtn.textContent = newLang.toUpperCase();
        });
    }

    // Мобільне меню (гамбургер)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
        });

        document.querySelectorAll('.navigation-menu a').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Логіка Галереї зображень
    let currentImageIndex = 0;
    const galleryImage = document.getElementById("gallery-image");
    const galleryPrevButton = document.querySelector(".gallery .prev-button");
    const galleryNextButton = document.querySelector(".gallery .next-button");

    if (galleryImage) {
        const updateGalleryImage = () => {
            galleryImage.classList.add('fade-out');
            setTimeout(() => {
                galleryImage.src = images[currentImageIndex];
                galleryImage.classList.remove('fade-out');
                galleryImage.classList.add('fade-in');
            }, 300);

            galleryImage.addEventListener('animationend', function handler() {
                galleryImage.classList.remove('fade-in');
                galleryImage.removeEventListener('animationend', handler);
            });
        };

        if (galleryPrevButton) {
            galleryPrevButton.addEventListener("click", () => {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateGalleryImage();
            });
        }
        if (galleryNextButton) {
            galleryNextButton.addEventListener("click", () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateGalleryImage();
            });
        }
        updateGalleryImage();
    }

    // Карусель учасників - Логіка
    let currentIndex = 0;
    const bandImageElement = document.getElementById("band-image");
    const bandInfoTextElement = document.getElementById("band-info-text");

    if (bandImageElement && bandInfoTextElement) {
        const updateCarousel = () => {
            bandImageElement.classList.add('fade-out');
            setTimeout(() => {
                bandImageElement.src = bandImages[currentIndex].src;
                const currentLang = localStorage.getItem('lang') || 'uk';
                bandInfoTextElement.textContent = translations[currentLang][`band-info-${bandImages[currentIndex].id}`];
                bandImageElement.classList.remove('fade-out');
                bandImageElement.classList.add('fade-in');
            }, 300);

            bandImageElement.addEventListener('animationend', function handler() {
                bandImageElement.classList.remove('fade-in');
                bandImageElement.removeEventListener('animationend', handler);
            });
        };

        const prevBandButton = document.querySelector(".band-carousel .prev-button");
        const nextBandButton = document.querySelector(".band-carousel .next-button");

        if (prevBandButton) {
            prevBandButton.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + bandImages.length) % bandImages.length;
                updateCarousel();
            });
        }
        if (nextBandButton) {
            nextBandButton.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % bandImages.length;
                updateCarousel();
            });
        }
        if (bandImageElement.src.includes("bando.jpg")) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    // Логіка таймера зворотного відліку
    const countdownDate = new Date("Aug 15, 2025 00:00:00").getTime();
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysSpan = document.getElementById("days");
        const hoursSpan = document.getElementById("hours");
        const minutesSpan = document.getElementById("minutes");
        const secondsSpan = document.getElementById("seconds");

        if (daysSpan) daysSpan.textContent = String(days).padStart(2, '0');
        if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, '0');
        if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, '0');
        if (secondsSpan) secondsSpan.textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            const albumAnnouncement = document.querySelector('.album-announcement');
            if (albumAnnouncement) {
                albumAnnouncement.textContent = "Альбом HOPEKILLER вже вийшов!";
            }
            if (daysSpan) daysSpan.textContent = "00";
            if (hoursSpan) hoursSpan.textContent = "00";
            if (minutesSpan) minutesSpan.textContent = "00";
            if (secondsSpan) secondsSpan.textContent = "00";
        }
    };

    let countdownInterval;
    if (window.location.pathname.includes('music.html')) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Логіка каруселі подій
    const eventSlides = document.querySelectorAll(".event-slide");
    if (eventSlides.length > 0) {
        let currentEventIndex = 0;
        const prevEventButton = document.querySelector(".prev-event-button");
        const nextEventButton = document.querySelector(".next-event-button");

        const showEventSlide = (index) => {
            eventSlides.forEach((slide, i) => {
                slide.classList.remove("active-slide");
                if (i === index) {
                    slide.classList.add("active-slide");
                }
            });
        };

        prevEventButton.addEventListener("click", () => {
            currentEventIndex = (currentEventIndex - 1 + eventSlides.length) % eventSlides.length;
            showEventSlide(currentEventIndex);
        });

        nextEventButton.addEventListener("click", () => {
            currentEventIndex = (currentEventIndex + 1) % eventSlides.length;
            showEventSlide(currentEventIndex);
        });

        showEventSlide(currentEventIndex); // Показати перший слайд
    }
});
