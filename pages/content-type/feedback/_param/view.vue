<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/feedback" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Feedback</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Feedback No. {{ res.id }}</h1>
                    </div>
                </section>
                <section id="content">
                    <form id="default_form">
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Details</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="feedback_type">Feedback Type</label>
                                    <input type="text" name="feedback_type" v-model="res.feedback_type" autocomplete="off" class="default_text disabled">
                                </div>
                                <div class="form_group">
                                    <label for="email">Email Address</label>
                                    <input type="email" name="email" v-model="res.email" autocomplete="off" class="default_text disabled">
                                </div>
                                <div class="form_group">
                                    <label for="label">Comment <span>*</span></label>
                                    <textarea name="comment" rows="4" id="comment" class="default_text disabled" v-model="res.comment"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_flex">
                                <div class="form_check"></div>
                                <div class="button_group">
                                    <nuxt-link to="/content-type/feedback" class="action_cancel_btn">Back</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                loaded: false,
                res: []
            }
        },
        methods: {
            fetchData () {
                const me = this
                me.loader(true)
                me.$axios.get(`api/feedbacks/${me.$route.params.param}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data.feedback
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
