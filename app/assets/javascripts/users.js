$(function() {

  let search_list = $('#user-search-result');
  var actionUsers = []

  function appendUser(user) {
    let html = `<div class="chat-group-user clearfix" id="user-${user.id}">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHtml(msg) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group_user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }

  function appendChatMember(addUser, addId) {
    let html = `<div class="chat-group-user">
                  <input name="group[user_ids][]" type="hidden" value="${addId}">
                  <p class="chat-group-user__name">${addUser}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
                </div>`
    $('.chat-group-users').append(html);
  }

  $('#user-search-field').on('keyup', function(e) {
    e.preventDefault();
    let input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          actionUsers.forEach(function(actionUser) {
            if (actionUser !== user.id) {
              appendUser(user);
            }
          });
        });
      } else {
        appendErrMsgToHtml('一致するユーザーはいません');
      }
    })
    .fail(function() {
      alert('ユーザーの検索に失敗しました')
    })
  });

  $(document).on('click',　'.user-search-add', function() {
    let id = $(this).data('user-id');
    let name = $(this).data('user-name');
    actionUsers.push(id);
    appendChatMember(name, id);
    $('#user-' + id).remove();
  });

  $(document).on('click', '.user-search-remove', function() {
    let id = $(this).data('user_id');
    actionUsers.push(id);
    $(this).parent().remove();
  })
});
