  const mim = document.querySelector('.mim');
  const images = mim.querySelectorAll('img');

  const track = document.createElement('div');
  track.classList.add('mim-track');
  images.forEach(img => track.appendChild(img));
  mim.innerHTML = '';
  mim.appendChild(track);

  let index = 0;

  function showSlide(i) {
    const slideWidth = images[0].clientWidth + 16;
    track.style.transform = `translateX(-${i * slideWidth}px)`;
  }

  function autoSlide() {
    index = (index + 1) % images.length;
    showSlide(index);
  }

  let interval = setInterval(autoSlide, 5000); 

  let isDown = false;
  let startX;
  let scrollLeft;

  mim.addEventListener('mousedown', (e) => {
    isDown = true;
    mim.classList.add('active');
    startX = e.pageX - mim.offsetLeft;
    scrollLeft = mim.scrollLeft;
    clearInterval(interval);
  });

  mim.addEventListener('mouseleave', () => {
    isDown = false;
    mim.classList.remove('active');
    interval = setInterval(autoSlide, 5000);
  });

  mim.addEventListener('mouseup', () => {
    isDown = false;
    mim.classList.remove('active');
    interval = setInterval(autoSlide, 5000);
  });

  mim.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - mim.offsetLeft;
    const walk = (x - startX) * 2;
    mim.scrollLeft = scrollLeft - walk;
  });
