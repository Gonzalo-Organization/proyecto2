document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

/*Modal*/
$(function() {
  $("#login").click(function() {
    $(".login")
      .modal({
        blurring: true
      })
      .modal("show");
  });
  $(".login").modal({
    closable: true
  });
});

$(function() {
  $("#register").click(function() {
    $(".register")
      .modal({
        blurring: true
      })
      .modal("show");
  });
  $(".register").modal({
    closable: true
  });
});

$(function() {
  $("#problem").click(function() {
    $(".problem")
      .modal({
        blurring: true
      })
      .modal("setting", "closable", false)
      .modal("show");
  });
  $(".problem").modal({
    closable: true
  });
});

/*Select*/
$(".selection.dropdown").dropdown();

/*Checkbox*/
$(".ui.checkbox").checkbox();

/*Tabs*/
$(".menu .item").tab();

/*Select*/
$("#multi-select").dropdown();
