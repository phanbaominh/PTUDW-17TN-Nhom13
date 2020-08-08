$(document).ready(function() {
  const table = $("#borrow-table").DataTable({
    pageLength: 10,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [{
        extend: "copy"
      },
      {
        extend: "csv"
      },
      {
        extend: "excel",
        title: "ExampleFile"
      },
      {
        extend: "pdf",
        title: "ExampleFile"
      },
      {
        extend: "print",
        customize: function(win) {
          $(win.document.body).addClass("white-bg");
          $(win.document.body).css("font-size", "10px");

          $(win.document.body)
            .find("table")
            .addClass("compact")
            .css("font-size", "inherit");
        }
      }
    ],
    "columnDefs": [ 
      {
        "targets": -1,
        "orderable": false,
      },
      {
        "targets": -1,
        "width": "8%",
      },
    ],
    "order": [[0, 'desc']],
  });

  $("#borrow-table").on("submit", "form", function(event) {
    const form = $(this);
    const cardId = form.data("id");
    $.ajax({
      url: form.attr("action"),
      dataType: "json",
      method: "post",
      success: ({ row, successMessage }) => {
        flash({ successMessage });
        $(`#borrow-table tr#borrow-table__row-${cardId}`).html(row);
        table.draw("full-hold");
        
      },
      error: (xhr) => {
        const { errorMessage } = JSON.parse(xhr.responseText);
        flash({ errorMessage });
      }
    })
    event.preventDefault();
  });
});