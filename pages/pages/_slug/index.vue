<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/pages" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Pages</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">{{ replacer($route.params.slug) }}</h1>
                    </div>
                </section>
                <section id="content">
                    <page-form :data="res" :slug="`${$route.params.slug}`" :hasImage="($route.query.n) ? false : true" :hasTeaser="($route.query.t) ? true : false" :isHome="($route.query.h) ? true : false" />
                </section>
            </div>
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../components/Foot'
    import PageForm from '../../../components/PageForm'
    export default {
        components: {
            Foot,
            PageForm
        },
        data () {
            return {
                res: [],
                loaded: false
            }
        },
        methods: {
            fetchData () {
                const me = this
                me.loader(true)
                me.$axios.get(`api/page-settings/${me.$route.params.slug}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data.pageSettings
                            me.loaded = true
                        }, 500)
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            }
        },
        mounted () {
            const me = this
            me.fetchData()
        }
    }
</script>
