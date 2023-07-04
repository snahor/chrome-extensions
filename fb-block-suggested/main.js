(() => {
  const rgx = new RegExp('suggested for you', 'i');

  document.addEventListener('scroll', () => {
    const divs = document.querySelectorAll('div.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z:not([data-visited])');
    console.debug(`divs matched: ${divs.length}`);

    divs.forEach(div => {
      div.dataset.visited = "1";
      for (let span of div.querySelectorAll('span')) {
        if (span.innerHTML.match(rgx)) {
          // Removing the content may cause an error in the page, hiding it seems safer.
          // div.innerHTML = '';
          div.style.display = 'none';
          return;
        }
      }
    })
  });
})();
