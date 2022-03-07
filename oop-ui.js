if(studentSettings.clearStorage ?? true){
  console.log("STORAGE CLEARED");
  localStorage.clear();
}

const title = document.querySelector("#ui_title");
const subtitle = document.querySelector("#ui_subtitle");
const studentName = document.querySelector("#ui_student_name");
const studentNumber = document.querySelector("#ui_student_number");
const stockHead = document.querySelector("#ui_stock_table_head");
const stockBody = document.querySelector("#ui_stock_table_body");
const stockRefresh = document.querySelector("#ui_stock_table_refresh");

const REFRESH_RATE = studentSettings.tableRefreshRate ?? 5;

title.innerHTML = studentSettings.projectTitle;
// subtitle.innerHTML = studentDetails.studentName;
studentName.innerHTML = studentSettings.name;
studentNumber.innerHTML = studentSettings.studentNumber;

// let studentClass = import(`../classes/${projectDetails.class}.js`);


let tableMaker = (storageProperty) => {
  let table = JSON.parse(localStorage.getItem(storageProperty));
  let headings = '';
  let rows = '';
  
  if(!table){
    return {
      headings,
      rows
    }
  }

  
  let products = Object.keys(table[0]);
  console.log("UI stock");
  console.log(products);

  products.forEach(element => {  
    headings += `<th>${element.charAt(0).toUpperCase() + element.slice(1)}</th>`; 
  });

  table.forEach(element => {  
    rows += '<tr>'
    console.log(element);
    products.forEach((td, i) => {  
      rows += `<td>${element[td]}</td>`; 
    });
    rows += '</tr>';
  });

  
  return {
    headings,
    rows
  }
}


//Stock table
function makeStockTable(){
  let stockTable = tableMaker('stock');
  stockHead.innerHTML = stockTable.headings;
  stockBody.innerHTML = stockTable.rows;  
}

let count = REFRESH_RATE + 1;
function stockTableCounter(){
  count--;
  if(count <= 0){
    count = REFRESH_RATE;
  }
  stockRefresh.innerHTML = count;
}

makeStockTable();
stockTableCounter();

setInterval(makeStockTable, REFRESH_RATE*1000);
setInterval(stockTableCounter, 1000);
