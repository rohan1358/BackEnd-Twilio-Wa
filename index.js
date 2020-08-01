const express = require("express");
const Nexmo = require('nexmo')
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});
const nexmo = new Nexmo(
  {
    apiKey: "9607afe4",
    apiSecret: "1SAUAATI7N6aUp5Q",
    applicationId: "28379d45-b0b8-471b-bec8-5bf847849095",
    privateKey: "private.key",
  },
  {
    apiHost: "https://messages-sandbox.nexmo.com/",
  }
);
nexmo.channel.send(
  { type: "whatsapp", number: "14157386170" },
  { type: "whatsapp", number: "085524531474" },
  {
    content: {
      type: "text",
      text:
        "This is a WhatsApp Message text message sent using the Messages API",
    },
  },
  (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data.message_uuid);
    }
  }
);

app.listen(3000, () => {
  console.log("server started");
});
