$(function() {

  function buildHTML(message) {
    var addImage = "";
    if (message.image.url) {
      addImage = `<img src="${message.image.url}">`;
    }

    let html =  `<div class="message-content">
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
      $('.input-box__text').val('');
      $('.submit-btn').prop('disabled', false);
      console.log($('.message-content').slice(-1)[0]);
      $('.right-body').animate({scrollTop: $($('.message-content').slice(-1)[0]).offset().top}, 'fast');
    })
    .fail(function() {
      alert('error');
    })
  });
});
