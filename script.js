js
// Horizontal "swipe" track for the Work section.
// Touch swipe works natively via CSS scroll-snap. This adds
// mouse-drag support for desktop, plus the arrow buttons.

const track = document.getElementById('workTrack');
const arrows = document.querySelectorAll('.work__arrow');

arrows.forEach((btn) => {
  btn.addEventListener('click', () => {
    const dir = Number(btn.dataset.dir);
    const cardWidth = track.querySelector('.card').getBoundingClientRect().width + 20; // + gap
    track.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  });
});

let isDown = false;
let startX = 0;
let startScroll = 0;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  track.classList.add('is-dragging');
  startX = e.pageX;
  startScroll = track.scrollLeft;
});

window.addEventListener('mouseup', () => {
  isDown = false;
  track.classList.remove('is-dragging');
});

window.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const walk = e.pageX - startX;
  track.scrollLeft = startScroll - walk;
});