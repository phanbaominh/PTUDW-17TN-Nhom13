import $ from "jquery";

function setup() {
  $(".profile__book-carousel").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    responsive: [
      {
        breakpoint: "1024",
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  $(".profile__book-carousel__slick-arrow.prev").click(function () {
    $(this).siblings(".profile__book-carousel").slick("slickPrev");
  });
  $(".profile__book-carousel__slick-arrow.next").click(function () {
    $(this).siblings(".profile__book-carousel").slick("slickNext");
  });
}

export default { setup };
