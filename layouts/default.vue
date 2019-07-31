<template>
    <div id="admin_container" >
        <navbar v-if="$store.state.isAuth" />
        <div class="admin_flex">
            <headerNav v-if="$store.state.isAuth" />
            <nuxt />
        </div>
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
        async mounted () {
            const me = this
            await me.validateToken()
            document.addEventListener('contextmenu', event => event.preventDefault())
            document.body.classList.add('cms')
        },
        head () {
            return {
                title: 'Ride Revolution | Admin Panel',
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
