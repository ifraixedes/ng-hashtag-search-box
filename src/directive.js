angular.module('if', [])
.directive('tagSearchBox', function () {
  return {
    restrict: 'E',
    scope: {
      tags: '=',
      onChange: '='
    },
    templateUrl: '../src/template.html',
    link: link
  };

  function link(scope, elem, attrs) {
    var children = elem.children();
    var spanCurrentElem = children[0];
    var inputElem = children[1];

    spanCurrentElem.addEventListener('click', inputElem.focus.bind(inputElem));
    inputElem.addEventListener('keyup', inputOnKeyup);
    init();

    function init() {
      var hashtags = (scope.tags) ? tagsToHashtags(scope.tags) : null;

      if ((hashtags) && (hashtags.length)) {
        spanCurrentElem.textContent = hashtags.join(' ');
        inputElem.setAttribute('placeholder', '');
      } else {
        inputElem.setAttribute('placeholder', attrs.placeholder || '');
      }
    }

    var backspaceCode = 8;
    function inputOnKeyup(evt) {
      if (evt.keyCode === backspaceCode) {
        updateHastagsText({ name: 'remove' });
      } else {
        updateHastagsText({ name: 'add', text: inputElem.value });
      }

      inputElem.value = '';
    }

    var inputHashtagRegExp = /^(\s*)(#+\s*)?#*(\S*)/;
    /**
     * Update text in span and clear the value of input element.
     * `remove` operation only delete the last chacter; if it's needed
     * to remove more than one, then the fuction must be executed as
     * many times as needed.
     *
     * @param {Object} op - The operation to perform
     * @param {string} op.name - The operation name, valid values: add, remove; any
     *          other value it's ignored
     * @param {string} [op.text] - The text to add must exist on 'add' operations;
     *          in 'remove' operations is ignored.
     */
    function updateHastagsText(op) {
      var lastIdx;
      var spanText = spanCurrentElem.textContent;

      inputElem.setAttribute('placeholder', '');

      if (op.name === 'remove') {
        var lastIdx = spanText.length - 1;
        spanText = spanText.substring(0, lastIdx);

        lastIdx--;
        if ((lastIdx >= 0) && ((spanText[lastIdx] === ' ') || (spanText === '#'))) {
          spanText = spanText.substring(0, lastIdx);
        }

        if (spanText === '') {
          inputElem.setAttribute('placeholder', attrs.placeholder);
        }
      } else if (op.name === 'add') {
        var inputHashtag = inputHashtagRegExp.exec(op.text);
        if (!inputHashtag) {
          return;
        }

        // Matches new hashtags; they start with blanks or #
        // contemplating blanks between # and letters
        if ((inputHashtag[1]) || (inputHashtag[2])) {
          // Check that last added character isn't a #
          if (spanText[spanText.length - 1] !== '#') {
            // Exclude # and blanks when there are several
            spanText += ' #';
          }
        } else if (spanText === '') {
          // Treat the first letter
          spanText = '#';
        }

        spanText += inputHashtag[3];
      } else {
        return;
      }

      spanCurrentElem.textContent = spanText;
      setSuggestion(scope.onChange(hashtagsTextToTags(spanText)));
    }

    // This variable is used as state of `setSuggestion` function
    var lastSuggestionCanceller = function () {};
    /**
     * Cancell the suggestion in progress if any and regiester a promise resolver
     * for the one passed as a parameter to render in the input box the suggestion
     * when resolved.
     *
     * @param {Promise} [promise] - Promise which should be resolved with the suggestion.
     *          When it isn't provided only cancel the last suggestion promise in progress.
     */
    function setSuggestion(promise) {
      lastSuggestionCanceller();

      if (!promise) {
        return;
      }

      var cancelled = false;
      promise.then(function (suggestion) {
        if ((cancelled) || (!suggestion)) {
          return;
        }

        inputElem.setAttribute('placeholder', suggestion);
      });

      lastSuggestionCanceller = function () {
        cancelled = true;
      };
    }

    function tagsToHashtags(tags) {
      var hashtags = [];
      tags.forEach(function (t) {
        hashtags.push('#' + t.trim());
      });

      return hashtags;
    }

    var hashtagsTextMatcher = /\s*#(\S+)\s*/g
    function hashtagsTextToTags(hashtagsText) {
      var tags = [];

      while ((match = hashtagsTextMatcher.exec(hashtagsText)) != null) {
        tags.push(match[1]);
      }

      return tags;
    }
  }

});
