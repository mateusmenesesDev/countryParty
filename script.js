const darkMode = document.querySelector('#dark-mode');

darkMode.addEventListener('click', () => {
  document.querySelector('body').classList.toggle('dark-mode');
})
