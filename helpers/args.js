const getArgs = (args) => {
    const result = {}

    const [executer, file, ...filteredArgs] = args;
    filteredArgs.forEach((val, index, array) => {
        if(val.charAt(0) === '-'){
            if(index === array.length - 1 || array[index + 1].charAt(0) === '-'){
                result[val.substring(1)] = true
            }else {
                result[val.substring(1)] = array[index + 1]
            }
        }
    });

    return result;
}

export { getArgs }