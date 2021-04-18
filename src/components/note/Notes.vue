<template>
   <div class="container">
        <header>
            <h3>{{speechToText!==null?speechToText:"Speech To Note"}}</h3>
            <label class="toggle" for="toggle">
                <input id="toggle" type="checkbox" name="toggle" @click="speak" ref="sp" />
                <span class="slider"></span>
            </label><a id="clear" style="cursor:pointer;" v-if="notes.length" @click="deleteAll">Clear</a>
        </header>
        <div>
            <input v-if="notes.length" type="text" v-model="filter" placeholder="Search..."  id="sss">
            <div v-for="note in filteredNotes" :key="note.key" class="paper">
                {{note.text}}
                <a href="javascript:void(0);" id="dlt" @click="deleteNoteById(note.key)"> delete</a>
            </div>
        </div> 
  </div>


</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:"Notes",
    data(){
        return {
            speechToText:null,
            isListening:false,
            recognition:null,
            filter:''
        }
    },
    computed:{
        ...mapGetters({
            notes:'vgetNotes'
        }),
        filteredNotes(){
          return this.notes.filter(n=>n.text.includes(this.filter));
        }
    },
    methods:{
        speak(){
            this.isListening = !this.isListening;
            if(this.isListening){
                this.recognition.start();
            }else{
                this.recognition.stop();
            }
        },
        record(event){
            this.$refs.sp.click();
            this.speechToText = event.results[0][0].transcript;
            setTimeout(()=>{
                this.addNote(this.speechToText);
            },2000)
        },
        reset(){
           this.recognition.stop();
        },
        addNote(text){
            this.$store.dispatch('postNote',{
                no:this.notes.length+1,
                text
            });
            this.speechToText = null;
        },
        deleteNote(no){
            this.$store.commit('vremoveNote',no);
        },
        deleteNoteById(id){
            if(confirm("do you want to delete this note ??")){
              this.$store.dispatch('vremoveNoteById',id);
            }
        },
        deleteAll(){
            if(confirm("all notes will be delete.. are you sure?")){
                this.$store.dispatch('deleteAll');
            }
        }
    },
    mounted(){
        this.recognition = new webkitSpeechRecognition();
        this.recognition.lang = 'az';
        this.recognition.onresult = this.record;
    }
}
</script>

<style scoped>
  *,
*:after,
*:before {
  box-sizing: border-box;
}
#dlt{
  font-size:25px;
  float:right;
}

body {
  margin: 0;
  background: #f4f4f4;
}
#sss {
  width: 100%;
  margin-bottom: 15px;
  height: 35px;
  padding: 7px 15px;
  border-radius: 3px;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}

header {
  width: 100%;
  text-align: center;
  color: #888;
  font-family: "Dosis";
  font-size: 2rem;
  position: relative;
}
@media (max-width: 480px) {
  header {
    font-size: 1rem;
  }
}
header a {
  position: absolute;
  bottom: 30px;
  right: 30%;
  font-size: 1.3rem;
  text-decoration: none;
  color: orange;
  transition: all 200ms;
}
header a:hover {
  color: red;
  text-decoration: underline;
}
@media (max-width: 480px) {
  header a {
    right: 10px;
  }
}
header h1 {
  margin-bottom: 0;
}
header .toggle {
  margin: 25px auto;
  width: 60px;
  height: 34px;
  position: relative;
  display: block;
  color: #fff;
}
header .toggle span {
  display: block;
  background: #888;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  border-radius: 25px;
  transition: all 300ms ease-in-out;
  font-size: 16px;
  line-height: 35px;
}
header .toggle span:before {
  position: absolute;
  top: 0;
  right: 8px;
  content: "Off";
}
header .toggle span:after {
  content: "";
  width: 25px;
  height: 25px;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 25px;
  background: #fff;
  transition: all 300ms ease-in-out;
}
header .toggle input[type=checkbox] {
  opacity: 0;
}
header .toggle input[type=checkbox]:checked + span {
  background: teal;
}
header .toggle input[type=checkbox]:checked + span:after {
  transform: translateX(25px);
}
header .toggle input[type=checkbox]:checked + span:before {
  content: "On";
  right: auto;
  left: 8px;
}

.paper {
  width: 600px;
  margin: 0 auto;
  margin-bottom: 50px;
  background: #fff;
  box-shadow: -5px 10px 10px rgba(0, 0, 0, 0.1), inset 0 0 300px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem 1rem 3rem;
  background: -webkit-linear-gradient(top, lightblue 0%, #fff 8%);
  background-position: 0 4px;
  background-size: 100% 3rem;
  position: relative;
  line-height: 3rem;
}
@media (max-width: 640px) {
  .paper {
    width: 95%;
  }
}
@media (max-width: 480px) {
  .paper {
    line-height: 2rem;
    background-size: 100% 2rem;
  }
}

.paper p {
  margin: 0 0 3rem 0;
  font-size: 28px;
  font-family: "Architects Daughter", "Dosis", sans-serif;
  letter-spacing: 2px;
  color: #777;
  font-weight: 200;
}
@media (max-width: 480px) {
  .paper p {
    font-size: 16px;
  }
}

.paper:before {
  position: absolute;
  content: "";
  width: 4px;
  left: 30px;
  top: 0;
  bottom: 0;
  border: 1px solid;
  border-color: transparent orangered;
}
</style>
