const DIGIT_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
const OPERATION_KEYS = ["+", "-", "/", "*"]
const DELETE_KEY = "Backspace"
const CLEAR_KEY = "Delete"
const CALCULATE_KEY = "Enter"

document.addEventListener("keydown",event => {
    const key = event.key
    console.log(key)
    if (DIGIT_KEYS.includes(key)){
        digit(key)
    }else if (OPERATION_KEYS.includes(key)){
        operation(key)
    }else if (key === DELETE_KEY){
        delete_character()
    }else if (key === CALCULATE_KEY){
        operate()
    }else if (key === CLEAR_KEY){
        clear_display()
    }
})