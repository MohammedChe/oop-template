const title = document.querySelector("#ui_title");
const subtitle = document.querySelector("#ui_subtitle");
const studentName = document.querySelector("#ui_student_name");
const studentNumber = document.querySelector("#ui_student_number");
const stockHead = document.querySelector("#ui_stock_table_head");
const stockBody = document.querySelector("#ui_stock_table_body");

title.innerHTML = settings.projectTitle;
// subtitle.innerHTML = studentDetails.studentName;
studentName.innerHTML = settings.name;
studentNumber.innerHTML = settings.studentNumber;

// let studentClass = import(`../classes/${projectDetails.class}.js`);


let tableMaker = (storageProperty) => {

  let table = JSON.parse(localStorage.getItem(storageProperty));
  let headings = '';
  let rows = '';
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
let stockTable = tableMaker('stock');
stockHead.innerHTML = stockTable.headings;
stockBody.innerHTML = stockTable.rows;
