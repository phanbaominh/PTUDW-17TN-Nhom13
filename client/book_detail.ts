import $ from 'jquery';
export default function setup(){
    const highlightClass = "book__detail-tab--highlight";
    const contentHiddenClass = "book__detail-content--hidden";
    $(".book__detail-tabs a").on('click', (event) => {
        $(".book__detail-tabs a").removeClass(highlightClass);
        $(event.target).addClass(highlightClass);

        const tabName = event.target.dataset.name;
        $(".book__detail-content > *").toggleClass(contentHiddenClass);
    });
    $(".book__detail-tabs a").first().addClass(highlightClass);
}
