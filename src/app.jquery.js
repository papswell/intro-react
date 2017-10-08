$(function() {
  var $button = $('#jquery-app button');
  var $textarea = $('#jquery-app textarea');

  // Initial state, button is disabled by default
  $button.prop('disabled', true);

  // Event listener, we update the button state if needed
  $textarea.on('input', function() {
    const value = $(this).val();
    $button.prop('disabled', !value.length);
  });
});
