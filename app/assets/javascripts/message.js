$(function() {

  function buildHTML(message) {
    var addImage = "";
    if (message.image.url) {
      addImage = `<img src="${message.image.url}">`;
    }

    let html =  `<div class="message-content" data-id="${message.id}">
                  <div class="message-info">
                    <div class="message-info__name">
                      ${message.user_name}
                    </div>
                    <div class="message-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <p class="message">
                    ${message.body}
                  </p>
                    ${addImage}
                </div>`;

    return html;
  }

  function scrollMessagesBottom() {
    $('.right-body').animate({scrollTop: $('.right-body')[0].scrollHeight}, 'fast');
  }

  $('.js-form').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.js-form')[0].reset();
      $('.submit-btn').prop('disabled', false);
      scrollMessagesBottom();
    })
    .fail(function() {
      alert('error');
    })
  });

  let reloadMessages = function() {
    let last_message_id = $($('.message-content').slice(-1)[0]).data('id');
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      console.log('success');
      let insertHTML = '';

      if (messages.length !== 0) {
        messages.forEach(function(message) {
          let insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          scrollMessagesBottom();
        })
      }

    })
    .fail(function() {
      console.log('error');
    })
  };

  let groupId = $('.messages').data('group-id');
  if (location.pathname === "/groups/" + groupId + "/messages") {
    setInterval(reloadMessages, 5000);
  }

});
