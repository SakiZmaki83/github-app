<template>
    <v-ons-page>
      <app-toolbar></app-toolbar>
  <div class="content">
      <app-search :query.sync="query"></app-search>
    
    <v-ons-list v-if="showList && !isLoading" >
      
      <v-ons-list-header>{{ query }}</v-ons-list-header>
        <v-ons-list-item v-for="(repo, index) in repos" :key="index">
               
        <div class="left">
          <!-- <img class="list-item__thumbnail" src="http://placekitten.com/g/40/40"> -->
               <img :src="makeAvatarUrl(query)" width="50px" /> 
        </div>
        <div class="center">
          <span class="list-item__title">{{ repo.name }}</span><span class="list-item__subtitle">{{ repo.content }}</span>
  </div>
          </v-ons-list-item>
        </v-ons-list>
       
  
     <p v-if="isLoading">
        <!-- <v-ons-progress-circular value="20"></v-ons-progress-circular> -->
        <!-- <v-ons-progress-circular value="40" secondary-value="80"></v-ons-progress-circular> -->
       <v-ons-progress-circular indeterminate></v-ons-progress-circular>
     </p>
 
    </div>   
    </v-ons-page>
</template>
<script>
import debounce from 'lodash/debounce'
import AppToolbar from './components/AppToolbar.vue'
import AppSearch from './components/AppSearch.vue'

import { gitHub } from "./services/GitHub.js"


  
  
  export default{
    components: {
      AppToolbar,
      AppSearch
      
      
    },
    data() {
      return {
        isLoading: false,
        query: '',
        repos: []
      };
    },
  methods: {
    getRepos: debounce(function(){
      gitHub.getRepos(this.query)
      .then(response => {
        this.repos=response.data
        this.isLoading = false
        }).catch(()=>{
          this.isLoading = false
        })
      //console.log(response)
    }, 1500),
     makeAvatarUrl(query) {
      return this.repos.length ? `https://github.com/${query}.png` : "#"
    }
    
  },

 watch: {
    query: function() {
      this.isLoading = true
      this.getRepos()
      }
    },
    computed: {
    showList() {
      return this.repos.length > 0 && this.query.length > 0
      }
    },
  };
</script>

