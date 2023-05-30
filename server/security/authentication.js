const firewall = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send("Unauthorized");
    const isAuthorized = await tokenService.findTokens(req.headers.authorization.split(" ")[1]);
    if (!isAuthorized) return res.status(401).send("Unauthorized");
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = firewall;