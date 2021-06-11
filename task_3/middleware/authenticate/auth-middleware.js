import jwt from 'jsonwebtoken';
import CONFIGS from '../../configs/config';

const authMiddleware = (req, res, next) => {
  if (['/login'].includes(req.path)) {
    return next();
  }
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send();
  }

  jwt.verify(token, CONFIGS.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send();
    }
    console.log(req.user);
    req.user = user;
    next();
  });
};

export default authMiddleware;
