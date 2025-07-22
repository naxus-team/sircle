const fs = require("fs");
const jwt = require("jsonwebtoken");

const publicKey = fs.readFileSync("./middleware/public.key", "utf8");


module.exports = publicKey;
