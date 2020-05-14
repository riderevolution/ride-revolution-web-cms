<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/inquiry" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Inquiry</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Inquiry {{ res.ticket_number }}</h1>
                    </div>
                </section>
                <section id="content">
                    <form id="default_form">
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Details</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="first_name">First Name</label>
                                        <input type="text" name="first_name" v-model="res.first_name" autocomplete="off" class="default_text disabled">
                                    </div>
                                    <div class="form_group">
                                        <label for="last_name">Last Name</label>
                                        <input type="text" name="last_name" v-model="res.last_name" autocomplete="off" class="default_text disabled">
                                    </div>
                                </div>
                                <div class="form_group">
                                    <label for="email">Email Address</label>
                                    <input type="email" name="email" v-model="res.email" autocomplete="off" class="default_text disabled">
                                </div>
                                <div class="form_group">
                                    <label for="label">Message <span>*</span></label>
                                    <textarea name="message" rows="4" id="message" class="default_text disabled" v-model="res.message"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_flex">
                                <div class="form_check"></div>
                                <div class="button_group">
                                    <nuxt-link to="/content-type/inquiry" class="action_cancel_btn">Back</nuxt-link>
                                    <button type="submit" name="submit" class="action_btn alternate margin">Save</button>
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
                me.$axios.get(`api/inquiries/${me.$route.params.param}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data.inquiry
                            console.log(me.res);
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
