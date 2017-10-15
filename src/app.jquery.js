$(function() {

  var $button = $('#jquery-app .tweet-button');
  var $textarea = $('#jquery-app textarea');
  var $counter  = $('#jquery-app .counter');
  var $photoButton = $('#jquery-app .photo-button');
  var $alert = $('#jquery-app .alert');

  var isPhotoAdded = false;

  function getAlertContent(text, maxValue) {
    return $('<span> ...' + text.slice(maxValue - 10, maxValue) + '<strong>' + text.slice(maxValue)+ '</strong></span>');
  }

  // Initial state, button is disabled by default, alert is hidden
  $button.prop('disabled', true);
  $alert.hide();

  // Event listener, we update the button state if needed
  $textarea.on('input', function() {
    const value = $(this).val();
    const valueLength = value.length;

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

  $photoButton.on('click', function() {

    // Toggle the variable
    isPhotoAdded = !isPhotoAdded;

    if (isPhotoAdded) {

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
