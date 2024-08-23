const errorHandler = (req, res,err) => {
    res.json({error: `Something went wrong ${err.message}`});
}

export default errorHandler;

