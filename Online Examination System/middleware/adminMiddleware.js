const adminMiddleware = (req, res, next) => {

    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized'
        });
    }

    if (req.session.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Admin access only'
        });
    }

    next();
};

module.exports = adminMiddleware;