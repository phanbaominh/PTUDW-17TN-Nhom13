import $ from "jquery";

declare global {
  interface Window {
    flash: (type: string, content: string) => void;
  }
}

function markAllAsRead() {
  return fetch("/notifications/read", {
    method: "PUT",
  }).then(function (res) {
    if (res.ok) {
      $(".notification-item").removeClass("bg-blue-50");
      $(".notification-count").remove();
    } else {
      window.flash("error", "Lỗi hệ thống");
    }
  });
}

function setup() {
  $(".mark-all-as-read-btn").click(function () {
    markAllAsRead();
  });
}

export default { setup };
