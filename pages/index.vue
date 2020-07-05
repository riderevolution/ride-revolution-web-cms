<template>
    <transition name="fade">
        <div class="content" v-if="$store.state.isAuth">
                <div id="admin" class="cms_dashboard">
                    <section id="top_content">
                        <h1 class="header_title">Dashboard</h1>
                    </section>
                    <section id="content" class="pad_alt">
                        <div class="cms_col_four">
                            <div class="cms_col" v-for="(data, key) in res" :key="key">
                                <nuxt-link :to="data.link" class="wrapper">
                                    <div class="total_image">
                                        <img class="front" :src="data.imgSrc" />
                                        <img class="back" :src="data.imgSrc" />
                                    </div>
                                    <div class="total_count">{{ data.count }}</div>
                                    <div class="total_text">{{ data.label }}</div>
                                </nuxt-link>
                            </div>
                        </div>
                    </section>
                </div>
            <foot v-if="$store.state.isAuth" />
        </div>
    </transition>
</template>

<script>
    import Foot from '../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                res: [
                    {
                        label: 'Inquiries',
                        imgSrc: '/icons/system-emails-icon.svg',
                        link: '/content-type/inquiry',
                        count: 0
                    }
                ]
            }
        },
        methods: {
            fetchData () {
                const me = this
                me.loader(true)
                me.$axios.get('api/inquiries').then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res[0].count = res.data.inquiries.data.length
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
            let token = me.$cookies.get('token')
            if (token != null || token != undefined) {
                setTimeout( () => {
                    me.fetchData()
                }, 500)
            }
            me.validateToken()
        }
    }
</script>
