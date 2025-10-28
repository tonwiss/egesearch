document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.basis-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = btn.dataset.type;
            const list = document.getElementById(type === 'budget' ? 'budget-list' : 'paid-list');

            // Очистка предыдущего контента
            list.innerHTML = '';

            // Пока данных нет, показываем сообщение
            const message = document.createElement('div');
            message.textContent = "К сожалению, мы не смогли подобрать факультеты под ваши критерии";
            list.appendChild(message);
        });
    });
});