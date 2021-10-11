$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    getTasks();
    $('#createTaskButton').on('click', createTask);
    $('#toDoList').on('click', '.removeTask', deleteTask);
}

function createTask(){
    let taskToSend = {
        task:$(`#taskInput`).val()
    }

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then(function(response){
        getTasks();
        $(`#taskInput`).val('');
    }).catch(function(err){
        alert('Uh oh! There was an issue. Check console for details.');
        console.log(err);
    })
}

function deleteTask(){
    
}

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function(response){
        console.log('back from Get:', response);
        let tasksToDo = $('#toDoList');
        tasksToDo.empty();
        for(let i=0; i<response.length; i++) {
            tasksToDo.append(
                `<li> ${response[i].task} 
                <button class="removeTask" data-id="${i}">Delete</button></li>`
            );
        };

    }).catch(function(err){
        alert('Uh oh! There was an issue. Check console for details.');
        console.log(err);
    })
}