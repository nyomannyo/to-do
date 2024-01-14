// arrow function
displayTodo = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    let list = "";
  
    // jik ada data todos di dalam localStorage
    if (todos) {
      for (let i = 0; i < todos.length; i++) {
        list += `
                  <ul class="list-group list-group-horizontal rounded-0 bg-transparent m-2">
                      <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                          <div class="form-check">
                              <input type="checkbox" class="form-check-input me-0" id="${
                                todos[i].id
                              }" aria-label="..." onchange="setComplete(this.checked, this.id)" ${
          todos[i].checked ? "checked" : ""
        } />
                          </div>
                      </li>
                  
                      <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                          <p class="lead fw-normal mb-0 ${
                            todos[i].checked
                              ? "text-decoration-line-through text-black-50"
                              : ""
                          }">${todos[i].name}</p>
                      </li>
                      
                      <li class="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                          <button class="btn btn-danger" type="button" id="${
                            todos[i].id
                          }" onclick="deleteTodo(this.id);">Delete</button>
                      </li>
                  </ul>
              `;
      }
    }
  
    document.getElementById("list-todo").innerHTML = list;
  };
  
  submitTodo = () => {
    const inputTodo = document.getElementById("add-todo").value;
  
    let todos = JSON.parse(localStorage.getItem("todos"));
  
    if (todos) {
      // push object ke dalam array
      todos.push({
        id: todos[todos.length - 1].id + 1,
        name: inputTodo,
        checked: false,
      });
    } else {
      todos = [
        {
          id: 0,
          name: inputTodo,
          checked: false,
        },
      ];
    }
  
    // simpan ke dalam localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  
    // bersihkn / clear input todo saat ini
    document.getElementById("add-todo").value = "";
  
    // tampilkan todo
    displayTodo();
  };
  
  setComplete = (checked, id) => {
    console.log(checked, id);
    let todos = JSON.parse(localStorage.getItem("todos"));
  
    todos = todos.map((todo) => {
      if (todo.id === Number(id)) {
        todo.checked = checked;
      }
      return todo;
    });
  
    localStorage.setItem("todos", JSON.stringify(todos));
  
    displayTodo();
  };
  
  deleteTodo = (id) => {
    Swal.fire({
      icon: "question",
      title: "Apakah Anda yakin ingin menghapus data ini?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Ya, Hapus",
      denyButtonText: `Batalkan`,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        let todos = JSON.parse(localStorage.getItem("todos"));
  
        todos = todos.filter((todo) => todo.id !== Number(id));
  
        if (todos.length) {
          localStorage.setItem("todos", JSON.stringify(todos));
        } else {
          // menghapus local storage
          localStorage.removeItem("todos");
        }
  
        Swal.fire({
          icon: "success",
          title: "Data ToDo berhasil dihapus!",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
              window.location.reload();
          }
        });
  
  
      } else if (result.isDenied) {
        Swal.fire({
          icon: "info",
          title: "Data ToDo tidak jadi dihapus!",
        });
      }
    });
  
    displayTodo();
  };
  
  let inputTodo = document.getElementById("add-todo");
  inputTodo.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      document.getElementById("btn-add-todo").click();
    }
  });
  