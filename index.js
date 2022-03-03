let resources = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const bin = document.getElementById("trash")
const resourceFromLocalStorage = JSON.parse( localStorage.getItem("resources") )

const render = (resourse) => {
    let listItems = ""
    for (let i = 0; i < resourse.length; i++) {
        listItems += `
            <li id=${i}>
                <a target='_blank' href='${resourse[i]}'>
                    ${resourse[i]}
                </a>
                <button onclick="deleteSingle()" class="trash" id=${i}><img src="./bin.png" alt="trash"/></button>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

if (resourceFromLocalStorage) {
    resources = resourceFromLocalStorage
    render(resources)
}

inputEl.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        resources.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("resources", JSON.stringify(resources) )
        render(resources)
    }
})

inputBtn.addEventListener("click", function() {
    resources.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("resources", JSON.stringify(resources) )
    render(resources)
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        resources.push(tabs[0].url)
        localStorage.setItem("resources", JSON.stringify(resources) )
        render(resources)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    resources = []
    render(resources)
})

function deleteSingle() {
    let result;
    for(let i = 0; i < resources.length; i++) {
        if(resources.indexOf(resources[i]) !== i) {
            result = resources
        } else {
            resources.splice(i, 1)
            result = [...resources];
        }
    }
    // let result = resources.filter((val, i, arr) => {
    //     if(i !== i) {
    //         return val;
    //     }
    // })
    console.log(result);
    localStorage.setItem("resources", JSON.stringify(result) ) 
    location.reload()
    //render(resources);
}

 


