export default function displayNotification (message) {
  if(Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      reg.showNotification(message)
    })
  }
}