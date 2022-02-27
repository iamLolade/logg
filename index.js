let resourses = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const resourceFromLocalStorage = JSON.parse( localStorage.getItem("resources") )

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

if (resourceFromLocalStorage) {
    resourses = resourceFromLocalStorage
    render(resourses)
}

inputBtn.addEventListener("click", function() {
    resourses.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("resources", JSON.stringify(resourses) )
    render(resourses)
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        resourses.push(tabs[0].url)
        localStorage.setItem("resources", JSON.stringify(resourses) )
        render(resourses)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    resourses = []
    render(resourses)
})