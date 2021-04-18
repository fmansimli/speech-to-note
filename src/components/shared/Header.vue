<template>
    <div class="topnav" id="myTopnav" ref="rdiv">
        <router-link to="/" exact active-class="active">Speech To Note</router-link>
        <router-link to="/notes" v-if="user.idToken" active-class="active">Notes</router-link>
        <router-link to="/contact" active-class="active">Contact</router-link>
        <router-link to="/about" active-class="active">About</router-link>
        <router-link v-if="!user.idToken" to="/login" active-class="active" style="float:right;">
            Login
        </router-link>
        <router-link v-if="!user.idToken" to="/register" active-class="active" style="float:right;">
            Register
        </router-link>
        <a v-if="user.idToken" href="javascript:void(0);" @click="logout" style="float:right;">Logout</a>
        <a v-if="user.email" style="color:red;float:right;" href="javascript:void(0);" >
            {{user.email}}
        </a>
        <a href="javascript:void(0);" class="icon"  @click="resDiv">
            =
        </a>
    </div>

</template>

<script>
export default {
    name:'Header',
    computed:{
        user(){
            return this.$store.getters.vgetActiveUser;
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('logout');
        },
        resDiv(){
            const div = this.$refs.rdiv;
            if (div.className === "topnav") {
                div.className += " responsive";
            } else {
                div.className = "topnav";
            }
        }
    }
}
</script>
<style scoped>
    body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #333;
  padding: 5px 45px;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #4CAF50;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

</style>