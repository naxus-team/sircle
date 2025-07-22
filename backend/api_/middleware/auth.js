const fs = require("fs");
const jwt = require("jsonwebtoken");

const publicKey = fs.readFileSync("./middleware/public.key", "utf8");

const verifyToken = (req, res, next) => {
    const auth = 'Bearer '+req.header("Authorization");
    const token = auth.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Please log in again." });

    try {
        const verified = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: "The data is invalid." });
    }
};

module.exports = verifyToken;
