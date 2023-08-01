// THIS FILE CONTAIN 4 TASKS FOR TODO LIST 
/** 1. ADDING THE TASKS
 *  2. DELETING THE TASKS
 *  3. TOGGLING THE TASKS
 *  4. COUNTING THE TASKS
 */


const todolist = (()=>{
    // todo list text box 
    var textbox = document.getElementById('textbox');
    var addbtn = document.getElementById('add-container');
    var listContainer = document.getElementById('list-container');
    var listItem;
    var tasks_counter_container = document.getElementById('tasks-counter-container');

    var tasks = [];
    
    // adding event to the textbox when focus goes to it
    textbox.addEventListener('focus', ()=>{
        addbtn.style.display='block';
    })

    // Counting A Task
    function countingTask(){
        let completedTask = tasks.filter(function (task){
            return task.completed === true;
        })
        
        let len = tasks.length - completedTask.length;
        tasks_counter_container.innerHTML = `<span class="counter" >
            ${len} Tasks Left
        </span>

        <span id="complete-uncomplete">
            <b>All</b>&nbsp;Uncomplete&nbsp;Complete
        </span>`;

        
    }

    // Toggle a task
    function toggleTask (taskId) {
        console.log('toggle');
        const curtask = tasks.filter(function (task){
            return task.id === Number(taskId);
        });
        if(tasks.length > 0){
            const cur = curtask[0];
            cur.completed = !cur.completed;
            renderList();
            countingTask();
            return;
        }
    }

    // Deleting Task
    function deleteTask (taskId) {
        console.log('delete task', taskId);
        const newTasks = tasks.filter(function (task){
            return task.id !== Number(taskId);
        })
    
        tasks = newTasks;
        listContainer.innerHTML = "";
        renderList();
        countingTask();
    }

    // Add Task To DOM
    function addTaskToDom(task){
        listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.innerHTML = `     
            <div class="round">
                <input type="checkbox" class = "checkbox" id="${task.id}" data-id="${task.id}" ${task.completed? 'checked':''}>
                <label for="${task.id}" ></label>
                </div>
 
                <div class="task_name">
                    ${task.title}
                </div>

                <div class="delete" id ="delete" data-id="${task.id}">
                    <i class="fa-solid fa-trash-can fa-xl" style="color: rgb(230, 9, 64);" id="${task.id}"></i>
                </div> 
        
      `;
      listContainer.append(listItem);
      textbox.value = '';
    }

    // RenDer the list
    function renderList () {
        listContainer.innerHTML = "";
        for(let i = 0; i < tasks.length; i++){
            addTaskToDom(tasks[i]);
        }
    
        // tasksCounter.innerHTML = tasks.length;
    }
    // Function Add Tasks
    function addTask(task){
        console.log('addtask function')
        if(task){
            tasks.push(task);
            renderList();
            countingTask();
            return;
        }
    }
   
    // addEvent on add button to add the task from TODO LIST
    addbtn.addEventListener('click', (e)=>{
        console.log('adding');
        const text = textbox.value;
        console.log(text)
        if(!text){
            return;
        }

        const task = {
            title: text,
            id: Date.now(),
            completed: false
        }

        addbtn.style.display='none';

        addTask(task)
    });

    // Handling click event on document
    function handleClickListener(e){
        const target = e.target;
    
        console.log(target.id);
    
        if(target.className === 'fa-solid fa-trash-can fa-xl'){
            const taskId = target.id;
            console.log('delete',taskId);
            deleteTask(taskId);
            return;
        }
        else if(target.className === 'checkbox'){
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    
    }

    function initializer(){
        document.addEventListener('click', handleClickListener);
    }

    return {
        inialize : initializer,
    }

})();

// Initailize the to Do list
todolist.inialize();