const lightBtn = document.querySelector('.fa-sun');
const darkBtn = document.querySelector('.fa-moon');

const setTheme = (theme)=> {
    localStorage.setItem('theme', theme);
}

const getTheme = () => {
    const cache = localStorage.getItem('theme');
    if (cache){
        return cache;
    } 

    setTheme('light');

    return 'light';
}

const lightMood = () => {
    document.documentElement.setAttribute('data-theme', 'light');
    setTheme('light');
    lightBtn.classList.remove('diactive');
    darkBtn.classList.add('diactive');
}

const darkMood = () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    setTheme('dark');
    lightBtn.classList.add('diactive');
    darkBtn.classList.remove('diactive');
}

let theme = getTheme();

lightBtn.addEventListener('click', lightMood);
darkBtn.addEventListener('click', darkMood);