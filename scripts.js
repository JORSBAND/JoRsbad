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
                        if (doc.exists && doc.data().count) {
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
            
            if (!document.body.classList.contains('game-page')) {
                incrementViewCount();
            }
        } catch (e) {
            console.error("Помилка ініціалізації Firebase. Перевірте конфігурацію.", e);
        }
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

    // Карусель учасників - Логіка
    const bandImageElement = document.getElementById("band-image");
    if (bandImageElement) {
        const bandImages = [
            { src: "images/bandor.JPG", id: "oleksandr" },
            { src: "images/bandd.JPG", id: "david" },
            { src: "images/bandy.JPG", id: "yaroslav" }
        ];
        let currentIndex = 0;
        const bandInfoTextElement = document.getElementById("band-info-text");

        const updateCarousel = () => {
            bandImageElement.src = bandImages[currentIndex].src;
            // Тут можна додати логіку для перекладу тексту, якщо вона потрібна
            // bandInfoTextElement.textContent = translations[currentLang][`band-info-${bandImages[currentIndex].id}`];
        };

        const prevBandButton = document.querySelector(".band-carousel .prev-button");
        const nextBandButton = document.querySelector(".band-carousel .next-button");

        if (prevBandButton && nextBandButton) {
            prevBandButton.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + bandImages.length) % bandImages.length;
                updateCarousel();
            });
            nextBandButton.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % bandImages.length;
                updateCarousel();
            });
        }
        updateCarousel();
    }
});
