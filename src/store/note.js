import axios from 'axios'
import user from './user'
const state = {
    notes :[]
}

const getters = {
    vgetNotes:(state)=>{
        return state.notes.reverse();
    }
}

const mutations = {
    vaddNote:(state,note)=>{
        state.notes.push(note);
    },
    vupdateNotes:(state,notes)=>{
        state.notes=notes;
    },
    vremoveNote:(state,key)=>{
        state.notes.splice(state.notes.findIndex(n=>n.key===key),1);
    }
}

const actions = {
    
    postNote:async({commit},note)=>{
        const db_url="https://speech-note-9ebc6-default-rtdb.firebaseio.com/";
        try{
            const resp = await  axios.post(db_url+`${user.state.activeUser.localId}.json`,note);
            note.key=resp.data.name;
            commit('vaddNote',note);
        }
        catch(err){
            console.log(err);
        }
    },
    initNotes:async({commit})=>{
        const db_url="https://speech-note-9ebc6-default-rtdb.firebaseio.com/";
        try{
            const resp = await axios.get(db_url+`${user.state.activeUser.localId}.json`);
            if(!resp.data){
                return;
            }
            let notes= [];
            for(const [key,note] of Object.entries(resp.data)){
                note.key = key;
                notes.push(note);
            }
            commit('vupdateNotes',notes);            
        }
        catch(err){
            console.error(err);
        }
    } ,
    deleteAll:async({commit})=>{
        try{
            const db_url="https://speech-note-9ebc6-default-rtdb.firebaseio.com/";
            const resp = await axios.delete(db_url+`${user.state.activeUser.localId}.json`);
            commit('vupdateNotes',[]);
        }catch(err){
            console.error(err);
        }
    } ,
    vremoveNoteById:async({commit},id)=>{
       try{
            const db_url="https://speech-note-9ebc6-default-rtdb.firebaseio.com/";
            const resp = await axios.delete(db_url+`${user.state.activeUser.localId}/${id}.json`);
            commit('vremoveNote',id);
        }catch(err){
            console.error(err);
        } 
    }
}

export default {
    state,getters,mutations,actions
}