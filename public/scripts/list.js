// $(() => {
//   $('#fetch-users').on('click', () => {
//     $.ajax({
//       method: 'GET',
//       url: '/api/users'
//     })
//     .done((response) => {
//       const $usersList = $('#users');
//       $usersList.empty();

//       for(const user of response.users) {
//         $(`<li class="user">`).text(user.name).appendTo($usersList);
//       }
//     });
//   });
// });


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
