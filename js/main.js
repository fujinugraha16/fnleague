// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function() {
        console.log("Service Worker registration success.");
      })
      .catch(function() {
        console.log("Service Worker registration failed.");
      });
  });
} else {
  console.log("Browser not support Service Worker.");
}

// Notification
if ("Notification" in window) {
  requestPermission();
} else {
  console.log("Browser not support notification featured");
}

function requestPermission() {
  Notification.requestPermission().then(function(result) {
    if (result === "denied") {
      console.log("Notification feature not allowed");
    } else if (result === "default") {
      console.log("User closed request dialog");
    }

    console.log("Notification feature allowed");
  });
}

if ("PushManager" in window) {
  navigator.serviceWorker.getRegistration().then(function(reg) {
    reg.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BN5vcIpEKdWTs1K7_dwH5PlNX0_Zk_QwWxQ6mrooIUSK7Qs8CpeT7JHKo44GAnUOZE036mIQRLGiIqnwUumg0Mg"
        )
      })
      .then(function(subscribe) {
        console.log("Subscribe success with endpoint: ", subscribe.endpoint);
        console.log(
          "Subscribe success with p256dh key: ",
          btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(subscribe.getKey("p256dh"))
            )
          )
        );
        console.log(
          "Subscribe success with auth key: ",
          btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(subscribe.getKey("auth"))
            )
          )
        );
      })
      .catch(function(e) {
        console.error("Cannot subscribe", e.message);
      });
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
