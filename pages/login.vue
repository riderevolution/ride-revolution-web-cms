<template>
    <div id="login_container" class="login_content">
        <div class="cms_login">
            <div class="logo">
                <img src="/logo.png" width="65px" />
                <div class="logo_title">
                    Ride <br/>
                    Revolution
                </div>
            </div>
            <form id="login_form" class="login_form" @submit.prevent="submitLogin()">
                <div class="form_group">
                    <label for="email">Email Address</label>
                    <input type="email" name="email" autocomplete="off" class="default_text" v-model="form.email" v-validate="'required|email'">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ properFormat(errors.first('email')) }}</span></transition>
                </div>
                <div class="form_group">
                    <label for="password">Password</label>
                    <input type="password" name="password" autocomplete="off" class="default_text" v-model="form.password" v-validate="'required'">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('password')">{{ properFormat(errors.first('password')) }}</span></transition>
                    <nuxt-link to="/forgot-password" class="action_forgot_text">Forgot your password?</nuxt-link>
                </div>
                <div class="button_group">
                    <button type="submit" name="submit" class="action_success_btn"><span>Login</span></button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    email: '',
                    password: '',
                    type: 0
                }
            }
        },
        methods: {
            submitLogin () {
                const me = this
                me.$validator.validateAll().then(res => {
                    if (res) {
                        me.loader(true)
                        me.$axios.post('api/login?web_cms=1', me.form).then(res => {
                            if (res.data) {
                                me.$cookies.set('70hokccms3hhhn5', res.data.token)
                                me.$store.state.isAuth = true
                                me.$store.state.token = res.data.token
                                me.validateToken()
                                me.$router.push('/')
                            } else {
                                me.$store.state.errorList.push('Sorry, Something went wrong')
                                me.$store.state.errorStatus = true
                            }
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data
                            me.$store.state.errorStatus = true
                        }).then(() => {
                            me.loader(false)
                        })
                    }
                })
            }
        },
        mounted () {
            const me = this
            if (me.$cookies.get('70hokccms3hhhn5') != null && me.$cookies.get('70hokccms3hhhn5') !== undefined) {
                me.$router.push('/')
            }
        }
    }
</script>
