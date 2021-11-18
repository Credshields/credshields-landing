$(function(){
	/* all slider start */
    $('.company_sliders').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
    });

    $("#clsoe").click(function(){
        $(".announcment_wrap").hide();
      });

    $("#clsee").click(function(){
        $(".cookies_section").hide();
      });

    $("#clsee2").click(function(){
        $(".cookies_section").hide();
      });
});