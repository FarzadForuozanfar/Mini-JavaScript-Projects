const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

const imgMode = (color) => {
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

const darkMode = () => {
    nav.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    textBox.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    imgMode('dark');
}

const lightMode = () => {
    nav.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    textBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    imgMode('light');
}

toggleSwitch.addEventListener('change', (event) => {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkMode();
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        lightMode();
        localStorage.setItem('theme', 'light');
    }
});

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    darkMode();
  }
}
