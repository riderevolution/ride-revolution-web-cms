<template>
    <div id="admin_container" >
        <transition name="slide">
            <div id="success" class="cms_alert" v-if="$store.state.isNotify">
                Content has been {{ $store.state.notificationMessage }}!
            </div>
        </transition>
        <navbar v-if="$store.state.isAuth" />
        <div class="admin_flex">
            <headerNav v-if="$store.state.isAuth" />
            <nuxt />
        </div>
        <transition name="fade">
            <loading v-if="$store.state.isLoading" />
        </transition>
        <transition name="fade">
            <error-status v-if="$store.state.errorStatus" />
        </transition>
        <transition name="fade">
            <password-sent v-if="$store.state.resetStatus" />
        </transition>
        <transition name="fade">
            <reset-successful v-if="$store.state.resetSuccessfulStatus" />
        </transition>
        <transition name="fade">
            <quick-sale v-if="$store.state.quickSaleStatus" />
        </transition>
        <transition name="fade">
            <successful v-if="$store.state.successfulStatus" />
        </transition>
    </div>
</template>

<script>
    import Navbar from '../components/Navbar'
    import Loading from '../components/Loading'
    import HeaderNav from '../components/HeaderNav'
    import ErrorStatus from '../components/modals/Error'
    import PasswordSent from '../components/modals/PasswordSent'
    import ResetSuccessful from '../components/modals/ResetSuccessful'
    import QuickSale from '../components/modals/QuickSale'
    import Successful from '../components/modals/Successful'
    export default {
        components: {
            Navbar,
            Loading,
            HeaderNav,
            ErrorStatus,
            PasswordSent,
            ResetSuccessful,
            QuickSale,
            Successful
        },
        data () {
            return {
                routes: [
                    '/login',
                    '/forgot-password',
                    '/reset-password'
                ]
            }
        },
        async mounted () {
            const me = this
            if (!me.routes.includes(me.$route.path)) {
                await me.validateToken()
            }
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
