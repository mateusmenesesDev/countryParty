window.onload = () => {
  const darkMode = document.querySelector('#dark-mode-container');
  darkMode.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('dark-mode-background');
    document.querySelector('header').classList.toggle('dark-mode-elements');
    const elements = document.querySelectorAll('.elements');
    for (const element of elements) {
      element.classList.toggle('dark-mode-elements');
    }
  })
};
