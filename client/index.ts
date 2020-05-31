import $ from "jquery";
import header from "./header";
import carousel from "./book_carousel";
// import '@fortawesome/fontawesome-free/js/fontawesome'
// import '@fortawesome/fontawesome-free/js/solid'
$(document).ready(function () {
  header.setup();
  carousel.setup();
});
