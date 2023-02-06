// event handler for password list screen
$(document).ready(function() {
    $("[id^='copy-password']").on("click", (e => {
      const passwordIdTarget = String(e.target.id);
      const passwordId = passwordIdTarget.replace('copy-password-', '');
      const passText = $("#password-text-" + passwordId).text();
      navigator.clipboard.writeText(passText);
    alert("Password copied to clipboard!");
  })
  )}
);


$(document).ready(function() {
  $("[id^='dropbtn']").on("click", (e => {
    const buttonIdTarget = String(e.currentTarget.id)
    const buttonId = buttonIdTarget.replace('dropbtn-', '')
    $(".dropdown-content").css("display", "none")
    $("#dropdown-" + buttonId).css("display", "block")

    $(window).on("click", ev => {
      if (!ev.target.matches("[id^='dropbtn']")) {
        $("#dropdown-" + buttonId).css("display", "none")
      }
    });

    })
  )}
);
