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

function changeTextDropdown() {
  const btn = document.querySelector('.dropdown button');
  const lis = document.querySelectorAll('.dropdown-item');
  for (let i = 0; i < lis.length; i += 1) {
    lis[i].addEventListener('click', (event) => {
      btn.innerHTML = event.target.innerHTML;
    });
  }
}

changeTextDropdown();