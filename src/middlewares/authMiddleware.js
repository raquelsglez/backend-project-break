const verificarSesionMiddleware = (req, res, next) => {
    if (req.session.palabraSecreta) {
        next();
    } else {
      res.redirect('/errors?error=1');
    }
};

module.exports = {
    verificarSesionMiddleware,
};
