module.exports = function check(str, bracketsConfig) {
    const stack = [];
    const openBrackets = {};
    const closeBrackets = {};
    const sameBrackets = new Set();

    bracketsConfig.forEach(([open, close]) => {
        openBrackets[open] = close;
        closeBrackets[close] = open;
        if (open === close) {
            sameBrackets.add(open);
        }
    });

    for (let i = 0; i < str.length; i++) {
        const current = str[i];

        if (sameBrackets.has(current)) {
            if (stack.length && stack[stack.length - 1] === current) {
                stack.pop();
            } else {
                stack.push(current);
            }
        } else if (openBrackets[current]) {
            stack.push(current);
        } else if (closeBrackets[current]) {
            if (stack.length === 0 || stack[stack.length - 1] !== closeBrackets[current]) {
                return false;
            }
            stack.pop();
        }
    }

    return stack.length === 0;
}
