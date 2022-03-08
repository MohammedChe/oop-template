
const title = document.querySelector("#ui_title");
const studentName = document.querySelector("#ui_student_name");
const studentNumber = document.querySelector("#ui_student_number");
const assignmentNumber = document.querySelector("#ui_assignment_number");
const output = document.querySelector("#ui_output");

title.innerHTML = studentSettings.assignmentTitle;
studentName.innerHTML = studentSettings.studentName;
studentNumber.innerHTML = studentSettings.studentNumber;
assignmentNumber.innerHTML = studentSettings.assignmentNumber;

const sectionDiv = document.querySelector("#ui_section_div");

let section = (label, tableName, data, refresh = false) => {

  let table = tableMaker(data);

  let sectionHTML = `
    <section id="ui_${tableName}_table_section" class="section pt-1">
    <div class="container">
      <article class="message is-light pb-4">
        <div class="message-header">
          <p>${label}</p>
        </div>
        <div class="message-body ml-5">
          <div class="table-container">
            <table class="table is-narrow is-bordered has-background-white-bis">
            <thead>
              <tr id="ui_${tableName}_table_head">
              ${table.headings}
              </tr>
            </thead>
            <tbody id="ui_${tableName}_table_body">
            ${table.rows}
            </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
  </section>
  `

  if(refresh){
    sectionHTML = `
    <div class="container">
      <article class="message is-light pb-4">
        <div class="message-header">
          <p>${tableName.charAt(0).toUpperCase() + tableName.slice(1)}</p>
        </div>
        <div class="message-body ml-5">
          <div class="table-container">
            <table class="table is-narrow is-bordered has-background-white-bis">
            <thead>
              <tr id="ui_${tableName}_table_head">
              ${table.headings}
              </tr>
            </thead>
            <tbody id="ui_${tableName}_table_body">
            ${table.rows}
            </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
  `
  }

  return sectionHTML;
}

let tableMaker = (table) => {

  let headings = '';
  let rows = '';
  
  if(!table){
    return {
      headings,
      rows
    }
  }

  let products = Object.keys(table[0]);

  products.forEach(element => {  
    headings += `<th>${element.charAt(0).toUpperCase() + element.slice(1)}</th>`; 
  });

  table.forEach(element => {  
    rows += '<tr>'
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

function UITable(label, data) {
  let name = label.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  label = label.charAt(0).toUpperCase() + label.slice(1);

  console.log(label);
  const tableSection = document.querySelector(`#ui_${name}_table_section`);

  if(tableSection){
    tableSection.innerHTML = section(label, name, data, true)
  }
  else{
    sectionDiv.innerHTML += section(label, name, data);
  }
  
}

function UIOutput(html){
  output.innerHTML += html;
}


let displayTester = () => {
  if(testsArray.includes(studentSettings.assignmentNumber)){

    let runTests = document.querySelector('#ui_run_test');
  
    runTests.innerHTML = `<button class="button is-primary is-outlined">Run Tests</button>`;
  
    runTests.addEventListener('click', () => {
      mocha.run();
    });
  
    let mocha_css = document.createElement('link');
    mocha_css.setAttribute('rel','stylesheet');
    mocha_css.setAttribute('href','https://cdn.jsdelivr.net/gh/MohammedChe/oop-template@main/lib/mocha.css');
    document.head.appendChild(mocha_css);
  
    function loadScripts(array,callback){
      var loader = function(src,handler){
          var script = document.createElement("script");
          script.src = src;
          script.onload = script.onreadystatechange = function(){
              script.onreadystatechange = script.onload = null;
              handler();
          }
          document.body.appendChild(script);
      };
      (function run(){
          if(array.length!=0){
              loader(array.shift(), run);
          }else{
              callback && callback();
          }
      })();
  }
  
  loadScripts([
    "https://cdn.jsdelivr.net/gh/MohammedChe/oop-template@main/lib/chai.js",
    "https://cdn.jsdelivr.net/gh/MohammedChe/oop-template@main/lib/mocha.js"
  ],function(){
    mocha.setup({
      ui: 'bdd',
      fullTrace: false
    });
  
    // `https://cdn.jsdelivr.net/gh/MohammedChe/oop-template@main/tests/${studentSettings.assignmentNumber}.js`
    loadScripts([
      `https://cdn.jsdelivr.net/gh/MohammedChe/oop-template/tests/${studentSettings.assignmentNumber}.js`,
    ], function(){
      
      if(studentSettings.includeStack){
        chai.config.includeStack = true;
      }
      else{
        chai.config.includeStack = false;
        after(function () {
          // runs after each test in this block
          let testBlock = document.querySelectorAll('#mocha-report .suite pre.error');
          console.log(testBlock);
          testBlock.forEach((el) => {
            el.style.display = "none";
          });
          
        });
      }
      
    })
  });
  
  
    // let setupTests = async () => {
  
    //   await setupLibs();
    //   let test_script = document.createElement('script');
    //   test_script.setAttribute('src',`includes/${studentSettings.assignmentNumber}.js`);
    //   document.body.appendChild(test_script);
    // }
    
    // let setupLibs = async () => {
    //   let chai_script = document.createElement('script');
    //   let mocha_script = document.createElement('script');
    //   let mocha_css = document.createElement('link');
    
    //   chai_script.setAttribute('src','https://cdn.jsdelivr.net/gh/MohammedChe/oop-template@latest/lib/chai.js');
    //   mocha_script.setAttribute('src','https://cdn.jsdelivr.net/gh/MohammedChe/oop-template@latest/lib/mocha.js');
    //   mocha_css.setAttribute('rel','stylesheet');
    //   mocha_css.setAttribute('href','https://cdn.jsdelivr.net/gh/MohammedChe/oop-template@latest/lib/mocha.css');
    
    //   // chai_script.onload = () => {
    
    //   // };
    //   document.body.appendChild(chai_script);
    //   document.body.appendChild(mocha_script);
    //   document.head.appendChild(mocha_css);
    
    // }
    
    // setupTests();  
  }
}


fetch('https://raw.githubusercontent.com/MohammedChe/oop-template/main/assignment_tests.json')
  .then(response => response.json())
  .then(data => testsArray = data)
  .then(() => {
    displayTester()
  });
