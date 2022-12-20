$(function(){

    $('#company_slider_1').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 2000,
      pauseOnHover: true,
      cssEase: 'linear',
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });

    setTimeout(()=>{
      $('#company_slider_2').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 2000,
        pauseOnHover: true,
        cssEase: 'linear',
        arrows: false,
        dots: false,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      });
    }, 1000);

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