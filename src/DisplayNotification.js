export default function displayNotification (message) {
  if(Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      reg.showNotification(message, {
        vibrate: [100, 50, 100, 75, 25, 25, 50, 250]
      })
    })
  }
}