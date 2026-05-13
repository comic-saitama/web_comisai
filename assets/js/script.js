document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('.global-nav');

  hamburgerMenu.addEventListener('click', function() {
    hamburgerMenu.classList.toggle('active');
    nav.classList.toggle('active');
  });
});

console.log("Script loaded!");