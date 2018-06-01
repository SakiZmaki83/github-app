import axios from 'axios'
const API_TOKEN = '3bd2132467a031a22b2f51434b071701530ce1ce'


export default class GitHub{
    constructor(){
        axios.defaults.baseURL = 'https://api.github.com/'
        axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}` 
    }

getRepos(username){
    return axios.get(`users/${username}/repos`)
    }
}

export const gitHub = new GitHub()