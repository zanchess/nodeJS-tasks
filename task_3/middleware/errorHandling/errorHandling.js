import { StatusCodes } from 'http-status-codes';
import logger from '../../logging';

const errorHandler = (err, req, res, next) => {
  logger.error('Unhandled Error caught', {
    errorMessage: err.message,
    customErrorMessage: err.customErrorMessage,
    url: req.url,
    params: req.params,
  });
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.customErrorMessage });
  next();
};

export default errorHandler;
