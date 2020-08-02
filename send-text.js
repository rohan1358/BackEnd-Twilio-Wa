const expres = require("express");
const twilio = require("twilio");
const bodyParser = require("body-parser");
const app = expres();
app.use(bodyParser.urlencoded({ extended: false }));
const router = expres.Router();
router.post("/post", function (req, res) {
  console.log(req.body.numberPhone, req.body.messages);
  const client = twilio(
    (TWILIO_ACCOUNT_SID = "ACb20fe17df4390ea9b9b34562b92b6ee0"),
    (TWILIO_AUTH_TOKEN = "b0a950f3e0be9d8625bb00b86542111c")
  );
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:" + req.body.numberPhone,
      body: req.body.messages,
    })
    .then((messages) => {
      console.log(messages);
      res.json(messages);
    })
    .catch((err) => {
      console.error("ini error", err);
      res.json(err);

    });
});
app.use(
  "/api/v2",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    next();
  },
  router
);
app.listen(3000, console.log("node is running 3000"));
