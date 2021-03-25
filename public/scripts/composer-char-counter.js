$(document).ready(function () {
  $("#tweet-text").on('keyup', function () {
    const len = 140 - $(this).val().length;
   $('#counter').text(len);

   if (len < 0) {
     $('#counter').addClass('neg');
   } else {
    $('#counter').removeClass('neg')
   }
  });
});
