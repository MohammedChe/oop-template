function UIAttach(obj){
  let key;
  let value;
  if(obj instanceof Object && Object.keys(obj) && Object.keys(obj)[0] && typeof(Object.keys(obj)[0]) === 'string'){
    key = Object.keys(obj)[0];
    value = Object.values(obj)[0];
    window[key] = value;
  }
  else{
    alert("There's an error in one of your UIAttach, Are you forgetting the {}? Example: UIAttach({Book});");
  }
}
