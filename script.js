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


