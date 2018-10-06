(() => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

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
              const value = this.$searchBox.value;
              if (!!value && value[value.length - 1] !== ' ') {
                this.$searchBox.value += ' ';
              }
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
    [...document.querySelectorAll('div.bkWMgd, div.card-section')].reduce(
      ($links, $div) => [
        ...$links,
        // regular results and childs
        ...$div.querySelectorAll('.r a:not([id]):not([class=fl])'),
        // cards
        ...$div.querySelectorAll('g-inner-card a'),
        // bottom links
        ...$div.querySelectorAll('.brs_col a'),
      ],
      [],
    ),
    // $next,
    $('#pnnext'),
    // $previous
    $('#pnprev'),
  );
})();
