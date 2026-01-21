var app2 = new Vue({
  el: '#featured',
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

})