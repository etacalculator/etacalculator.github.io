new Vue({
  el: '#app',
  data: {
    miles: 0,
    selectedTimezone: 'Pacific',  
    timezones: ['Pacific', 'Mountain', 'Central', 'Eastern'],
    exactEta: '',  
    roundedEta: '', 
    useFasterSpeed: false
  },
  methods: {
    calculateETA() {
      // Speed setting
      const milesPerHour = this.useFasterSpeed ? 60 : 50;
      const travelHours = this.miles / milesPerHour;

      const timezoneMap = {
        'Pacific': { tz: 'America/Los_Angeles', label: 'PT' },
        'Mountain': { tz: 'America/Denver', label: 'MT' },
        'Central': { tz: 'America/Chicago', label: 'CT' },
        'Eastern': { tz: 'America/New_York', label: 'ET' }
      };
      const { tz, label } = timezoneMap[this.selectedTimezone];

      const now = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
      const etaTime = new Date(now.getTime() + travelHours * 60 * 60 * 1000);

      const exactDay = etaTime.getDate().toString().padStart(2, '0');
      const exactMonth = (etaTime.getMonth() + 1).toString().padStart(2, '0');
      const exactHours = etaTime.getHours().toString().padStart(2, '0');
      const exactMinutes = etaTime.getMinutes().toString().padStart(2, '0');
      this.exactEta = `${this.miles} miles out; ETA ${exactDay}/${exactMonth} ${exactHours}${exactMinutes}${label}`;

      // Round minutes to nearest 15-minute mark
      let roundedMinutes = Math.round(etaTime.getMinutes() / 15) * 15;
      let roundedHours = etaTime.getHours();

      // Handle overflow 
      if (roundedMinutes === 60) {
        roundedMinutes = 0;
        roundedHours += 1;
        // Handle hour overflow to the next day
        if (roundedHours === 24) {
          roundedHours = 0;
          etaTime.setDate(etaTime.getDate() + 1);
        }
      }

      const roundedDay = etaTime.getDate().toString().padStart(2, '0');
      const roundedMonth = (etaTime.getMonth() + 1).toString().padStart(2, '0');
      const roundedHoursStr = roundedHours.toString().padStart(2, '0');
      const roundedMinutesStr = roundedMinutes.toString().padStart(2, '0');
      this.roundedEta = `${this.miles} miles out; ETA ${roundedDay}/${roundedMonth} ${roundedHoursStr}${roundedMinutesStr}${label}`;
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.copied = true;
        setTimeout(() => this.copied = false, 1500); 
      }).catch((err) => {
        console.error('Failed to copy: ', err);
      });
    }
  }
});
