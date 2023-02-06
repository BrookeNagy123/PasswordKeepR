// event handler for password list screen
$(document).ready(function() {
    $("[id^='copy-password']").on("click", (e => {
      const passwordIdTarget = String(e.target.id);
      const passwordId = passwordIdTarget.replace('copy-password-', '');
      const passText = $("#password-text-"+passwordId).text();
      navigator.clipboard.writeText(passText);
    alert("Password copied to clipboard!");
  })
  )}
);
