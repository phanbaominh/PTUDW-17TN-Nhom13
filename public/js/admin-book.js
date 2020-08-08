$(document).ready(() => {
  const dom = `
  "<'row'<'col-sm-6'l>>" +
  "<'row'<'col-sm-12'tr>>" +
  "<'row'<'col-sm-5'i><'col-sm-7'p>>" +
  "<'row'<'col-sm-12 search-filter-wrapper'>>"
  `;

  const table = $("#book-table").DataTable({
    dom,
    pageLength: 10,
    responsive: true,
    "columnDefs": [ 
      {
        "targets": [-1, -2],
        "orderable": false,
      },
      {
        targets: 3,
        width: "10%",
      },
      {
        "targets": -1,
        "width": "5%",
      }
    ],
  });

  table.columns().every(function () {
    const header = $(this.header()).text();
    if (header === '') return;
    const input = $(`<input type="text" class="form-control" placeholder="Search ${header}">`);
    $('.search-filter-wrapper').append(input);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const column = this;
    input.on( 'keyup change clear', function () {
      if ( column.search() !== this.value ) {
          console.log(this.value);
          column
              .search( this.value )
              .draw();
      }
  } );
  })
});