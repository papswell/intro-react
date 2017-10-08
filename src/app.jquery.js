$(function() {

  var $button = $('#jquery-app button');
  var $textarea = $('#jquery-app textarea');
  var $counter  = $('#jquery-app .counter');

  // Initial state, button is disabled by default
  $button.prop('disabled', true);

  // Event listener, we update the button state if needed
  $textarea.on('input', function() {
    const value = $(this).val();
    const valueLength = value.length;
    const remaining = 140 - valueLength;

    // State of the tweet button
    $button.prop('disabled', !valueLength || remaining < 0);

    // Set the counter value
    $counter.text(remaining);

  });
});
