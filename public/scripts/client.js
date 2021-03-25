$(document).ready(function () {
  $('#err').hide();

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((result) => {
      renderTweets(result);
      $('.counter').text('140');
      $('#tweet-text').val('');
      $('#err').slideUp();

    }).catch(err => {
      console.log('ajax error caught');
      console.log(err);
    })
  };

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#all-tweets").prepend($tweet);
    }
  }

  const createTweetElement = function (tweet) {
    let $tweet = `
      <article class="tweetData">
      <header class="hdr-all">
        <div class="profile">
          <img class="img" src="${tweet.user.avatars}">
          <span class="name">${tweet.user.name}</span>
        </div>
        <span class="username">${tweet.user.handle}</span>
      </header>
      <main>
        <div class="my-tweet">${escape(tweet.content.text)}</div>
      </main>
      <footer class="ftr-all">
        <div class="date">${moment(tweet.created_at).fromNow()}</div>
        <div>
          <a><i class="fa fa-flag blue pr-10"></i></a>
          <a><i class="fa fa-retweet blue pr-10"></i></a>
          <a><i class="fa fa-heart blue"></i></a>
        </div>
      </footer>
      </article>
      `;
    return $tweet;
  }

  $("form").submit(function (event) {
    event.preventDefault();
    const msg = $('#tweet-text').val().trim();

    if (!msg) {
      $('#err').html('Text must be entered.');
      $('#err').slideDown("slow");
    } else if (msg.length > 140) {
      $('#err').html('Exceeded maximum number of characters allotted.');
      $('#err').slideDown("slow");
    } else {

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      })
      .then((result) => {
        const temp = loadTweets();
        $("#display").append(temp);
      })
      .catch(err => {
        console.log('ajax error caught');
        console.log(err);
      });
    }
  });
});
