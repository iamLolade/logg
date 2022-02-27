let resourses = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const render = (resourse) => {
    let listItems = ""
    for (let i = 0; i < resourse.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${resourse[i]}'>
                    ${resourse[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}