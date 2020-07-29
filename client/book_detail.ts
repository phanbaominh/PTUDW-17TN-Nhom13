import $ from "jquery";
import "./global";

function setupBookDetail() {
  const highlightClass = "book__detail-tab--highlight";
  const contentHiddenClass = "book__detail-content--hidden";
  let lastTab = $(".book__detail-tabs a").first();
  $(".book__detail-tabs a").on("click", (event) => {
    const target = $(event.target);
    if (lastTab.is(target)) return;
    lastTab = target;

    $(".book__detail-tabs a").removeClass(highlightClass);
    target.addClass(highlightClass);
    $(".book__detail-content > *").toggleClass(contentHiddenClass);
  });
  $(".book__detail-tabs a").first().addClass(highlightClass);
}

function setupShowMoreButton(): void {
  $(".book__comment__more-button").on("click", (event) => {
    const showMoreButton = $(event.target);
    const commentId = showMoreButton.data('id');
    //const bookId = showMoreButton.data('book-id');
    let buttonText = "Xem trả lời";
    const replySection = showMoreButton
      .closest(".book__comment")
      .children(".book__comment__content")
      .children(".book__comment__replies");
    replySection.toggleClass("hidden");
    if (!replySection.hasClass("hidden")) {
      buttonText = "Ẩn trả lời";
      $.get(`/comments/${commentId}/replies`, (data) => {
        replySection.html(data);
        showMoreButton.text(buttonText);
      })
    } else {
      showMoreButton.text(buttonText);
    }
    
    // replySection.toggleClass("hidden");
    // if (!replySection.hasClass("hidden")) buttonText = "Ẩn trả lời";
    // showMoreButton.text(buttonText);
  });
}

function autoExpand(field: HTMLElement) {
  field.style.height = "inherit";
  var height = field.scrollHeight;
  $(field).innerHeight(height + "px");
}

function setupTextArea(textarea: JQuery<HTMLTextAreaElement>) {
  textarea.on("input", (event) => {
    autoExpand(event.target);
  });
}

function setupReplyButton() {
  $(".book__comment__reply-button").click(function (event) {
    if (!window.__USER__) {
      location.href = "/login";
      return;
    }
    let container = $(event.target)
      .closest(".book__comment__content")
      .find("> .book__comment-form--wrapper");
    let commentFormHTML = $("#comment-form-tpl").html();
    container.html(commentFormHTML);

    setupTextArea($(container).find("textarea"));
    container.find("button[type='reset']").click(function () {
      container.html("");
    });
  });
}

export default function setup(): void {
  setupBookDetail();
  setupShowMoreButton();
  setupReplyButton();

  // Initialise root comment form
  setupTextArea($(".book__comment-form-container textarea"));
}
