/**
 * Middleware that checks whether the requester is an admin
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const adminMiddleware = async (req, res, next) => {
    if (req.role) {
        if (req.role !== 'admin') {
            return res.status(401).json({
                data: 'Insufficient Privileges',
                type: 'error',
                message: 'Insufficient Privileges'
            })
        }
        next();
    } else {
        return res.status(401).json({
            data: 'Invalid Token',
            type: 'error',
            message: 'Invalid Token'
        })
    }
}

export default adminMiddleware;