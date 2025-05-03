// Зберігаємо інформацію в localStorage
const systemInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
};

localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

// Відображаємо дані з localStorage у футері
const footerList = document.getElementById('localStorage-data');
const storedInfo = JSON.parse(localStorage.getItem('systemInfo'));

if (storedInfo) {
    for (const key in storedInfo) {
        const li = document.createElement('li');
        li.textContent = `${key}: ${storedInfo[key]}`;
        footerList.appendChild(li);
    }
}

// Отримуємо коментарі з JSONPlaceholder (варіант 11)
fetch('https://jsonplaceholder.typicode.com/posts/11/comments')
    .then(response => response.json())
    .then(comments => {
        const commentsList = document.getElementById('comments-list');
        comments.forEach(comment => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${comment.name}</strong> (${comment.email}):<br>${comment.body}`;
            commentsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error loading comments:', error);
});


// Показати модальне вікно через 1 хвилину
setTimeout(() => {
    const modal = document.getElementById('feedback-modal');
    modal.style.display = 'flex';
}, 60000);

document.addEventListener("DOMContentLoaded", () => {
    // Модальне вікно
    const closeButton = document.querySelector('.close-button');
    const modal = document.getElementById('feedback-modal');

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Тема
    const savedTheme = localStorage.getItem("theme");
    const themeToApply = savedTheme || setThemeByTime();
    applyTheme(themeToApply);

    const checkbox = document.getElementById("theme-checkbox");
    checkbox.addEventListener("change", () => {
        const selectedTheme = checkbox.checked ? "dark" : "light";
        applyTheme(selectedTheme);
    });
});


function applyTheme(theme) {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(theme + "-theme");
    localStorage.setItem("theme", theme);
    document.getElementById("theme-checkbox").checked = theme === "dark";
}

function setThemeByTime() {
    const hour = new Date().getHours();
    return hour >= 7 && hour < 21 ? "light" : "dark";
}

document.addEventListener('click', function (e) {
    const fireworksCount = 20;

    for (let i = 0; i < fireworksCount; i++) {
        const spark = document.createElement('div');
        spark.classList.add('spark');

        const size = Math.random() * 6 + 4;
        const offsetX = (Math.random() - 0.5) * 150;
        const offsetY = (Math.random() - 0.5) * 150;

        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.left = `${e.pageX}px`;
        spark.style.top = `${e.pageY}px`;

        // Рандомний колір
        const colors = ['#ff3f3f', '#ffcc00', '#33cc33', '#3399ff', '#cc33ff'];
        spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Додамо початковий translate для анімації розльоту
        spark.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.5)`;
        spark.style.opacity = '1';

        document.body.appendChild(spark);

        // Анімація затухання
        setTimeout(() => {
            spark.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            spark.style.transform = `translate(${offsetX * 2}px, ${offsetY * 2}px) scale(0)`;
            spark.style.opacity = '0';
        }, 20);

        // Видалити після анімації
        setTimeout(() => {
            spark.remove();
        }, 1000);
    }
});
