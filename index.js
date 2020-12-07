var todo_items = 0;
window.onload = function(){

  var todo = document.getElementById("todo");
  var todo_form = todo.querySelector("#todo-form");
  todo_form.onsubmit = function(e){
    var todo_input = e.target.querySelector("input[name='todo']");
    var todo_name;
    if(todo_input.dataset.edit == "true"){
      var todo_item_id = todo_input.dataset.id;
      todo_name = todo.querySelector(".tasks #item" + todo_item_id + " .todo-name");
      todo_name.textContent = todo_input.value;
      todo_input.dataset.edit = false;
      todo_input.dataset.id = "";
    }else{

      var todo_value = todo_input.value;

      var item = document.createElement("tr");
      item.id = "item"+todo_items;

      var todo_check = document.createElement("td");
      todo_check.setAttribute("class", "check fa fa-square");
      todo_check.dataset.id = todo_items;
      todo_check.dataset.checked = false;
      todo_check.onclick = function(e){
        var todo_item_id = e.target.dataset.id;
        var todo_name = todo.querySelector(".tasks #item" + todo_item_id + " .todo-name");
        if(e.target.dataset.checked == "true"){
          e.target.setAttribute("class", "check fa fa-square");
          todo_name.style.textDecoration = "";
          e.target.dataset.checked = false;
        }else{
          e.target.setAttribute("class", "check fa fa-check-square");
          todo_name.style.textDecoration = "line-through";
          e.target.dataset.checked = true;
        }
      };
      item.appendChild(todo_check);

      todo_name = document.createElement("td");
      todo_name.setAttribute("class","todo-name");
      todo_name.textContent = todo_value;
      item.appendChild(todo_name);

      var edit_delete = document.createElement("td");

      var edit_button = document.createElement("a");
      edit_button.href = "#";
      edit_button.textContent = "Edit";
      edit_button.dataset.id = todo_items;
      edit_button.onclick = function(e){
        var todo_item_id = e.target.dataset.id;
        var todo_name = todo.querySelector(".tasks #item" + todo_item_id + " .todo-name");
        var todo_input = todo.querySelector("#todo-form input[name='todo']");
        todo_input.value = todo_name.textContent;
        todo_input.dataset.edit = true;
        todo_input.dataset.id = todo_item_id;

        return false;
      };
      edit_delete.appendChild(edit_button);

      edit_delete.appendChild(document.createTextNode(" | "));

      var delete_button = document.createElement("a");
      delete_button.href = "#";
      delete_button.textContent = "Delete";
      delete_button.dataset.id = todo_items;
      delete_button.onclick = function(e){
        var todo_item_id = e.target.dataset.id;
        var todo_item = todo.querySelector(".tasks #item" + todo_item_id);
        todo_item.parentNode.removeChild(todo_item);
        return false;
      };
      edit_delete.appendChild(delete_button);

      item.appendChild(edit_delete);

      var tasks = todo.querySelector(".tasks");
      tasks.appendChild(item);

      todo_items++;
    }
    return false;
  };
};
