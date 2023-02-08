const loremData = [
    {
        "label": "Project",
        "icon": "file",
        "type": "file",
        "children": [
            {
                "label": "Opened Folder",
                "icon": "folder",
                "type": "folder",
                "children": [
                    {
                        "label": "css",
                        "icon":"folder",
                        "type": "folder",
                        "children": [
                            {
                                "label": "CSS File",
                                "icon": "object",
                                "type": "object",
                                "children": []
                            }
                        ]
                    },
                    {
                        "label": "Folder close",
                        "icon": "folder",
                        "type": "folder",
                        "children": []
                    },
                    {
                        "label": "index.html",
                        "icon": "object",
                        "type": "object",
                        "children": []
                    },
                    {
                        "label": "favicon.ico",
                        "icon": "object",
                        "type": "object",
                        "children": []
                    }
    
                ]
            }
        ]
    }
]


let counterId = 0;
let activeParent = -1;
let activeElement = undefined;
let changeElementName = undefined;


const handlerParentClick = (e) => {
    let obj = e.srcElement;
    for(let i = 0; i < 4; i++){
        if(obj && obj.className === "tree-elem"){
            activeElement = obj;
            return;
        }
        obj = obj.parentNode;
    }

}

const handleDblClick = (e) =>{
    let obj = e.srcElement;
    for(let i = 0; i < 4; i++){
        console.log(obj);
        if(obj && obj.className === "container__tree"){
            if(changeElementName){
                return
            }
            changeElementName = obj;
            let name = changeElementName.children[1].innerHTML;
            obj.removeChild(changeElementName.children[1])
            const input = document.createElement("input");
            input.className = "input_change_name";
            input.style.paddingLeft = "5px";
            input.value = name;
            changeElementName.appendChild(input);
            changeElementName.children[1].focus();
            changeElementName.children[1].onblur = (e) => {
                console.log(changeElementName.children[1].value);
                let prevName = changeElementName.children[1].value
                obj.removeChild(changeElementName.children[1]);
                const span = document.createElement("span");
                span.innerHTML = prevName;
                obj.appendChild(span);
                obj.parentNode.customData.name = prevName;
                changeElementName = undefined;
            }
            
            return;
        }
        obj = obj.parentNode;
    }
}

class ElemenentTree {
    constructor(name, type, children, parentNode){
        this.node = document.createElement("li");
        this.id = counterId++;
        this.name = name;
        this.type = type;
        this.children = children;
        this.parentNode = parentNode;
    }

    getElement(){
        const div_container = document.createElement("div");
        const img_element = document.createElement("img");
        const elem_name =  document.createElement("span");
        const ul = document.createElement("ul");
        div_container.onclick = handlerParentClick;
        div_container.ondblclick  = handleDblClick;
        div_container.className = "container__tree";
        img_element.src = `img/${this.type}.svg`;
        elem_name.innerHTML = this.name;
        div_container.appendChild(img_element);
        div_container.appendChild(elem_name);
        this.node.append(div_container, ul);
        this.node.className = "tree-elem";
        this.node.customData = {
            name: this.name,
            type: this.type,
        }
        for(let i = 0; i < this.children.length; i++){
            const {label, type, children} = this.children[i];
            const child = new ElemenentTree(label, type, children, this.node);

            console.log(this.node.customData);
            child.parentNode.lastChild.appendChild(child.getElement());
        }
        return this.node;
    }
}


const addElement = (name, type, children,parent_node) => {
    if(parent_node && parent_node.className === "tree-main" && type === "file"){
        const elem = new ElemenentTree(name, type,children,  parent_node).getElement();
        elem.classList.add("file__elem");

        if(parent_node){
            parent_node.appendChild(elem);
            if(!name.length){
                console.log(elem);
            }
            return parent_node.lastChild;
        }
        return undefined;

    }
    if(type !== "file"){
        const elem = new ElemenentTree(name, type,children,  parent_node).getElement();
        console.log(elem, parent_node);
        if(parent_node){
            parent_node.lastChild.appendChild(elem);
            return parent_node.lastChild;
        }
        return undefined;
    }
}


const deleteElement = () => {
    if(!activeElement)
        return 0;

    activeElement.parentNode.removeChild(activeElement)
    activeElement = undefined;   
}

const loadData = (data) => {
    const main_tree = document.querySelector(".tree-main");
    data.map(elem => {
        const {label, type, children} = elem;
        addElement(label, type, children, main_tree)
    })
}
