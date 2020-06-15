import $ from "jquery";
import 'slick-carousel'
function setup(){
    const slickObject = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };
    $('.book-carousel').on('init', function(event, slick) {
        const carousel = $(event.target);
        carousel.parent().find('.slick-next').on('click', () => {
            carousel.slick('slickNext');
            
        });
        carousel.parent().find('.slick-prev').on('click', () => {
            carousel.slick('slickPrev');
        });
    });
    $('.book-carousel').slick(slickObject);
}

export default { setup };