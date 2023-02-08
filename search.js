
const input_node = document.querySelector('.search__input');

let search_result = [];
let active_search = -1;


input_node.addEventListener("input", (e)=>{
    const spans = document.getElementsByTagName("span");
    search_result = [];
    active_search = -1;
    for(let span of spans){
        span.style.color = "gray";
        if(e.target.value.length && span.innerHTML.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0) {
            span.style.color = "white"
            search_result.push(span);
        }
            
           
    }
})

window.addEventListener("keypress", (e)=>{
    if(e.key === "Enter" && search_result.length){
        console.log(search_result[active_search+1],active_search+1);
        if(active_search >= 0 && active_search+1 < search_result.length){
            search_result[active_search++].style.color = "white";
            search_result[active_search].style.color = "red";
        } else if (active_search < 0){
            console.log("test");
            search_result[++active_search].style.color = "red";
        } else if(active_search+1 >= search_result.length){
            search_result[active_search].style.color = "white";
            active_search = 0
            search_result[active_search].style.color = "red";
        }
    }
})