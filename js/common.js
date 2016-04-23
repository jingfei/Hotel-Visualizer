(function() {


   var path = window.location.pathname.split('/')[1];
   var isMobile = $(window).width() < 768;

   switch(path) {

    case 'about':
     $('.navbar-nav > li:nth-child(2) a').addClass('active');
     break;

    case 'team':
     $('.navbar-nav > li:nth-child(3) .nav-text').addClass('active');
     break;

    case 'sponsor':
     $('.navbar-nav > li:nth-child(4) a').addClass('active');
     break;

    case '2016conf':
     $('.navbar-nav > li:nth-child(5) .nav-text').addClass('active');
     break;

//    case 'project':
//     $('.navbar-nav > li:nth-child(5) a').addClass('active');
//     break;

    case 'report':
     $('.navbar-nav > li:nth-child(6) a').addClass('active');
     break;

    case 'blog':
     $('.navbar-nav > li:nth-child(7) a').addClass('active');
     break;

    default:
     $('.navbar-nav > li:nth-child(1) a').addClass('active');
     break;

   }


  $(window).on('scroll', function (e){
    if ($(this).scrollTop() < 30) {
      $('#navbar').removeClass('fixed');

      if (isMobile) {
        $('.navbar-header').removeClass('navbar-fixed-top');
      }
    }
    else {
      $('#navbar').addClass('fixed');

      if (isMobile) {
        $('.navbar-header').addClass('navbar-fixed-top');
      }
    }
  });

  $( window ).resize(function() {
    isMobile = $(window).width() < 768;
    if (!isMobile)
      $('.navbar-header').removeClass('navbar-fixed-top');
  });

})();
