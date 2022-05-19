(() => {
  const textToIgnore = 'Suggested for You';
  const rgx = new RegExp(textToIgnore, 'i');

  document.addEventListener('scroll', () =>
    document.querySelectorAll('div[data-pagelet="FeedUnit_{n}"]')
      .forEach($div => $div.innerHTML.match(rgx) && ($div.innerHTML = '')));
})();
