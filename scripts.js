document.addEventListener("DOMContentLoaded", () => {
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
            'music-subtitle': 'Слухайте наші треки тут!',
            'contacts-title': 'Контакти',
            'contacts-email': 'Електронна пошта',
            'instagram-title': 'Instagram',
            'instagram-group': 'Група',
            'instagram-david': 'Давид',
            'instagram-oleksandr': 'Олександр',
            'instagram-orest': 'Орест',
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
            'band-info-orest': 'Орест — басист, чиї глибокі та насичені басові лінії додають потужності та об\'єму нашій музиці.',
            'track1': 'Метал 1',
            'track2': 'Метал 2',
            'track3': 'Метал 3',
            'track4': 'Метал 4',
            'track5': 'Метал 5',
            'track6': 'Метал 6',
            'audio-not-supported': 'Ваш браузер не підтримує елемент <code>audio</code>.'
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
            'music-subtitle': 'Listen to our tracks here!',
            'contacts-title': 'Contacts',
            'contacts-email': 'Email',
            'instagram-title': 'Instagram',
            'instagram-group': 'Group',
            'instagram-david': 'David',
            'instagram-oleksandr': 'Oleksandr',
            'instagram-orest': 'Orest',
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
            'band-info-orest': 'Orest is the bassist, whose deep and rich bass lines add power and volume to our music.',
            'track1': 'Metal 1',
            'track2': 'Metal 2',
            'track3': 'Metal 3',
            'track4': 'Metal 4',
            'track5': 'Metal 5',
            'track6': 'Metal 6',
            'audio-not-supported': 'Your browser does not support the <code>audio</code> element.'
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
        { src: "images/bandor.jpg", id: "oleksandr" }, // Олександр - ритм-гітарист
        { src: "images/bandd.jpg", id: "david" },      // Давид - соло-гітарист
        { src: "images/bandy.jpg", id: "yaroslav" },   // Ярослав - барабанщик
        { src: "images/bando.jpg", id: "orest" }       // Орест - басист
    ];

    // Функція для встановлення мови
    const setLanguage = (lang) => {
        document.documentElement.lang = lang; // Встановлюємо атрибут lang для <html>
        localStorage.setItem('lang', lang); // Зберігаємо обрану мову

        // Оновлення тексту в навігації та інших елементах з data-key
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                // Перевіряємо, чи це посилання футера, щоб зберегти теги <a>
                if (key === 'footer-text') {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Оновлення інформації про учасників гурту в каруселі
        const bandImageElement = document.getElementById("band-image");
        const bandInfoTextElement = document.getElementById("band-info-text");
        if (bandImageElement && bandInfoTextElement) {
            // Отримуємо назву файлу зображення для пошуку відповідного члена
            const currentImageFileName = bandImageElement.src.split('/').pop();
            const currentBandMember = bandImages.find(member => member.src.includes(currentImageFileName));
            
            if (currentBandMember) {
                bandInfoTextElement.textContent = translations[lang][`band-info-${currentBandMember.id}`];
            } else {
                console.warn("Could not find current band member for translation. Image src:", bandImageElement.src);
            }
        }

        // Оновлення назв треків
        document.querySelectorAll('.track-button').forEach(button => {
            const key = button.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                button.textContent = translations[lang][key];
            }
        });

        // Оновлення повідомлення про непідтримуваний аудіо елемент
        const audioPlayer = document.getElementById('audio-player');
        if (audioPlayer) {
            let audioFallbackSpan = audioPlayer.querySelector('span[data-key="audio-not-supported"]');
            if (audioFallbackSpan) {
                audioFallbackSpan.textContent = translations[lang]['audio-not-supported'];
            }
        }
    };

    // Функція для встановлення теми
    const setTheme = (theme) => {
        document.body.classList.remove('light-theme', 'dark-theme'); // Видаляємо всі теми
        document.body.classList.add(`${theme}-theme`); // Додаємо вибрану тему
        localStorage.setItem('theme', theme); // Зберігаємо обрану тему
        // Оновлюємо текст на кнопці теми
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'dark' ? 'Light' : 'Dark';
        }
    };

    // Ініціалізація мови та теми при завантаженні сторінки
    const savedLang = localStorage.getItem('lang') || 'uk'; // За замовчуванням українська
    setLanguage(savedLang);

    const savedTheme = localStorage.getItem('theme') || 'dark'; // За замовчуванням темна тема
    setTheme(savedTheme);


    // Перемикач мови
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
        langToggleBtn.textContent = savedLang.toUpperCase(); // Відображаємо поточну мову
        langToggleBtn.addEventListener('click', () => {
            const currentLang = localStorage.getItem('lang') || 'uk';
            const newLang = currentLang === 'uk' ? 'en' : 'uk';
            setLanguage(newLang);
            langToggleBtn.textContent = newLang.toUpperCase(); // Оновлюємо текст кнопки
        });
    }

    // Перемикач теми
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.textContent = savedTheme === 'dark' ? 'Light' : 'Dark'; // Відображаємо поточну тему
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }


    // Логіка Галереї зображень
    let currentImageIndex = 0;
    const galleryImage = document.getElementById("gallery-image");
    const galleryPrevButton = document.querySelector(".gallery .prev-button");
    const galleryNextButton = document.querySelector(".gallery .next-button");

    if (galleryImage) {
        const updateGalleryImage = () => {
            // Додаємо клас для анімації зникнення
            galleryImage.classList.add('fade-out');
            setTimeout(() => {
                galleryImage.src = images[currentImageIndex];
                // Видаляємо клас зникнення та додаємо клас появи
                galleryImage.classList.remove('fade-out');
                galleryImage.classList.add('fade-in');
            }, 300); // Час має відповідати тривалості анімації в CSS

            // Видаляємо клас появи після завершення анімації
            galleryImage.addEventListener('animationend', () => {
                galleryImage.classList.remove('fade-in');
            }, { once: true });
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
        updateGalleryImage(); // Ініціалізація першого зображення галереї
    }

    // Аудіоплеєр
    const audioPlayer = document.getElementById("audio-player");
    const trackButtons = document.querySelectorAll(".track-button");

    if (audioPlayer && trackButtons.length > 0) {
        trackButtons.forEach(button => {
            button.addEventListener("click", () => {
                const songSrc = button.getAttribute("data-src");
                audioPlayer.src = songSrc;
                audioPlayer.play();

                trackButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            });
        });
    }

    // Карусель учасників - Логіка
    let currentIndex = 0;

    const bandImageElement = document.getElementById("band-image");
    const bandInfoTextElement = document.getElementById("band-info-text");

    if (bandImageElement && bandInfoTextElement) {
        const updateCarousel = () => {
            // Додаємо клас для анімації зникнення
            bandImageElement.classList.add('fade-out');
            setTimeout(() => {
                bandImageElement.src = bandImages[currentIndex].src;
                const currentLang = localStorage.getItem('lang') || 'uk';
                bandInfoTextElement.textContent = translations[currentLang][`band-info-${bandImages[currentIndex].id}`];
                // Видаляємо клас зникнення та додаємо клас появи
                bandImageElement.classList.remove('fade-out');
                bandImageElement.classList.add('fade-in');
            }, 300); // Час має відповідати тривалості анімації в CSS

            // Видаляємо клас появи після завершення анімації
            bandImageElement.addEventListener('animationend', () => {
                bandImageElement.classList.remove('fade-in');
            }, { once: true });
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

        updateCarousel(); // Initial call to set the first member's info
    }

    // Lazy loading зображень (для головної та інших сторінок з атрибутом data-src)
    const lazyImages = document.querySelectorAll("img[data-src]");

    const loadImage = (image) => {
        image.src = image.getAttribute("data-src");
        image.onload = () => image.removeAttribute("data-src");
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px 50px 0px" });

    lazyImages.forEach(image => imageObserver.observe(image));
});
