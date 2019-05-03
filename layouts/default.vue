<template>
    <div id="container" >
        <headerNav />
        <navbar />
        <nuxt />
    </div>
</template>

<script>
    import Navbar from '../components/Navbar'
    import HeaderNav from '../components/HeaderNav'
    export default {
        components: {
            Navbar,
            HeaderNav
        }
    }
</script>
