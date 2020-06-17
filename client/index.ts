import $ from "jquery";
import carousel from "./book_carousel";
import header from "./header";

$(document).ready(function () {
  header.setup();
  carousel.setup();
});
