var app1 = new Vue({
  el: '#app1',
  data: {
      posts: [],
      excerpt: function (text) {
        text = text.replace(/<[^>]*>/g, '');
        // text = text.slice(text.indexOf('.')+1, 144)
        text = text.slice(0, 160)
        // console.log('Excerpt: ' + text)
        return text;
    }
  },
  created: function () {
      const url = {rss: "https://medium.com/feed/@imagineazhar"}
      const data = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40imagineazhar"
      // let res = []

      axios.get(data)
          .then(function (response) {
              // handle success
              this.posts = response.data.items
            //   console.log(this.posts)
          }.bind(this))
          .catch(function (error) {
              // handle error
              console.log(error);
          })
          .finally(function () {
              // always executed
              // this.feed.map((items, index) => {
              //     console.log('#' + index + ' - ' + feed[index].title)
              // })
          });
  },
})