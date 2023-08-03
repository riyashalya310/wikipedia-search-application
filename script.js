let searchResultsEle=document.getElementById("searchResults");
let spinnerEle=document.getElementById("spinner");
function createItem(result){
    let resultItemEle=document.createElement("div");
    resultItemEle.classList.add("result-item");
    searchResultsEle.appendChild(resultItemEle);

    let {title,link,description}=result;
    let resultTitleEle=document.createElement("a");
    resultTitleEle.classList.add("result-title");
    resultTitleEle.textContent=title;
    resultTitleEle.href=link;
    resultTitleEle.target="_blank";
    resultItemEle.appendChild(resultTitleEle);

    let brEle=document.createElement("br");
    resultItemEle.appendChild(brEle);

    let resultURLEle=document.createElement("a");
    resultURLEle.classList.add("result-url");
    resultURLEle.textContent=link;
    resultURLEle.href=link;
    resultURLEle.target="_blank";
    resultItemEle.appendChild(resultURLEle);

    let br2Ele=document.createElement("br");
    resultItemEle.appendChild(br2Ele);

    let resultDescEle=document.createElement("p");
    resultDescEle.classList.add("link-description");
    resultDescEle.textContent=description;
    resultItemEle.appendChild(resultDescEle);
}
function displayResult(search_results){
    for (let result of search_results){
        createItem(result);
    }
}





let searchInputEle=document.getElementById("searchInput");
searchInputEle.addEventListener('keydown',function(event){
    if (event.key!=="Enter"){
        spinnerEle.classList.remove("d-none");
    }
    else if (event.key==='Enter'){
        spinnerEle.classList.add("d-none");
        searchResultsEle.textContent="";
        let searchText=searchInputEle.value;
        let url="https://apis.ccbp.in/wiki-search?search="+searchText;
        let options={
            method:"GET",
        };

        fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let {search_results}=data;
            displayResult(search_results);
        });
    }
});