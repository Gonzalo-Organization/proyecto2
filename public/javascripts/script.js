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

/*Checkbox*/
$(".ui.checkbox").checkbox();
