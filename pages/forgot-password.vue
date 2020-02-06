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
            <form id="forgot_form" class="forgot_form" @submit.prevent="submissionSuccess()">
                <div class="form_disclaimer">Please enter your email address where we can send your request.</div>
                <div class="form_group">
                    <label for="email">Email Address <span>*</span></label>
                    <input type="text" name="email" autocomplete="off" class="default_text" v-model="form.email" v-validate="'required|email'">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') }}</span></transition>
                </div>
                <div class="button_group alternate">
                    <nuxt-link to="/login" class="action_cancel_btn"><span>Go Back</span></nuxt-link>
                    <button type="submit" name="submit" class="action_success_btn"><span>Send</span></button>
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
                    type: 0
                }
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
            }
        }
    }
</script>
