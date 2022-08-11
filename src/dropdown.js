(function() {
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const selected = dropdown.querySelector('.dropdown__selection')
    const navButtons = dropdown.querySelectorAll('a')
    
    selected.addEventListener('click', function() {
      selected.closest('.dropdown').classList.toggle('closed')
    })

    navButtons.forEach(navButton => {
      navButton.addEventListener('click', function() {
        selected.textContent = this.textContent
      })
    })
  })

  function initDropStatus(e) {
    const $allDropBox = document.querySelectorAll('.dropdown');

    $allDropBox.forEach(el => {
      if(e.target.parentNode !== el) {

        el.classList.add('closed');
      }
    });
  }

  document.body.addEventListener('click', initDropStatus);
})()