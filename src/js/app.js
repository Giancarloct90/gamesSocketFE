console.log('hello');

const burger = document.getElementById('burger');
const navBarULinks = document.getElementById('navBarULinks');
const alinks = document.querySelectorAll('ul');
const lis = document.querySelectorAll('li');

burger.addEventListener('click', () => {
    navBarULinks.classList.toggle('navBarAnimation');
    burger.classList.toggle('toggle');
});

// lis.forEach(element => {
//     element.addEventListener('click', () => navBarULinks.classList.remove('navBarAnimation'));
// });