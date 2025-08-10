document.addEventListener("DOMContentLoaded", () => {
    // Конфігурація Firebase 
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
        try {
            firebase.initializeApp(firebaseConfig);
            const db = firebase.firestore();
            
            // Функція для підрахунку переглядів
            const incrementViewCount = () => {
                const pageId = window.location.pathname.replace(/[^a-z0-9]/gi, '_') || 'home';
                if (pageId.includes('game')) return; // Не рахувати перегляди гри
                const pageViewsRef = db.collection('page_views').doc(pageId);

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
            
            incrementViewCount();
        } catch (e) {
            console.error("Помилка ініціалізації Firebase. Перевірте конфігурацію.", e);
        }
    }


    // Об'єкт для перекладів
    const translations = {
        'uk': {
            'home': 'Головна',
            'members': 'Учасники',
            'gallery': 'Галерея',
            'music': 'Музика',
            'contacts': 'Контакти',
            'game': 'Гра',
            'hero-title-home': 'Вас вітає JORS Метал Гурт!',
            'hero-subtitle-home': 'Пориньте у світ музики разом із нами.',
            'footer-text': '&copy; 2025 Гурт JORS. Всі права захищено. | <a href="privacy.html">Політика конфіденційності</a>',
            'views': 'Переглядів',
            // Game translations
            'game-title': 'JORS - Гра',
            'score': 'Рахунок',
            'high-score': 'Рекорд',
            'game-over': 'Гру закінчено',
            'restart': 'Спробувати ще',
            'back-to-home': 'На головну'
        },
        'en': {
            'home': 'Home',
            'members': 'Members',
            'gallery': 'Gallery',
            'music': 'Music',
            'contacts': 'Contacts',
            'game': 'Game',
            'hero-title-home': 'Welcome to JORS Metal Band!',
            'hero-subtitle-home': 'Immerse yourself in the world of music with us.',
            'footer-text': '&copy; 2025 JORS Band. All rights reserved. | <a href="privacy.html">Privacy Policy</a>',
            'views': 'Views',
            // Game translations
            'game-title': 'JORS - The Game',
            'score': 'Score',
            'high-score': 'High Score',
            'game-over': 'Game Over',
            'restart': 'Restart',
            'back-to-home': 'Back to Home'
        }
    };

    // Функція для встановлення мови
    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (key.includes('footer-text')) {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    };

    const savedLang = localStorage.getItem('lang') || 'uk';
    setLanguage(savedLang);
    
    if(!document.body.classList.contains('game-page')) {
        document.body.classList.add('dark-theme');
    }

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
    
    // Перехід до гри з логотипу
    const logoLink = document.getElementById('logo-link');
    if (logoLink && document.body.classList.contains('home')) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'game.html';
        });
    }
});
