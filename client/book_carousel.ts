import $ from "jquery";
import 'slick-carousel'
function setup(){
    const carouselWrappers = $('.book-carousel-wrapper')
    const slickObject = {
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 4,
        appendArrows: carouselWrappers[0],
        prevArrow: `
        <div class="slick-button-wrapper pr-10">
            <button type="button" class="slick-prev">
                <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 31.77L6.87449 18L18 4.23L14.5749 0L0 18L14.5749 36L18 31.77Z" fill="#F08804"/>
                </svg>
            </button>
        </div>`,
        nextArrow: `
        <div class="slick-button-wrapper pl-8">
            <button type="button" class="slick-next">
                <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 31.77L11.1255 18L0 4.23L3.4251 0L18 18L3.4251 36L0 31.77Z" fill="#F08804"/>
                </svg>
            </button>
        </div>`,
        responsive: [
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow:5,
                    slidesToScroll: 5,
                }
            },
        ]
    };
    {
        let i = 0;
        $('.book-carousel').on('init', function(event, slick) {
            i+=1;
            slickObject.appendArrows = carouselWrappers[i];
        });
    }
    $('.book-carousel').slick(slickObject);
}

export default { setup };