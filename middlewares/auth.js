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

const authenticateRole = (req, res, next) => {
    const token = req.param("accessToken");
    jwt.verify(token, "secret_Key", async (err, docs) => {
        if (err) {
            next(res.status(401).send({ error: 'Invalid Token' }));
        } else {
            req.convertedToken = docs.token.id
            next();
        }
    })
}

const checkAdmin = (req, res, next) => {
    const token = req.param("accessToken");
    jwt.verify(token, "secret_Key", async (err, docs) => {
        if (err) {
            next(res.status(401).send({ error: 'Invalid Token' }));
        } else {
            if (docs.token.roleName == 'Admin') {
                req.convertedToken = docs.token.id
                next();
            } else {
                next(res.status(401).send({ error: 'Not Authenticated' }));
            }
        }
    })
}


module.exports = {
    checkToken,
    authenticateRole,
    checkAdmin
};