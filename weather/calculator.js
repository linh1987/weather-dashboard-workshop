

const createCalculator = (middleWare) => {
    function internalCalculate(req, res) {
        switch(req.operator) {
            case "+":
                res.result = req.number1 + req.number2;
                break;
            case "-":
                break;
            case "*":
                break;
            case "/":
                break;
            default:
                throw "Unknow operator";
        }
    }

    function createMiddlewareCaller(middleWare) {
    
    }
    
    return {
        calculate: (req) => {
            const res = {};
            return res;
        }
    };
};



const calculator = createCalculator();

const sampleMiddleware = (req, res, next) => {
}

const logMiddleware = (req, rest, next) => {
    console.log(req);
    next();
}