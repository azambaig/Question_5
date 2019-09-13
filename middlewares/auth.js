const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.param("accessToken");
    jwt.verify(token, "secret_Key", async (err, docs) => {
        if (err) {
            next(res.status(401).send({ error: "Invalid Token" }));
        }
        else {
            req.convertedToken = docs.token;
            next();
        }
    })
}
module.exports = {
    checkToken
};