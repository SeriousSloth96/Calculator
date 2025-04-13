
const calc_button_objs = [
[{repr:"<-",func:"delete_character"}, {repr:"<=",func:"clear_display"}],
[{repr:"7",func:"digit"}, {repr:"8",func:"digit"}, {repr:"9",func:"digit"}, {repr:"+",func:"operation"}],
[{repr:"4",func:"digit"}, {repr:"5",func:"digit"}, {repr:"6",func:"digit"}, {repr:"-",func:"operation"}],
[{repr:"1",func:"digit"}, {repr:"2",func:"digit"}, {repr:"3",func:"digit"}, {repr:"/",func:"operation"}],
[{repr:"0",func:"digit"}, {repr:".",func:"digit"}, {repr:"=",func:"operate"}, {repr:"*",func:"operation"}]
]

let row_idx = 0
const button_container_element = document.querySelector("#buttons_container")

const calc_buttons = calc_button_objs.map(row => {
    const row_element = document.createElement("div")
    row_element.classList.add("calc_row")
    row_element.id = "row_" + row_idx++
    const rows = row.map(btn => {
        const el = 
        `
        <button class="calc_button" onclick="${btn.func === "digit" || btn.func === "operation" ? btn.func + "('" + btn.repr + "')" : btn.func + "()" }">
        ${btn.repr}
        </button>
        `
        row_element.innerHTML += el
        return row_element
    })
    button_container_element.appendChild(row_element)
    return [rows]
})

document.onload = calc_buttons