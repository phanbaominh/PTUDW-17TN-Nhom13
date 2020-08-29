import $ from "jquery";
import "./global";

/**
 * Setup listeners for handling updating profile picture
 */
function setup() {
  let isSettingNew = false;
  let currentPfp = window.__USER__?.profilePicture;

  function renderChanger() {
    if (isSettingNew) {
      $("#pfp-changer-actions").removeClass("hidden");
    } else {
      $("#pfp-changer-actions").addClass("hidden");
    }
  }

  $("#settings__pfp-changer").change(function (e) {
    let files = (e.target as HTMLInputElement).files!;
    if (files.length > 0) {
      let file = files[0];
      let url = URL.createObjectURL(file);
      $("#settings__tmp-pfp").attr("src", url);
      $("#settings__file-name").text(file.name);
      isSettingNew = true;

      renderChanger();
    }
  });

  $("#clear-pfp-btn").click(function () {
    $("#settings__tmp-pfp").attr("src", currentPfp);
    $("#settings__file-name").text("No file chosen");
    isSettingNew = false;
    renderChanger();
  });
}

export default { setup };
