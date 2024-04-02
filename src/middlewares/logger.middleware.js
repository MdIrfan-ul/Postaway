import winston from "winston";

// Create a Winston logger instance for info logs
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'request-logging' },
    transports: [new winston.transports.File({ filename: "info.log" })],
});

// Create a Winston logger instance for error logs
export const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

// Middleware for logging requests and errors
const logMiddleware = async (req, res, next) => {
    try {
        await next(); // Execute the route handler and wait for it to complete
        if (!req.url.includes("signin") && !req.url.includes("reset-password")) {
            const logData = `${req.method} ${req.url} - ${JSON.stringify(req.body)}`;
            logger.info(logData);
        }
    } catch (error) {
        const errorData = `${error.name} - ${error.message}`;
        errorLogger.error(errorData);
        next(error); // Forward the error to the error handler middleware
    }
}

export default logMiddleware;
