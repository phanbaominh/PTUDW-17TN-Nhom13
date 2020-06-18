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

function setupShowMoreButton(): void {
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

function setupTextArea (): void {
  var autoExpand = function (field: HTMLElement) {
    field.style.height = 'inherit';
    var computed = window.getComputedStyle(field);
    var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + field.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
  
    field.style.height = height + 'px';
  };
  
  $('.book__comment-form-container textarea').on('input', (event) => {
    autoExpand(event.target);
  });
}

function setupReplyButton(): void {
  let replyContainer: JQuery<HTMLElement>;
  $(".book__comment__reply-button").on("click", (event) => {
    if ($(event.target).attr('href')) return;
    const container = $(event.target).closest(".book__comment__content");

    $.ajax({
      url: `/books/${$(event.target).data("id")}/comments/new`,
      method: 'POST',
      success: (data) => {
        if (replyContainer) {
          replyContainer.html(data);
          replyContainer.appendTo(container);
        } else {
          $(data).appendTo(container);
          replyContainer = container
            .children()
            .last()
        }
        
        setupTextArea()
        replyContainer.find('.book__comment-form__cancel-button').on('click', () => {
          replyContainer.remove();
        });
      },
      error: () => {
        //TODO: handle comment form ajax error
      },
    });
  });
}

export default function setup(): void {
  setupBookDetail();
  setupShowMoreButton();
  setupReplyButton();
  setupTextArea();
}
