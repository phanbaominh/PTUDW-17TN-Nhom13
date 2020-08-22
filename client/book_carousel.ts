import $ from "jquery";
import "slick-carousel";

function setup() {
  const slickObject = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };
  $(".book-carousel").on("init", function (event, slick) {
    const carousel = $(event.target);
    carousel
      .parent()
      .find(".slick-next")
      .on("click", () => {
        carousel.slick("slickNext");
      });
    carousel
      .parent()
      .find(".slick-prev")
      .on("click", () => {
        carousel.slick("slickPrev");
      });
  });
  $(".book-carousel").slick(slickObject);
}

export default { setup };
