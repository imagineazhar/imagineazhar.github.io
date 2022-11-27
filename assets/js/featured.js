var app2 = new Vue({
  el: '#app2',
  data: {
      feed: [
            {
                title: 'HR Attrition Dashboard',
                thumbnail: 'https://public.tableau.com/static/images/HR/HRAttritionDashboardRWFD/Overview/4_3.png',
                url: 'https://public.tableau.com/app/profile/m.azhar/viz/HRAttritionDashboardRWFD/Overview'
            },
            {
                title: 'Call Center Dashboard',
                thumbnail: 'https://public.tableau.com/static/images/Ca/CallCenterDashboardRWFD_16490164574900/Overview/4_3.png',
                url: 'https://public.tableau.com/app/profile/m.azhar/viz/CallCenterDashboardRWFD_16490164574900/Overview'
            },
            {
                title: 'Employee Expenses Dashboard',
                thumbnail: 'https://public.tableau.com/static/images/SA/SAPConcurDashboardRWFD_16495507371480/Cockpit/4_3.png',
                url: 'https://public.tableau.com/app/profile/m.azhar/viz/SAPConcurDashboardRWFD_16495507371480/Cockpit'
            }
        ]
  },
//   created: function () {
//       const url = {rss: "https://public.tableau.com/app/profile/m.azhar"}
//       const data = "https://public.tableau.com/profile/api/m.azhar"
//       // let res = []

//       axios.get(data)
//           .then(function (response) {
//               // handle success
//               this.feed = response.data.items
//               console.log(this.feed)
//           }.bind(this))
//           .catch(function (error) {
//               // handle error
//               console.log(error);
//           })
//           .finally(function () {
//               // always executed
//               // this.feed.map((items, index) => {
//               //     console.log('#' + index + ' - ' + feed[index].title)
//               // })
//           });
//   },
})