<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <nuxt-link :to="`/admin/${prevRoute}/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ replacer(lastRoute) }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Update Size {{ res.size }}</h1>
                </div>
            </section>
            <section id="content">
                <form id="default_form" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Size Details</h2>
                        </div>
                        <div class="form_main_group">
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="size">Size <span>*</span></label>
                                    <input type="text" name="size" autocomplete="off" class="default_text" autofocus v-validate="'required'" v-model="res.size">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('size')">{{ errors.first('size') }}</span></transition>
                                </div>
                                <div class="form_flex_radio">
                                    <label class="radio_label">Sex <span>*</span></label>
                                    <div class="form_radio">
                                        <input type="radio" id="female" value="F" name="gender" class="action_radio" v-validate="'required'" :checked="(res.gender == 'F')">
                                        <label for="female">Female</label>
                                    </div>
                                    <div class="form_radio">
                                        <input type="radio" id="male" value="M" name="gender" class="action_radio" v-validate="'required'" :checked="(res.gender == 'M')">
                                        <label for="male">Male</label>
                                    </div>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('gender')">{{ errors.first('gender') }}</span></transition>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="button_group">
                            <nuxt-link :to="`/admin/${prevRoute}/${lastRoute}`" class="action_cancel_btn">Cancel</nuxt-link>
                            <button type="submit" name="submit" class="action_btn alternate margin">Save</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                lastRoute: '',
                prevRoute: '',
                res: []
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('_method', 'PATCH')
                        me.loader(true)
                        me.$axios.post(`api/extras/shoe-sizes/${me.$route.params.param}`, formData).then(res => {
                            setTimeout( () => {
                                if (res.data) {
                                    me.notify('Added')
                                } else {
                                    me.$store.state.errorList.push('Sorry, Something went wrong')
                                    me.$store.state.errorStatus = true
                                }
                            }, 500)
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                if (!me.$store.state.errorStatus) {
                                    me.$router.push(`/admin/${me.prevRoute}/${me.lastRoute}`)
                                }
                                me.loader(false)
                            }, 500)
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '#default_form',
							offset: -250
						})
                    }
                })
            }
        },
        async mounted () {
            const me = this
            me.$axios.get(`api/extras/shoe-sizes/${me.$route.params.param}`).then(res => {
                me.res = res.data.shoeSize
            })
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 4]
        }
    }
</script>
