'use strict';

const apiKey = 'slz9ELAph9rcw8m9IXI3CD3AbOvkIrW6dPJtzMuu';
const baseUrl = 'https://api.nps.gov/api/v1/parks';

function displayParksList(parks){
    console.log(parks.data.length);
    for(let i = 0; i < parks.data.length; i++){
        $('.parks_list').append(`
        <li>
            <h3>${parks.data[i].fullName}</h3>
            <p>${parks.data[i].description}</p>
            <span><a href="${parks.data[i].url}">Website</a></span>
        </li>`);
    }
}

function formatQueryParams(params){
    const queryItems = Object.keys(params).map( 
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    return queryItems.join('&');
}

function getParksList(statesList,maxResults){
    const params = {
        key: apiKey,
        stateCode: statesList,
        limit: maxResults
    }
    const queryString = formatQueryParams(params);  
    const url = baseUrl+'?'+queryString;
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(responseJson =>{
        $('.parks_list_area').removeClass('hidden');
    $('.parks_list').empty();

        displayParksList(responseJson);
    })
    .catch(err => console.log(err));
}



function handleForm(){
    $('form').submit(function(event){
        event.preventDefault();
        const statesList = $('#states_list').val();
        const maxResults = $('#max_results').val();
        console.log(`States: ${statesList} and max number : ${maxResults}`);
        getParksList(statesList,maxResults);    
    });
}


$(function(){
    handleForm();
})