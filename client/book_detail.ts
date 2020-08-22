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
  $("#book__comment-section").on(
    "click",
    ".book__comment__more-button",
    (event) => {
      const showMoreButton = $(event.target);
      const commentId = showMoreButton.data("id");
      const bookId = showMoreButton.data("book-id");
      const commentCount = showMoreButton.data("count-comment");
      let buttonText = `Xem ${commentCount} câu trả lời`;
      const replySection = showMoreButton
        .closest(".book__comment")
        .children(".book__comment__content")
        .children(".book__comment__replies");
      replySection.toggleClass("hidden");
      if (!replySection.hasClass("hidden")) {
        buttonText = "Ẩn trả lời";
        $.get(`/books/${bookId}/comments/${commentId}/replies`, (data) => {
          replySection.html(data);
          showMoreButton.text(buttonText);
        });
      } else {
        showMoreButton.text(buttonText);
      }
    }
  );
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

function ajaxCreateComment(successCB, form: JQuery<HTMLElement>) {
  const textArea = form.find("textarea");
  const content = textArea.val();
  $.ajax({
    url: form.attr("action"),
    method: "post",
    dataType: "json",
    data: {
      content,
    },
    success: (data) => {
      successCB(data.template);
      window.location.hash = `book__comment__${data.id}`;
      textArea.val("");
    },

    error: (xhr) => {
      const response = JSON.parse(xhr.responseText);
      textArea.append(response.template);
    },
  });
}

function addSubmitListener(form: JQuery<HTMLElement>) {
  form.on("submit", function (event) {
    const form = $(this);
    const successCB = (data) => {
      const commentSection = form.closest(".book__comment__content");
      const replySection = commentSection.find("> .book__comment__replies");
      if (replySection.hasClass("hidden")) {
        const showMoreButton = commentSection.find(
          "> .book__comment_buttons > .book__comment__more-button"
        );
        replySection.toggleClass("hidden");
        showMoreButton.text("Ẩn các trả lời");
      }
      replySection.append(data);
    };

    ajaxCreateComment(successCB, form);
    event.preventDefault();
  });
}

function setupReplyButton() {
  $("#book__comment-section").on(
    "click",
    ".book__comment__reply-button",
    function (event) {
      const parentId = $(event.target).data("id");
      const bookId = $(event.target).data("book-id");
      if (!window.__USER__) {
        location.href = "/login";
        return;
      }
      let container = $(event.target)
        .closest(".book__comment__content")
        .find("> .book__comment-form--wrapper");
      let commentFormHTML = $("#comment-form-tpl").html();
      container.html(commentFormHTML);
      const form = container.find("form");
      form.attr("action", `/books/${bookId}/comments/${parentId}/create`);
      addSubmitListener(form);
      setupTextArea($(container).find("textarea"));
      container.find("button[type='reset']").click(function () {
        container.html("");
      });
    }
  );
}

function setupCommentSubmitButton() {
  $("#book__comment-wrapper form")
    .first()
    .on("submit", function (event) {
      const form = $(this);
      const successCB = (data) => {
        $("#book__comment-section").append(data);
      };
      ajaxCreateComment(successCB, form);
      event.preventDefault();
    });
}

function setupBorrowButton() {
  $(".book__borrow-button-wrapper").on("submit", "form", function (event) {
    const form = $(this);
    const buttonWrapper = form.parent();
    const bookCountDiv = buttonWrapper.parent().find("#book__book-count");
    $.post({
      url: form.attr("action"),
      dataType: "json",
      method: "post",
      success: (data) => {
        buttonWrapper.html(data.template);
        bookCountDiv.text(`Số lượng: ${data.bookCount}`);
      },
      error: (xhr) => {
        const response = JSON.parse(xhr.responseText);
        buttonWrapper.append(response.template);
      },
    });
    event.preventDefault();
  });
}

function setupLoveButton() {
  $(".book__love-button-wrapper").on("submit", "form", function (event) {
    const form = $(this);
    const buttonWrapper = form.parent();
    $.post({
      url: form.attr("action"),
      dataType: "json",
      method: "post",
      success: (data) => {
        buttonWrapper.html(data.template);
      },
      error: (xhr) => {
        const response = JSON.parse(xhr.responseText);
        buttonWrapper.append(response.template);
      },
    });
    event.preventDefault();
  });
}
export default function setup(): void {
  setupBookDetail();
  setupShowMoreButton();
  setupReplyButton();
  setupCommentSubmitButton();
  setupBorrowButton();
  setupLoveButton();
  // Initialise root comment form
  setupTextArea($(".book__comment-form-container textarea"));
}
