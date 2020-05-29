// menu
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
//const API_KEY =
const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvCardImg = document.querySelectorAll('.tv-card__img'),
    tvShowList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal');


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
        console.log(card);   
    });
    card.addEventListener('mouseout', () => {
        src = card.getAttribute('src');
        data = card.getAttribute('data-backdrop');
        card.setAttribute('src', data);
        card.setAttribute('data-backdrop', src);    
    });
});
/*
//change image (var 2)
const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if(card) {
        const img = card.querySelector('.tv-card__img');
        if(img.dataset.backdrop) {
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, im.src]
        }
    }
};


tvShowList.addEventListener('mouseover', changeImage);
tvShowList.addEventListener('mouseout', changeImage);
*/

//open modal window
tvShowList.addEventListener('click', event => {
    const target = event.target;
    const card = target.closest('.tv-card');
    
    if (card) {
        document.body.style.overflow= 'hidden';
        modal.classList.remove('hide');
    }
} );

//close modal
modal.addEventListener('click', event => {
    console.log(event.target.closest('cross'));

    if(event.target.closest('.cross') ||
       event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
});

const DBService = class {
    getData = async (url) => {
        const res = await fetch(url); //делает запрос
        if (res.ok) {
            return res.json();
        }  else {
            throw new Error(`Не удалось получить данные по адресу ${url}`);
        }      
    } 

    getTestData =  () => {
        return  this.getData('test.json');
    }
}


const renderCard = response => {
    console.log(response);
    tvShowList.textContent = '';
    response.results.forEach(item => {
        const { 
            backdrop_path: backdrop, 
            name: title, 
            poster_path: poster, 
            vote_average: vote
            } = item;

        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
      //  const backdropIMG = '';  дз если нет backdrop то не добавляем ничего
        //const voteElem = ''; если нет voteElem то не выводим tv-card__vote

        const card = document.createElement('li');
        card.className = 'tv-shows__item';
        card.innerHTML = `
            <a href="#" class="tv-card">
                <span class="tv-card__vote">${vote}</span>
                <img class="tv-card__img"
                    src="${posterIMG}"
                    data-backdrop="${IMG_URL + backdrop}"
                    alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
            </a>
        `;
        
        tvShowList.append(card);
    });
};

new DBService().getTestData().then(renderCard);



