// create a method which shows a final search after user stops pressing(Debouncing an Input)

const debouncer = (func, delay) =>{ 
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId)
        } timeoutId = setTimeout(() =>{
            func.apply(null, args);
        },delay)
    }     
};