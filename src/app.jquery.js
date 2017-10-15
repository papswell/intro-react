/**
 * This is a jQuery style for our application. It is imperative: we have
 * to declare how the application works line by line.
 * Even if the code here is not really well written, and could be refactored to
 * remove duplication, we can see that we have to call the same pieces of code
 * at multiple places. (updating counter, toggling alert box, ...). As the
 * application grows and the requirements change, this can become problematic
 * because we have to remember to update every parts of the code.
 *
 *
 * NOTE the wrapper here ensures the DOM is fully loaded before executing any
 * Javascript code.
 * @see https://learn.jquery.com/using-jquery-core/document-ready/
 */
$(function() {

  // NOTE We store jQuery elements inside variables so we don't have to reselect
  // them any time we need them. By convention, to distinguish them froom
  // "normal" variables we preffix the name with $.
  var $button = $('#jquery-app .tweet-button');
  var $textarea = $('#jquery-app textarea');
  var $counter  = $('#jquery-app .counter');
  var $photoButton = $('#jquery-app .photo-button');
  var $alert = $('#jquery-app .alert');

  // internal state
  var isPhotoAdded = false;

  /**
   * NOTE As the code for the alert is needed in multiple places, we wrap it in
   * a helper function.
   *
   * @param  {String} text     the text
   * @param  {Number} maxValue the maximum length allowed
   * @return {jQueryElt}          the html markup to put inside the alert box
   */
  function getAlertContent(text, maxValue) {
    return $(
      '<span>' +
        ' ...' +
        text.slice(maxValue - 10, maxValue) +
        '<strong>' +
          text.slice(maxValue) +
        '</strong>' +
      '</span>');
  }

  // Initial state, button is disabled by default, alert is hidden
  $button.prop('disabled', true);
  $alert.hide();

  // NOTE: Connect an EventListener to the textarea.
  // Any time an event of type "input" happens on the textarea, the callback
  // function is exectued. In this callback function, we can update the
  // application state if needed.
  $textarea.on('input', function() {

    // NOTE: We get the value of the textarea (ie the text that the user has typped)
    // As the "input" event has been triggered on the textarea, the "this"
    // special keyword refers to the textarea itself.
    const value = $(this).val();
    const valueLength = value.length;

    /**
     * Compute the max value and the remaining characters count.
     * NOTE This is a ternary shortcut
     * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/L_op%C3%A9rateur_conditionnel
     */
    const maxValue = isPhotoAdded ? 140 - 23 : 140;
    const remaining = maxValue - valueLength;

    // State of the tweet button
    $button.prop('disabled', (remaining === 140 || remaining < 0));

    // Set the counter value
    $counter.text(remaining);

    // Update the alert box
    if (remaining < 0) {
      $alert
        .show()
        .find('span')
        .html(getAlertContent(value, maxValue))
    } else {
      $alert
        .hide()
        .find('span')
        .html('');
    }

  });

  // Connecting an EventListener on the photo button.
  // Like above, the callback is executed any time the button is clicked.
  $photoButton.on('click', function() {

    // Toggle the variable
    // NOTE: This is the simplest way to inverse a boolean value, a ternary equivalent
    // would be:
    // isPhotoAdded = isPhotoAdded ? false : true
    isPhotoAdded = !isPhotoAdded;

    if (isPhotoAdded) {

      // Compute the max value and the remaining characters count.
      const maxValue = 140 - 23;
      const remaining = maxValue - $textarea.val().length;

      // Set button content
      $(this).text('Photo added :)');
      // Update counter
      $counter.text(remaining);
      // Update tweet button
      $button.prop('disabled', remaining < 0);
      // Update the alert
      if (remaining < 0) {
        $alert.show();
        $alert
          .find('span')
          .html(getAlertContent($textarea.val(), maxValue))
      } else {
        $alert
          .hide()
          .find('span').html('');
      }
    } else {
      // Compute the remaining characters count.
      const remaining = 140 - $textarea.val().length;

      // Set button content
      $(this).text('Add a photo');
      // Update counter
      $counter.text(remaining);
      // Update tweet button (if needed)
      if ($textarea.val().length === 0) {
        $button.prop('disabled', true);
      }
      // Update the alert
      if (remaining < 0) {
        $alert.show()
          .find('span').html(getAlertContent($textarea.val(), 140))
      } else {
        $alert.hide().find('span').html('');
      }
    }
  });
});
