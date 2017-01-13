const createModuleFactory = (coreFunction) => {
    function createMiddlewareCaller(req, res, middlewareStack) {
        const currentFunction = middlewareStack[0];

        if (!currentFunction) {
            return () => { };
        }

        const nextStack = middlewareStack.slice(1);

        return () => currentFunction(req, res, () => { createMiddlewareCaller(req, res, nextStack)(); });
    }

    return (middlewares) => {
        return {
            process: (req) => {
                const res = {};

                createMiddlewareCaller(req, res, (middlewares || []).concat([coreFunction]))();

                return res;
            }
        }
    }
}

const createHelloer = createModuleFactory((req, res) => {
    var name = req.name;
    res.message = "hello " + name;

    console.log(res.message);
})


const createCalculator = createModuleFactory((req, res) => {
    switch (req.operator) {
        case "+":
            res.result = req.number1 + req.number2;
            break;
        case "-":
            res.result = req.number1 - req.number2;
            break;
        case "*":
            res.result = req.number1 * req.number2;
            break;
        case "/":
            if (req.number2 === 0)
                throw "Cannot divide by 0 FUCKYOU";
            res.result = req.number1 / req.number2;
            break;
        default:
            throw "Unknown operator";
    }
})

const blockAllMultipleOperationMiddleware = (req, res, next) => {
    if (req.operator !== "*") {
        next();
    }
}

const multipleNumber1By10 = (req, res, next) => {
    req.number1 *= 10;
    next();
}

const logMiddleware = (req, res, next) => {
    console.log("request coming in: " + JSON.stringify(req));
    next();
}

const calculator = createCalculator([
    logMiddleware,
    blockAllMultipleOperationMiddleware,
    multipleNumber1By10,
    logMiddleware]);

const pureObjectLogMiddle = (req, res, next) => {
    console.log(req);
}

const thunkImpersonator = (req, res, next) => {
    if (typeof req.then === "function") {
        req.then((data) => {
            console.log(data);
            req = data;
            next();
        })
    }
    else {
        next();
    }
}

const curseMiddleware = (req, res, next) => {
    if (req.name === "Vu") {
        res.message = "FUCK YOU " + req.name;
        return;
    }

    next()
}

const helloer = createHelloer([
    pureObjectLogMiddle,
    logMiddleware,
    curseMiddleware
]);



console.log(calculator.process({ operator: "+", number1: 1, number2: 10 }));
console.log(calculator.process({ operator: "*", number1: 9, number2: 9 }));
helloer.process({ name: "Vu" })
helloer.process({ name:"Thanh"})


helloer.process(
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=46d6aa5f80a6f0228fe86c56173d740d`)
            .then((response) => response.json())
)