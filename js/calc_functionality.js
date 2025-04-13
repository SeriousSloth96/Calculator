const DISPLAY_TEXT_ELEMENT = document.querySelector("#display_text")
const DISPLAY_TEXT_FONT = window.getComputedStyle(DISPLAY_TEXT_ELEMENT, null).getPropertyValue("font-size") + window.getComputedStyle(DISPLAY_TEXT_ELEMENT, null).getPropertyValue("font-family")
const DISPLAY_TEXT_ALLOWED_WIDTH = 284
const OPERATORS = ['+', "-", "/", "*"]

let full_display_string = ""

const getTextWidth = (text, font) => {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"))
    const context = canvas.getContext("2d")
    context.font = font
    const metrics = context.measureText(text)
    return metrics.width
}

const digit = (d) => {
    if (d === '.'){
        if (has_decimal()) return

        if (last_entry_is_operator() || display_is_empty()){
            full_display_string =+ "0"
        }
    }
    full_display_string += d
    display()
}

const operation = (o) => {
    if (last_entry_is_operator()){
        full_display_string = full_display_string.slice(0,-1)
        full_display_string += o
    }else if (display_includes_operator()){
        if(operate()){
            full_display_string += o
        }
    }else{
        full_display_string += o
    }
    display()
}

const operate = () => {
    const regex = /([\d.]+|[/*+-])/ig
    const [first, operator, second] = full_display_string.match(regex)
    const first_converted = Number(first)
    const second_converted = Number(second)
    if (!isNaN(first_converted) && !isNaN(second_converted) && OPERATORS.includes(operator)){
        let result_string = ""
        switch (operator){
            case "+":
                result_string  = first_converted + second_converted
                break
            case "-":
                result_string  = first_converted - second_converted
                break
            case "*":
                result_string  = first_converted * second_converted
                break
            case "/":
                if (second_converted === 0){
                    window.alert("Invalid operation")
                    return
                }
                result_string  = first_converted / second_converted
                break
        }
        full_display_string = String(result_string)
        display_calculation()
        return true
    }
    return false
}

const clear_display = () => {
    full_display_string = ""
    display()
}

const delete_character = () => {
    full_display_string = full_display_string.slice(0,-1)
    display()
}

const has_decimal = () =>{
    let idx = 0
    for (let i = full_display_string.length - 1; i >= 0; i--){
        if (OPERATORS.includes(full_display_string.charAt(i))){
            idx = i
            break
        }
    }
    return full_display_string.substring(idx).includes('.')
}

const last_entry_is_operator = () => {
    return OPERATORS.includes(full_display_string.slice(-1))
}

const display_includes_operator = () => {
    for (const el of full_display_string){
        if (OPERATORS.includes(el)) return true
    }
    return false
}

const display_is_empty = () => {
    return full_display_string.length === 0
}

const display = () => {
    if (getTextWidth(full_display_string,DISPLAY_TEXT_FONT) <= DISPLAY_TEXT_ALLOWED_WIDTH){
        DISPLAY_TEXT_ELEMENT.textContent = full_display_string
    }else{
        let part_display_string = full_display_string
        while (getTextWidth(part_display_string,DISPLAY_TEXT_FONT) >= DISPLAY_TEXT_ALLOWED_WIDTH){
            part_display_string = part_display_string.substring(1)
        }
        DISPLAY_TEXT_ELEMENT.textContent = part_display_string
    }
}

const display_calculation = () => {
    if (getTextWidth(full_display_string,DISPLAY_TEXT_FONT) <= DISPLAY_TEXT_ALLOWED_WIDTH){
        DISPLAY_TEXT_ELEMENT.textContent = full_display_string
    }else{
        let part_display_string = full_display_string
        while (getTextWidth(part_display_string,DISPLAY_TEXT_FONT) >= DISPLAY_TEXT_ALLOWED_WIDTH){
            part_display_string = part_display_string.slice(0,-1)
        }
        DISPLAY_TEXT_ELEMENT.textContent = part_display_string
    }
}