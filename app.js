new Vue({
    el: '#app',
    data: {
      miles: 0,
      selectedTimezone: 'Pacific',
      timezones: ['Pacific', 'Mountain', 'Central', 'Eastern'],
      eta: ''
    },
    methods: {
        calculateETA() {
            const milesPerHour = 50;
            const travelHours = this.miles / milesPerHour;
          
            // Timezone map using America/ time zones
            const timezoneMap = {
              'Pacific': 'America/Los_Angeles',
              'Mountain': 'America/Denver',
              'Central': 'America/Chicago',
              'Eastern': 'America/New_York'
            };
            const timezone = timezoneMap[this.selectedTimezone];
          
            // Get current time in the selected timezone
            const now = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
            
            // Calculate ETA time by adding travel time (in ms) to `now`
            const etaTime = new Date(now.getTime() + travelHours * 60 * 60 * 1000);
          
            // Manually format etaTime in "DD/MM HH:MM" format
            const month = (etaTime.getMonth() + 1).toString().padStart(2, '0');
            const day = etaTime.getDate().toString().padStart(2, '0');
            const hours = etaTime.getHours().toString().padStart(2, '0');
            const minutes = etaTime.getMinutes().toString().padStart(2, '0');
            
            // Display in "MM/DD/YYYY HH:MM" format
            this.eta = `${day}/${month} ${hours}:${minutes}`;
          }
          
    }
  });
  