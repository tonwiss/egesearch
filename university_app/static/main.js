document.addEventListener('DOMContentLoaded', () => {
    const titleBlock = document.getElementById('titleBlock');
    const leftPanel = document.getElementById('sidePanel');
    const chooseBtn = document.getElementById('choose-btn');
    const rightPanel = document.getElementById('rightPanel');
    const achievementButtons = document.getElementById('achievementButtons');
    const closeBtn = document.getElementById('closeBtn');
    const findBtn = document.getElementById('findBtn');

    // Блоки
    const gtoBlock = document.getElementById('gtoBlock');
    const gtoOptions = document.querySelectorAll('.gto-option');

    const volBlock = document.getElementById('volonteerBlock');
    const volOptions = document.querySelectorAll('.vol-option');
    const volHoursDiv = document.getElementById('volHours');
    const volInput = document.getElementById('volInput');

    const olympBlock = document.getElementById('olympBlock');
    const olympOptions = document.querySelectorAll('.olymp-option');
    const olympFieldsContainer = document.getElementById('olympFieldsContainer');

    const directionsList = document.getElementById('directionsList');
    const dirButtons = document.querySelectorAll('.dir-btn');

    const egeBlock = document.getElementById('egeBlock'); // блок ЕГЭ
    const basicBtn = document.getElementById('basicLevel');
    const profileBtn = document.getElementById('profileLevel');
    const egeInputContainer = document.getElementById('egeInputContainer');
    const otherExamsContainer = document.getElementById('otherExamsContainer');
    const addExamBtn = document.getElementById('addExamBtn');

    // Временная коллекция пользователя
    let userData = {
        "ЕГЭ": { "Математика": null, "Экзамен2": null, "Экзамен3": null, "Экзамен4": null },
        "Олимпиады": [],
        "ГТО": null,
        "Волонтёрство": null,
        "Направление": ""
    };

    // Плавное появление центрального текста и левой плашки
    setTimeout(() => titleBlock.classList.add('visible'), 500);
    setTimeout(() => leftPanel.classList.add('show'), 1000);

    // Центральная кнопка "Выбрать ВУЗ"
    chooseBtn.addEventListener('click', () => rightPanel.classList.toggle('show'));

    // Скрытие всех блоков
    function hideAllBlocks() {
        [gtoBlock, volBlock, olympBlock, directionsList, egeBlock].forEach(el => el.classList.add('hidden'));
    }

    // Кнопки достижений
    document.querySelectorAll('.achieve-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;

            hideAllBlocks();
            achievementButtons.style.display = 'none';
            closeBtn.classList.remove('hidden');
            findBtn.style.display = 'none';

            if(type==="GTO") gtoBlock.classList.remove('hidden');
            if(type==="Volonteer") volBlock.classList.remove('hidden');
            if(type==="Olymp") olympBlock.classList.remove('hidden');
            if(type==="Direction") directionsList.classList.remove('hidden');
            if(type==="EGE") egeBlock.classList.remove('hidden');
        });
    });

    // Крестик возвращает начальное состояние
    closeBtn.addEventListener('click', () => {
        achievementButtons.style.display = 'flex';
        hideAllBlocks();
        closeBtn.classList.add('hidden');
        findBtn.style.display = 'block';

        // Сброс выделений
        document.querySelectorAll('.circle').forEach(c => c.classList.remove('selected'));
        volHoursDiv.classList.add('hidden'); volInput.value="";
        olympFieldsContainer.innerHTML="";
        egeInputContainer.innerHTML="";
        otherExamsContainer.innerHTML="";
    });

    // ГТО
    gtoOptions.forEach(option => {
        option.addEventListener('click', () => {
            gtoOptions.forEach(o=>o.classList.remove('selected'));
            option.classList.add('selected');
            userData["ГТО"]=option.dataset.value;
        });
    });

    // Волонтёрство
    volOptions.forEach(option => {
        option.addEventListener('click', () => {
            volOptions.forEach(o=>o.classList.remove('selected'));
            option.classList.add('selected');
            if(option.dataset.value==="Да") volHoursDiv.classList.remove('hidden');
            else { volHoursDiv.classList.add('hidden'); volInput.value=""; userData["Волонтёрство"]=0; }
        });
    });
    volInput.addEventListener('input',()=>{ 
        const h=parseInt(volInput.value);
        userData["Волонтёрство"] = !isNaN(h) ? h : null; 
    });

    // Олимпиады
    olympOptions.forEach(option=>{
        option.addEventListener('click',()=>{
            olympOptions.forEach(o=>o.classList.remove('selected'));
            option.classList.add('selected');
            if(option.dataset.value==="Да"){
                olympFieldsContainer.classList.remove('hidden');
                if(olympFieldsContainer.children.length===0) addOlympEntry();
            } else {
                olympFieldsContainer.classList.add('hidden'); 
                olympFieldsContainer.innerHTML=""; 
                userData["Олимпиады"]=[];
            }
        });
    });

    function addOlympEntry(){
        const div = document.createElement('div');
        div.className = 'olymp-entry';
        div.innerHTML = `
            <input type="text" placeholder="Название Олимпиады">
            <input type="text" placeholder="Результат">
        `;
        olympFieldsContainer.appendChild(div);
    }

    olympFieldsContainer.addEventListener('input', ()=>{
        const entries = [];
        olympFieldsContainer.querySelectorAll('.olymp-entry').forEach(div=>{
            const name = div.children[0].value.trim();
            const result = div.children[1].value.trim();
            if(name && result) entries.push({[name]: result});
        });
        userData["Олимпиады"] = entries;
    });

    // Направления
    dirButtons.forEach(button => {
        button.addEventListener('click', ()=>{
            dirButtons.forEach(b=>b.classList.remove('selected'));
            button.classList.add('selected');
            userData["Направление"]=button.innerText.trim();
        });
    });

    // ЕГЭ: базовый / профильный уровень
    basicBtn.addEventListener('click',()=>{
        egeInputContainer.innerHTML = `<input type="number" placeholder="Введите оценку (2-5)">`;
        const input = egeInputContainer.querySelector('input');
        input.addEventListener('input',()=>{ 
            const val=parseInt(input.value);
            userData["ЕГЭ"]["Математика"] = !isNaN(val) ? val : null;
        });
    });

    profileBtn.addEventListener('click',()=>{
        egeInputContainer.innerHTML = `<input type="number" placeholder="Введите балл профиля">`;
        const input = egeInputContainer.querySelector('input');
        input.addEventListener('input',()=>{ 
            const val=parseInt(input.value);
            userData["ЕГЭ"]["Математика"] = !isNaN(val) ? val : null;
        });
    });

    // Прочие экзамены с кнопкой "Добавить"
    addExamBtn.addEventListener('click',()=>{
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="text" placeholder="Название экзамена">
            <input type="number" placeholder="Баллы">
        `;
        otherExamsContainer.appendChild(div);
    });

    window.userData = userData;
});