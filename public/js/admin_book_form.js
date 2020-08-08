$(document).ready(() => {
  $(document).on("keypress", "#tags_input *", function(event) {
    if (event.key == "Enter") {
      event.preventDefault();
    }
  });

  $('.input-group.date').datepicker({
    todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true
  });
  var $image = $(".image-crop > img");
  var $cropped = $($image).cropper({
    aspectRatio: 1.618,
    preview: ".img-preview",
    done: function(data) {
      console.log('cool');
      console.log('croppped:', data);
      // Output the result data for cropping image.
    }
  });

  var $inputImage = $("#inputImage");
  if (window.FileReader) {
    $inputImage.change(function() {
      var fileReader = new FileReader(),
        files = this.files,
        file;

      console.log(files);
      if (!files.length) {
        return;
      }

      file = files[0];
      console.log(file);
      if (/^image\/\w+$/.test(file.type)) {
        fileReader.readAsDataURL(file);
        fileReader.onload = function() {
          console.log($inputImage.val());
          // $inputImage.val("");
          $image.cropper("reset", true).cropper("replace", this.result);
        };
      } else {
        showMessage("Please choose an image file.");
      }
    });
  } else {
    $inputImage.addClass("hide");
  }

  $("#zoomIn").click(function() {
    $image.cropper("zoom", 0.1);
  });

  $("#zoomOut").click(function() {
    $image.cropper("zoom", -0.1);
  });

  $("#rotateLeft").click(function() {
    $image.cropper("rotate", 45);
  });

  $("#rotateRight").click(function() {
    $image.cropper("rotate", -45);
  });

  $("#setDrag").click(function() {
    $image.cropper("setDragMode", "crop");
  });
});