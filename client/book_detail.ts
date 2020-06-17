import $ from "jquery";

function setupBookDetail(): void {
  const highlightClass = "book__detail-tab--highlight";
  const contentHiddenClass = "book__detail-content--hidden";
  $(".book__detail-tabs a").on("click", (event) => {
    $(".book__detail-tabs a").removeClass(highlightClass);
    $(event.target).addClass(highlightClass);

    const tabName = event.target.dataset.name;
    $(".book__detail-content > *").toggleClass(contentHiddenClass);
  });
  $(".book__detail-tabs a").first().addClass(highlightClass);
}

function setupComments(): void {
  $(".book__comment__more-button").on("click", (event) => {
    const showMoreButton = $(event.target);
    let buttonText = "Xem trả lời";
    const replySection = showMoreButton
      .closest(".book__comment")
      .children(".book__comment__content")
      .children(".book__comment__replies");
    replySection.toggleClass("hidden");
    if (!replySection.hasClass("hidden")) buttonText = "Ẩn trả lời";
    showMoreButton.text(buttonText);
  });
}

export default function setup(): void {
  setupBookDetail();
  setupComments();
}
