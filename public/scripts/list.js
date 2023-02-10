// event handler for password list copy button
$(document).ready(function() {
    $("[id^='copy-password']").on("click", (e => {
      const passwordIdTarget = String(e.currentTarget.id);

    //retrieve password id
      const passwordId = passwordIdTarget.replace('copy-password-', '');
      const passText = $("#password-text-" + passwordId).text();

    //retrieve password value by id then copy to clipboard
      navigator.clipboard.writeText(passText)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  })
  )}
);

//dropdown button click event handler to show dropdown
$(document).ready(function() {
  $("[id^='dropbtn']").on("click", (e => {
    const buttonIdTarget = String(e.currentTarget.id)
    const buttonId = buttonIdTarget.replace('dropbtn-', '')
    $(".dropdown-content").css("display", "none")
    $("#dropdown-" + buttonId).css("display", "block")

//window click event to hide dropdown
    $(window).on("click", ev => {
      if (!ev.target.matches("[id^='dropbtn']")) {
        $("#dropdown-" + buttonId).css("display", "none")
      }
    });

    })
  )}
);
