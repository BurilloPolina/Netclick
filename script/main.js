// menu
const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvCardImg = document.querySelectorAll('.tv-card__img');


// open/close menu
hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});   //отслеживает событие

// close left-menu when click on container
document.body.addEventListener('click', (event) => {
    if (!event.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

// 
leftMenu.addEventListener('click', (event) => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu'); //
        hamburger.classList.add('open');
    }
});


//change image
tvCardImg.forEach(card => {
    card.addEventListener('mouseover', () => {
        src = card.getAttribute('src');
        data = card.getAttribute('data-backdrop');
        card.setAttribute('src', data);
        card.setAttribute('data-backdrop', src);    
    });
    card.addEventListener('mouseout', () => {
        src = card.getAttribute('src');
        data = card.getAttribute('data-backdrop');
        card.setAttribute('src', data);
        card.setAttribute('data-backdrop', src);    
    });
});






