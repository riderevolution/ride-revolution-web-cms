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
            <form id="login_form" class="login_form" @submit.prevent="submissionSuccess()">
                <div class="form_group">
                    <label for="email">Email Address</label>
                    <input type="text" name="email" autocomplete="off" class="default_text" v-model="form.email" v-validate="'required|email'">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') }}</span></transition>
                </div>
                <div class="form_group">
                    <label for="password">Password</label>
                    <input type="password" name="password" autocomplete="off" class="default_text" v-model="form.password" v-validate="'required'">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('password')">{{ errors.first('password') }}</span></transition>
                </div>
                <div class="button_group">
                    <p class="error" v-if="error">Wrong username or password. <br> Please try again.</p>
                    <button type="submit" name="submit" class="action_cancel_btn"><span>Login</span></button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        data () {
            return {
                form: {
                    email: 'superadmin@admin.com',
                    password: 'admin'
                },
                error: false,
            }
        },
        mounted () {
            if (this.$cookies.get('token') != null && this.$cookies.get('token') !== undefined) {
                this.$router.push('/')
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(res => {
                    if (res) {
                        me.$store.state.isLoaderShow = true
                        me.$axios.post('api/login', me.form).then(res => {
                            me.$cookies.set('token', res.data.token)
                            me.$store.state.isAuth = true
                            me.error = false
                            me.$router.push('/')
                            me.$store.state.token = res.data.token
                        }).catch(err => {
                            console.log(err)
                            me.error = true
                        }).then(() => {
                            me.$store.state.isLoaderShow = false
                        })
                    }
                })
            }
        }
    }
</script>
