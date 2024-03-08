import winston from "winston";


const logger = winston.createLogger({
    level:"info",
    defaultMeta:{service:"request-logging"},
    transports:[new winston.transports.File({filename:'server.log'})]
});


const loggerMiddleware = async (req,res,next)=>{
    if(!req.url.includes("signin")){
    const logData =`${new Date().toString()} Req URL:${req.url} Req Body:${JSON.stringify(req.body)}`
    logger.info(logData);
}
    next();
}

export default loggerMiddleware;