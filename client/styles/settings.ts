import $ from "jquery";

function setup() {
  $("#settings__pfp-changer").change(function (e) {
    let files = (e.target as HTMLInputElement).files!;
    if (files.length > 0) {
      let file = files[0];
      let url = URL.createObjectURL(file);
      $("#settings__tmp-pfp").attr("src", url);
      $("#settings__file-name").text(file.name);
    }
  });
}

export default { setup };
