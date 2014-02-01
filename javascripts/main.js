(function () {
  var demo = $('#demo');
  var closeBtn = $('#close');
  $('.demo-link').click(function () {
    demo.attr('src', $(this).data('link'));
    demo.show();
    closeBtn.show();
  });

  document.body.onkeyup = function (e) {
    console.log(e.keyCode);
    if (e.keyCode === 27) {
      demo.attr('src', '_blank');
      closeBtn.hide();
      demo.hide();
    }
  };

  closeBtn.click(function () {
    demo.attr('src', '_blank');
    closeBtn.hide();
    demo.hide();
  });

})();
