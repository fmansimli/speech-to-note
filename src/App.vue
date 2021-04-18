<template>
    <div>
        <app-header></app-header>
        <router-view></router-view>
    </div>
</template>
<script>

import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
export default {
    name:'App',
    components:{
        appHeader:Header,
        appFooter:Footer
    },
    created(){
        this.$store.dispatch('initApp');
        this.$store.dispatch('initNotes');
    }
}
</script>
