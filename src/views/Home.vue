<template>
  <div id="home">
      <p>My name is <span style="color:sienna;"><b>Farid Mansimli</b></span>  👋</p>
      <p>I'm a freelance web and mobile developer 💻</p>
      <p>Really into NodeJS + Vue.js ❤️</p>
      <div id="err">
        <p>This site is for testing purposes only and is under development.
          That's why it's only optimized on chrome browser. Errors and bugs are normal 👋</p>
      </div>
      <p id="flw">You can follow me from the accounts below</p>
      <hr>
      <a href="https://www.facebook.com/fmansimli">Facebook </a> &nbsp;&nbsp;&nbsp;
       <a href="https://www.linkedin.com/in/faridmansimli/">Linkedin </a>&nbsp;&nbsp;&nbsp;
        <a href="https://twitter.com/faridmansimli">Twitter </a>&nbsp;&nbsp;&nbsp;
         <a href="https://www.instagram.com/faridmansimli/">Instagram </a>&nbsp;&nbsp;&nbsp;

  </div>
</template>

<style scoped>
  #home, button {
  font-family: "Helvetica Neue", sans-serif;
  font-size: 36px;
  font-weight: 200;
  text-align: center;
  margin-top: 50px;
}
#flw{
  color: red;
  font-family: unset;
}
#err {
  border:5px solid red;
  font-size:25px;
  font-weight: bold;
}

button {
  font-size: 18px;
}
a {
  font-size: 25px;
  font-weight: bold;
  font-family: cursive;
}


</style>