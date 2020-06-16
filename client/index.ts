import $ from "jquery";
import carousel from "./book_carousel";
import header from "./header";

$(document).ready(function () {
  console.log(header);
  header.setup();
  carousel.setup();
});
