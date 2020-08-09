$(document).ready(function () {
  $("#category-table").DataTable({
    responsive: true,
    dom: "<'action-row'Bf>rtip",
    buttons: [
      {
        text: "Tạo thể loại mới",
        className: "create-btn",
        action() {
          $("#create-modal").modal();
        },
      },
    ],
    columnDefs: [
      {
        target: 3,
        width: "50%",
      },
    ],
  });
  $(".edit-btn").click(function () {
    let categoryId = this.dataset.id;
    $(`#edit-modal-${categoryId}`).modal();
  });
});
