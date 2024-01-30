const app = require("./src/app");

const PORT = 3055;

const server = app.listen(PORT, () => {
  console.log("WSV eCommerce start with port", PORT);
});

//When ctrl + C, close server
process.on("SIGINT", () => {
  server.close(() => console.log(`Exit Express Server`));
  //notify.send(...ping) //when server crashes,...
});
