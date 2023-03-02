let url=document.getElementById('project-detail').dataset.project;
let total_issue;

// fetch(`load/${url}`)
// .then(response => response.json())
// .then(function(data){
//    console.log(data.message);
// })

let filteredArrayOfIssues=[];

function ajax(labelValue, assignedValue){ 
$.ajax({
  url: `load/${url}`,
  type: "GET",
  dataType: "json",
  success: function(data) {
    doFilter(data.message,labelValue,assignedValue);
  }, 
  error: function(jqXHR, textStatus, errorThrown) {
    console.log("Error:", textStatus, errorThrown);
  }
});

}


function doFilter(fullData, labelValue, assignedValue){
    let issueListContainer=document.getElementById('list-of-issues');
    let filterData;
    if(labelValue=='none' && assignedValue=='none'){
        filterData=fullData;}
    else if(labelValue=='none'){
        filterData=fullData.filter(function(item){
            return item.assigned==assignedValue;
        });    
    }
    else if(assignedValue=='none'){
        filterData=fullData.filter(function(item){
            return item.label==labelValue;
        });

    }
    else{
        filterData=fullData.filter(function(item){
            return item.label==labelValue&&item.assigned==assignedValue;
        });
    }
    
    console.log(filterData);
    issueListContainer.innerHTML=''; 
    issueListContainer.innerHTML=`<h5><i class="fa-solid fa-list"></i>&nbsp List of Issues</h5>
    <ul type="none" id="ul-issues">`;
    let ul=document.getElementById('ul-issues');
         for(let item of filterData){
            let list=document.createElement('li');
            list.innerHTML=`
                <div class="card">
                    <span class="project-item card-title" ><b>Title :</b>&nbsp${item.title}</span>
                    <span class="project-item card-assigned"><b>Assigned :</b>&nbsp${item.assigned}</span>
                    <span class="project-item card-label"><b>Label :</b>&nbsp${item.label}</span>
                    <span class="project-item card-desription"><b>Isssue Details :</b>&nbsp${item.description}</span>
                    <span class="project-item card-date"><b>Created :</b>&nbsp${item.createdAt}</span>
                    <form action="/issue/delete/${item._id}" method="get"><button class="btn btn-danger"><i class="fa-solid fa-trash"></i>&nbsp Resolved</button></form>                   
                </div>`

            ul.appendChild(list);

        }    
}


// Search Ajax

function ajax2(title){
    $.ajax({
        url: `load/${url}`,
        type: "GET",
        dataType: "json",
        success: function(data) {
          handleSearch(data.message,title);
        }, 
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error:", textStatus, errorThrown);
        }
      });

}

// Function to Handle Search
function handleSearch(issues,title){
    let filterData=issues.filter(function(items){
        return items.title==title;
    });

    let issueListContainer=document.getElementById('list-of-issues');

    issueListContainer.innerHTML=''; 
    issueListContainer.innerHTML=`<h5><i class="fa-solid fa-list"></i>&nbsp List of Issues</h5>
    <ul type="none" id="ul-issues">`;
    let ul=document.getElementById('ul-issues');
         for(let item of filterData){
            let list=document.createElement('li');
            list.innerHTML=`
                <div class="card">
                    <span class="project-item card-title" ><b>Title :</b>&nbsp${item.title}</span>
                    <span class="project-item card-assigned"><b>Assigned :</b>&nbsp${item.assigned}</span>
                    <span class="project-item card-label"><b>Label :</b>&nbsp${item.label}</span>
                    <span class="project-item card-desription"><b>Isssue Details :</b>&nbsp${item.description}</span>
                    <span class="project-item card-date"><b>Created :</b>&nbsp${item.createdAt}</span>
                    <form action="/issue/delete/${item._id}" method="get"><button class="btn btn-danger"><i class="fa-solid fa-trash"></i>&nbsp Resolved</button></form>                   
                </div>`

            ul.appendChild(list);

        }    


}





let filterbutton=document.getElementById('submit-filter');
let labelDropdown=document.getElementById('label');
let assignedDropdown=document.getElementById('assigned');
let searchbutton=document.getElementById('submit-search');

searchbutton.addEventListener('click', function(event){
    let searchvalue=document.getElementById('search-value').value;
    document.getElementById('search-value').value='';
    event.preventDefault();
    ajax2(searchvalue);

})

filterbutton.addEventListener('click', function(event){
    event.preventDefault();
    // console.log(labelDropdown.value);
    // console.log(assignedDropdown.value);
    ajax(labelDropdown.value,assignedDropdown.value);
});




