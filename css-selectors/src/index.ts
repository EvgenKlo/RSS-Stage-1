import './style.scss';

const hamb = document.querySelector('.hamb');

hamb?.addEventListener('click', () => {
  hamb?.classList.toggle('active');
  document.querySelector('.sidebar')?.classList.toggle('open')
})
