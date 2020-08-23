$(document).ready(() => {
  $(document).on("keypress", "#tags_input *", function (event) {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  });

  // $(".input-group.date").datepicker({
  //   todayBtn: "linked",
  //   keyboardNavigation: false,
  //   forceParse: false,
  //   calendarWeeks: true,
  //   autoclose: true,
  // });

  $("#book-cover-input").change(function (e) {
    let files = e.target.files;
    if (files.length > 0) {
      let url = URL.createObjectURL(files[0]);
      $("#book-cover-preview").removeClass("hidden").addClass("grid").find("img").attr("src", url);
    } else {
      let src = $("#book-cover-preview").data("src");
      if (!src) {
        $("#book-cover-preview").removeClass("grid").addClass("hidden");
      } else {
        $("#book-cover-preview").find("img").attr("src", src);
      }
    }
  });
});
