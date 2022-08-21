const customHeader = (req,res,next) => {
    try {
        const apiKey = req.headers.api_key;
        if(apiKey === "123456789"){
            next();
        } else {
            res.status(401);
            res.send({error: "API_KEY Incorrecto"});
        }
    } catch (e) {
        res.status(403);
        res.send({error:"Error Custom Header"});
    }
};

module.exports = customHeader;
