import axios from 'axios'
const API_TOKEN = '035abd21428a2540e86af043eedca239d325dbd7'


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