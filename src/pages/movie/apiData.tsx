import axios from "axios";

export const options = {
    method: 'GET',
    url: 'https://mdblist.p.rapidapi.com/',
    params: { i: 'tt0073195' },
    headers: {
        'X-RapidAPI-Key': '8463b6e131msh88790a275d6c7abp1bf763jsndf6af155901a',
        'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
}).catch(function (error) {
    console.error(error);
});