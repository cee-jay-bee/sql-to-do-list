$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    getTasks();
    $('#createTaskButton').on('click', createTask);
    $('#toDoList').on('click', '.removeTask', deleteTask);
    $('#toDoList').on('click', '.completeTask', completeTask);
}

function completeTask(){
    let completedTask = $(this).data('id');

    $.ajax({
        method: 'PUT',
        url:'/tasks?id=' + completedTask
    }).then(function(response){
        console.log('back from server', response);
        getTasks();
    }).catch(function(err){
        alert('Uh oh! There was an issue. Check console for details.');
        console.log(err);
    })
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
    let deleteID = $(this).data('id');
    console.log(deleteID);

    $.ajax({
        method: 'DELETE',
        url: '/tasks?id=' + deleteID
    }).then(function(response){
        console.log('back from server', response);
        getTasks();
    }).catch(function(err){
        alert('Uh oh! There was an issue. Check console for details.');
        console.log(err);
    })
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
            if (response[i].completed){
                tasksToDo.append(
                    `<li> <span class="completed"> ${response[i].task}</span>
                    <button class="removeTask" data-id="${response[i].id}">Delete</button></li>`);
            } else {
                tasksToDo.append(
                `<li> <span>${response[i].task} </span>
                <button class="removeTask" data-id="${response[i].id}">Delete</button>
                <button class="completeTask" data-id="${response[i].id}">Complete</button></li>`);
                }
        };
    }).catch(function(err){
        alert('Uh oh! There was an issue. Check console for details.');
        console.log(err);
    })
}