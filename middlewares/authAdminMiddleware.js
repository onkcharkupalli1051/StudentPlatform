const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const admintoken = req.headers['authorization'].split(" ")[1];
    JWT.verify(admintoken, process.env.JWT_ADMIN, (error, decode) => {
      if (error) {
        return res.status(200).send({ message: "Auth Failed", success: false });
      } else {
        req.body.adminId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
