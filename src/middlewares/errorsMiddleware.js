const errorControl = (err, req, res, next) => {
    console.error(err.error);
    res.redirect(`/${err.page}?error=${err.code}`);
};

module.exports = { errorControl };