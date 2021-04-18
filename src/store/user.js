import axios from 'axios'
import router from '@/router/index.js'
const state = {
    activeUser :{
        idToken:'',
        email:'',
        expiresIn:null
    },
    apiKey:'AIzaSyCzwgN-8HjCfTCQJ1ihRwslQMIPM3bqDUo',
}

const getters = {
    vgetActiveUser :(state)=>{
        return state.activeUser;
    }
}

const mutations = {
    vsetToken:(state,token)=>{
        state.activeUser.idToken = token;
    },
    vclearToken:(state)=>{
        state.activeUser.idToken = '';
    },
    vsetActiveUser:(state,userData)=>{
        state.activeUser = userData;
    },
    vclearActiveUser:(state)=>{
        state.activeUser ={idToken:'',email:'',expiresIn:null,localId:''};
    }
}

const actions = {
    login : async({commit,dispatch},loginData)=>{
        try{
            const login_url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzwgN-8HjCfTCQJ1ihRwslQMIPM3bqDUo";
            const resp =await axios.post(login_url,loginData);
            const {email,localId,refreshToken,idToken,expiresIn} = resp.data;
            const authData = {
                email,
                expDate:expiresIn*1000+new Date().getTime(),
                idToken,refreshToken,localId
            }
            localStorage.setItem('authData',JSON.stringify(authData));
            commit('vsetActiveUser',authData);
            router.replace('/');
            dispatch('logoutTimer',expiresIn*1000);

        }
        catch(err){
            router.replace('/login#reject');
        }
    },
    register:async({},regData)=>{
        try{
            const signup_url= "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzwgN-8HjCfTCQJ1ihRwslQMIPM3bqDUo";
            await axios.post(signup_url,regData);
            router.replace('/login');
        }
        catch(err){
            console.log(err);
        }
    },
    logout:({commit})=>{
        localStorage.removeItem('authData');
        commit('vclearActiveUser');
        router.replace('/login');
    },
    logoutTimer:({dispatch},second)=>{
        setTimeout(()=>{
            dispatch('logout');
        },second);
    },
    initApp:async ({commit,dispatch,state})=>{
        const activeUser = JSON.parse(localStorage.getItem('authData'));
        if(!activeUser){
            dispatch('logout');
            return;
        }
        if(activeUser.expDate<= new Date().getTime()){
            dispatch('logout');
        }else{
            dispatch('logoutTimer',activeUser.expDate-new Date().getTime());
            commit('vsetActiveUser',activeUser);
        }
        
    }
}

export default {
    state,getters,mutations,actions
}