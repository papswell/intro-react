$(function() {

  var $button = $('#jquery-app .tweet-button');
  var $textarea = $('#jquery-app textarea');
  var $counter  = $('#jquery-app .counter');
  var $photoButton = $('#jquery-app .photo-button');

  var isPhotoAdded = false;

  // Initial state, button is disabled by default
  $button.prop('disabled', true);

  // Event listener, we update the button state if needed
  $textarea.on('input', function() {
    const value = $(this).val();
    const valueLength = value.length;

    let remaining = 140 - valueLength;
    if (isPhotoAdded) {
      remaining -= 23;
    }

    // State of the tweet button
    $button.prop('disabled', (!valueLength || remaining < 0) && !isPhotoAdded);

    // Set the counter value
    $counter.text(remaining);

  });

  $photoButton.on('click', function() {

    // Toggle the variable
    isPhotoAdded = !isPhotoAdded;

    // Update the app
    if (isPhotoAdded) {
      // Set button content
      $(this).text('Photo added :)');
      // Update counter
      $counter.text(140 - $textarea.val().length - 23);
      // Update tweet button
      $button.prop('disabled', false);
    } else {
      // Set button content
      $(this).text('Add a photo');
      // Update counter
      $counter.text(140 - $textarea.val().length);
      // Update tweet button (if needed)
      if ($textarea.val().length === 0) {
        $button.prop('disabled', true);
      }
    }
  });
});
