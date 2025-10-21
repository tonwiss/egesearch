document.addEventListener('DOMContentLoaded', function() {
    const mainTitle = document.getElementById('mainTitle');
    const incomingText = document.getElementById('incomingText');
    const sidePanel = document.getElementById('sidePanel');
    const rightPanel = document.getElementById('rightPanel');
    const chooseBtn = document.getElementById('chooseBtn');
    const achievementButtons = document.getElementById('achievementButtons');
    const directionsList = document.getElementById('directionsList');
    const closeBtn = document.getElementById('closeBtn');

    // Плавное появление
    mainTitle.classList.add('visible');
    incomingText.classList.add('visible');
    setTimeout(() => { sidePanel.classList.add('show'); }, 1000);

    // Открытие панели
    chooseBtn.addEventListener('click', () => {
        rightPanel.classList.toggle('show');
    });

    // Обработка кнопок достижений
    const buttons = document.querySelectorAll('.achieve-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            achievementButtons.style.display = 'none';
            closeBtn.classList.remove('hidden');

            // Если нажали на "Выбрать направление"
            if (btn.textContent.includes('направление')) {
                directionsList.classList.remove('hidden');
                rightPanel.classList.add('expanded');
            }
        });
    });

    // Крестик — вернуть всё
    closeBtn.addEventListener('click', () => {
        achievementButtons.style.display = 'flex';
        closeBtn.classList.add('hidden');
        directionsList.classList.add('hidden');
        rightPanel.classList.remove('expanded');
    });

    // Изменение цвета кнопки направления при клике
    const dirButtons = document.querySelectorAll('.dir-btn');
    dirButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
        });
    });
});