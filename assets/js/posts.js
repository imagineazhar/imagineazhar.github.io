var app = new Vue({
  el: '#app',
  data: {
      feed: [],
      posts: []
  },
  created: function () {
      const url = {rss: "https://medium.com/feed/@imagineazhar"}
      const data = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40imagineazhar"
      // let res = []

      axios.get(data)
          .then(function (response) {
              // handle success
              this.feed = response.data.items
              console.log(this.feed)
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