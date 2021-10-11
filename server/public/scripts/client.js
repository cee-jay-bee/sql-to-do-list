$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    getTasks();
}

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function(response){
        console.log('back from Get:', response);

    }).catch(function(err){
        alert('Uh oh! There was an issue. Check console for details.');
        console.log(err);
    })
}