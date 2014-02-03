(function () {
  var demo = $('#demo');
  var closeBtn = $('#close');
  $('.demo-link').click(function () {
    var $this = $(this);
    var link = $this.data('link');
    var name = $this.data('name');

    var spinner = $this.parents('.panel').find('.spinner');
    spinner.show();

    var iframe = $('#iframe-' + name);
    iframe.attr('src', link);
    iframe.load(function () {
      spinner.hide();
      iframe.show();
      iframe.focus();
    });
  });

  $('#accordion').on('hide.bs.collapse', function (e) {
    var iframe = $(e.target).find('iframe');
    iframe.attr('src', '');
    iframe.hide();
  });
})();
