<template>
    <div id="admin_container" >
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
        },
        mounted () {
            document.addEventListener('contextmenu', event => event.preventDefault())
            document.body.classList.add('cms')
        },
        head () {
            return {
                script: [
                    { src: 'https://code.jquery.com/jquery-3.2.1.slim.min.js' },
                    { src: 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.js' }
                ],
                link: [
                    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.css' }
                ]
            }
        }
    }
</script>
