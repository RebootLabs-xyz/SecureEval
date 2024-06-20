// Example Context Object:
// [["key1", "value1"], ["key2", 2]]


function SecureEval(code, {context = [], asJSON = false, exposeAs = "context"}) {
    let initFunc = function (interpreter, globalObject) {
        if(asJSON) {
            interpreter.setProperty(globalObject, "ffdfffbecfebfcceabefdacbdf", JSON.stringify(context));
        } else {
            let contextObj = {};
            context.forEach((item) => {
                contextObj[item[0]] = item[1];
            });
            for (let key in contextObj) {
                interpreter.setProperty(globalObject, key, contextObj[key]);
            }
        }
    };

    if(asJSON) {
        code = `let ${exposeAs} = JSON.parse(ffdfffbecfebfcceabefdacbdf); ${code}`;
    }

    code = Babel.transform(code, {'presets': ['es2015']}).code;

    let interpreter = new Interpreter(code, initFunc);
    interpreter.run();
    return interpreter.value;
}