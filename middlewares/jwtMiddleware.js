// const jwt = require('jsonwebtoken');

// const jwtMiddleware = (req, res, next) => {
//     console.log("inside jwtMiddleware");
//     const token = req.headers['authorization'].split(" ")[1];
//     if (token) {
//         try {
//             const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD)
//             req.userId = jwtResponse.userId
//             next();
//         } catch (err) {
//             res.status(401).json("Authorization Failed, Please Login Again")
//         }
//     } else {
//         res.status(404).json("Authorization Failed, Token Missing")
//     }
// }
// module.exports = jwtMiddleware;


const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwtMiddleware");

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(404).json("Authorization Failed, Token Missing");
    }

    const token = authHeader.split(" ")[1];

    try {
        const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD);
        req.userId = jwtResponse.userId;
        next();
    } catch (err) {
        res.status(401).json("Authorization Failed, Please Login Again");
    }
};

module.exports = jwtMiddleware;
