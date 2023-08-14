//By using these function we can able to find data in a particular table
function searchData() {
    var row = document.getElementsByTagName('tr');
    for(let j = 0;j < row.length; j++ ){
        row[j].style.backgroundColor = "wheat";
    }
    var data = document.getElementById("searchBar").elements["searchData"].value;
    var details = data.toLowerCase();
    var selectId = "";
  
    var divTags = document.getElementsByClassName("col-md-2");
    for (let i = 0; i < divTags.length; i++) {
       var index = divTags[i].innerText.toLowerCase().indexOf(details);
       if (index != -1) {
          selectId = divTags[i].parentNode.id;
          document.getElementById(selectId).scrollIntoView();
          document.getElementById(selectId).style.backgroundColor = 'yellow';
          break;
       }
    }  
 }

