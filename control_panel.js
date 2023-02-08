
const add_btn = document.querySelector('.add_element');

const create_panel = document.querySelector(".create__panel");

add_btn.addEventListener('click',(e)=>{
    create_panel.style.left === "5px" ? create_panel.style.left = "-200px" : create_panel.style.left = "5px"; 
})

const trash_btn = document.querySelector('.trash_element');

trash_btn.addEventListener('click', (e)=>{
    if(!activeElement)
        return 0;

    activeElement.parentNode.removeChild(activeElement)
    activeElement = undefined;   
})

const save_btn = document.querySelector('.save_elements');

save_btn.addEventListener('click', (e) => {
    localStorageSave();
})

const create__obj__btn = document.querySelector(".create__panel__object")
const create__folder__btn = document.querySelector(".create__panel__folder")
const create__file__btn = document.querySelector(".create__panel__file")

create__obj__btn.onclick = () => {
    console.log(activeElement);
    if(!activeElement) return;
    const element = addElement("ObjectName", "object", [], activeElement);
    create_panel.style.left = "-200px"
}

create__folder__btn.onclick = () => {
    if(!activeElement) return;
    const element = addElement("FolderName", "folder", [], activeElement);
    create_panel.style.left = "-200px"
}

create__file__btn.onclick = () => {
    if(!activeElement) return;
    const element = addElement("FileName", "file", [], activeElement);
    create_panel.style.left = "-200px"
}


const saveData = (childrens) => {
    let array_save = []
    console.log(childrens)

    for(let item of childrens){
        console.log(item.customData);
        array_save.push({
            label: item.customData.name,
            type: item.customData.type,
            children: item.children[1] ? saveData(item.children[1].children) : []
        })
    }
    return array_save;
        
}

const localStorageSave = () => {
    const tree = document.querySelector(".tree-main").children;
    const data = saveData(tree);
    localStorage.setItem("data-tree", JSON.stringify(data));
}

const loadDataFromLocalStorage = () => {
    const data = localStorage.getItem("data-tree")
    loadData(JSON.parse(data));
}