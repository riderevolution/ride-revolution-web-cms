<template>
    <div id="login_container" class="login_content">
        <div class="cms_login">
            <div class="logo">
                <img src="/logo.png" width="65px" />
                <div class="logo_title">
                    CMS <br/>
                    Template
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
        layout: 'admin',
        data () {
            return {
                form: {
                    email: 'superadmin@admin.com',
                    password: '@F1r33x1t',
                }
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$store.state.isAuth = true
                me.$router.push('/')
            }
        }
    }
</script>
