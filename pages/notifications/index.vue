<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <nuxt-link to="/" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Back</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Notifications</h1>
                </div>
            </section>
            <section id="content">
                <div class="notification">
                    <div class="notification_box_alternate active">
                        <div class="wrapper">
                            <div class="notification_wrapper" v-for="(data, key) in res" v-if="(key + 1) <= 20">
                                <span>&#9679;</span>
                                <div class="notification_desc">
                                    <div class="notification_title">{{ data.message }}</div>
                                    <div class="notification_time">{{ getFromNow(data.created_at) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                res: []
            }
        },
        methods: {
            getFromNow (value) {
                const me = this
                if (value) {
                    return me.$moment(value).fromNow()
                }
            },
            fetchData () {
                const me = this
                me.$axios.get('api/logs').then(res => {
                    if (res.data) {
                        me.res = res.data.logs.data
                    }
                })
            }
        },
        mounted () {
            const me = this
            me.fetchData()
        }
    }
</script>
