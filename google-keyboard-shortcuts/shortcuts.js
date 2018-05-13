(() => {
  const $ = document.querySelector.bind(document);

  class PageNavigator {
    constructor($searchBox, $results, $next, $previous) {
      this.$searchBox = $searchBox;
      this.$results = $results;
      this.$next = $next;
      this.$previous = $previous;
      this.resultIndex = -1;
      this.setUpEventListener();
    }

    get isSearchBoxFocused() {
      return document.activeElement === this.$searchBox;
    }

    previous() {
      this.$previous.click();
    }

    next() {
      this.$next.click();
    }

    selectResult(index) {
      this.$results[index].focus();
    }

    setUpEventListener() {
      document.addEventListener('keydown', event => {
        switch (event.code) {
          case 'Slash':
            if (!this.isSearchBoxFocused) {
              event.preventDefault();
              const length = this.$searchBox.value.length;
              this.$searchBox.setSelectionRange(length, length);
              this.$searchBox.focus();
            }
            break;
          case 'ArrowDown':
          case 'KeyJ':
            if (this.isSearchBoxFocused) {
              return;
            }
            this.resultIndex === this.$results.length - 1
              ? this.next()
              : this.selectResult(++this.resultIndex);
            break;
          case 'ArrowUp':
          case 'KeyK':
            if (this.isSearchBoxFocused) {
              return;
            }
            this.resultIndex > 0
              ? this.selectResult(--this.resultIndex)
              : this.previous();
            break;
          case 'Enter':
            break;
        }
      });
    }
  }

  new PageNavigator(
    // $searchBox,
    $('#lst-ib'),
    // $results,
    [...document.querySelectorAll('.bkWMgd')].reduce(
      ($links, $div) => [
        ...$links,
        // old style results
        ...$div.querySelectorAll('h3.r a'),
        // new style results e.g. stackoverflow results
        ...$div.querySelectorAll('.zjbNbe a'),
      ],
      [],
    ),
    // $next,
    $('#pnnext'),
    // $previous
    $('#pnprev'),
  );
})();
