window.addEventListener("load", ()=>{
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  // console.log(todos);
  const nameselector = document.querySelector("#name");
  const todoform = document.querySelector("#todo-create");
  const username = localStorage.getItem('username') || '';
  nameselector.value = username;
  nameselector.addEventListener("change", (e)=>{
    localStorage.setItem('username',e.target.value);
  })

  todoform.addEventListener('submit', e =>{
    e.preventDefault();

    let radios = document.getElementsByName('category');
    // console.log(radios)
    let radiochecked = false;
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        radiochecked = true;
        break;
      }
    }
    // console.log(e.target);
    // console.log(e.target.elements);
    if(radiochecked){
      const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime()
      }
      // console.log(todo)
      todos.push(todo);
      localStorage.setItem('todos',JSON.stringify(todos))
      e.target.reset();
      DisplayTodos();
    }
    else{
      alert("Please select a category.");
      // e.preventDefault();
    }

  })

  DisplayTodos();
})



function DisplayTodos() {
  const todolists = document.querySelector('.lists');
  todolists.innerHTML = '';
  todos.sort((a,b)=>  b.createdAt - a.createdAt).forEach(todo => {
    // console.log(todo);

    // todolists.insertAdjacentHTML("beforeend",
    // let query =
    // `
    // <div class="todo-cards">
    //   <label>`;
    // if (todo.done){
    //   query += `<input type="checkbox" name="checkitem" id="checkitem" checked>`;
    // }
    // else{
    //   query += `<input type="checkbox" name="checkitem" id="checkitem">`;
    // }
    // if (todo.category === 'personal'){
    //   query += '<span class="circle personal"></span>';
    // }
    // else{
    //   query += '<span class="circle"></span>';
    // }
    // query +=`
    //   </label> `;
    // if (todo.done){
    //   query += `<input type="text" value="${todo.content}" readonly class="done"></input>`;
    // }
    // else{
    //   query += `<input type="text" value="${todo.content}" readonly></input>`;
    // }
    // query += `
    //   <div class="buttons">
    //     <button class="btn"><i class="fa-solid fa-pen-to-square edit"></i></button>
    //     <button class="btn"><i class="fa-solid fa-trash delete"></i></button>
    //   </div>
    // </div>
    // `;
    // todolists.insertAdjacentHTML('beforeend', query);
    // todolists.addEventListener("click",e=>{
    //   todo.done = e.target.checked;
    //   localStorage.setItem('todos',JSON.stringify(todos));
    //   // console.log(e.currentTarget);
    //   if (todo.done){

    //   }
    // })



    const todocards = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const checkbox = document.createElement('input');
    const span = document.createElement('span');
    const buttondiv = document.createElement('div');
    const editbutton = document.createElement('button');
    const delbutton = document.createElement('button');
    const editicon = document.createElement('i');
    const delicon = document.createElement('i')
    // const todocards = document.createElement('div');

    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    span.classList.add('circle');
    if (todo.category === 'personal'){
      span.classList.add('personal');
    }else{
      span.classList.add('business');
    }


    input.type = 'text';
    input.value = todo.content;
    input.readOnly = true;


    editicon.classList.add('fa-solid');
    editicon.classList.add('fa-pen-to-square');
    editicon.classList.add('edit');
    delicon.classList.add('fa-solid');
    delicon.classList.add('fa-trash');
    delicon.classList.add('delete');
    editbutton.appendChild(editicon);
    delbutton.appendChild(delicon);
    editbutton.classList.add('btn');
    delbutton.classList.add('btn');
    buttondiv.appendChild(editbutton);
    buttondiv.appendChild(delbutton);
    buttondiv.classList.add('button');





    label.appendChild(checkbox);
    label.appendChild(span);


    todocards.classList.add('todo-cards')

    todocards.appendChild(label);
    todocards.appendChild(input);
    todocards.appendChild(buttondiv);
    todolists.appendChild(todocards);


    // ----- make a cross for text after selecting checkbox
    if (todo.done) {
			input.classList.add('done');
		}
    checkbox.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				input.classList.add('done');
			} else {
				input.classList.remove('done');
			}

			DisplayTodos()

		});

    //---------------edit ---------------
    editicon.addEventListener('click',e=>{
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
    });


    delicon.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		});


  });
}

// const check = todolists.querySelector('.todo-cards');
// console.log(check);
    // check.addEventListener("click",(e)=>{
    //   console.log(e.target)
    // })

// todolists.addEventListener('click',e=>{
//   console.log(e.currentTarget);
// })
