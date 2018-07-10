$(document).ready(function(){

  $('#phone').mask("(999) 999-99-99");

   //var glabal_flag_for_counter = true;


    var win = $(window);
    var scrFunc = function () {
        var t = win.scrollTop(),
            e = win.height();
        $("[data-anim], .block-1, .header, .double-nav, .about, .direction, .loyalty-content, .tabs-container, .industry, .advantages, .footer").each(function (n, i) {
            var r = $(i).offset().top,
                s = t + .9 * e;
            s > r ? $(i).attr("data-anim", "true") : true;
        })
    }
    scrFunc();

    $(window).scroll(function () {
        scrFunc();
    });

    var $name = $('#name'),
        $phone = $('#phone'),
        $form = $('.form-contacts');

    $form.on('submit', function(e) {
      e.preventDefault();


      if($name.val() == '') {
          $name.parent().addClass('has-error');
          return false;
      }

      if($phone.val().length < 15 || $phone.val().indexOf('_') != -1) {
        $phone.parent().addClass('has-error');
        return false;
      }

      $.ajax({
        type: "POST",
        async: false,
        url: "hendler.php",
        data: $form.serialize(),
        dataType: "html",
        success: function(data) {
          $('#call').modal('hide');
          $form.trigger( 'reset');
          $('#thx').modal('show');
        }
      });

    });
});