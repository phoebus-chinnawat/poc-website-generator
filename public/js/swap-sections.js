var el = document.getElementById('sections-container');
var sections = document.querySelectorAll('section');
sections.forEach((section) => {
  section.classList.add('relative');
  const swapHandler = document.createElement('div');
    swapHandler.classList.add('absolute', 'top-1', 'right-1', 'cursor-move');
    swapHandler.innerHTML = `
        <svg class="sort-handler w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
        </svg>
    `;
    section.appendChild(swapHandler);
});
var sortable = Sortable.create(el, {
  animation: 150,
  ghostClass: 'sortable-ghost',
  handle: '.sort-handler',
  onStart: function (evt) {
    console.log('on Start event', evt);
	},
});

// ['h1', 'h2', 'p', 'span', 'strong', 'li'].forEach((item) => {
//   const elements = document.querySelectorAll(item);
//   console.log('elements', elements);
//   elements.forEach((el) => {
//     el.contentEditable = true;
//   });
// })