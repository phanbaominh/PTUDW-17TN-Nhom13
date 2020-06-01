import $ from "jquery";
import 'slick-carousel'
function setup(){
    $('.book-carousel').slick({
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 4,
        appendArrows: `$(this).parent`,
        prevArrow: `
        <div class="slick-button-wrapper">
            <button type="button" class="slick-prev" tabindex="1">
                <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 31.77L6.87449 18L18 4.23L14.5749 0L0 18L14.5749 36L18 31.77Z" fill="#F08804"/>
                </svg>
            </button>
        </div>`,
        nextArrow: `
        <div class="slick-button-wrapper">
            <button type="button" class="slick-next" tabindex="2">
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
    });
}

export default { setup };