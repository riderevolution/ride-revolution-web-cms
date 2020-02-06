<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <div class="action_wrapper">
                    <h1 class="header_title">My Account</h1>
                </div>
            </section>
            <section id="content">
                <form id="default_form" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Account Details</h2>
                        </div>
                        <div class="form_main_group">
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="first_name">First Name <span>*</span></label>
                                    <input type="text" name="first_name" autocomplete="off" class="default_text" autofocus v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">{{ errors.first('first_name') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="last_name">Last Name <span>*</span></label>
                                    <input type="text" name="last_name" autocomplete="off" class="default_text" v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">{{ errors.first('last_name') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_group">
                                <label for="email">Email Address <span>*</span></label>
                                <input type="email" name="email" autocomplete="off" class="default_text" v-validate="'required|email'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="current_password">Current Password</label>
                                <input type="password" name="current_password" autocomplete="off" class="default_text" v-validate="'required|min:8'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('current_password')">{{ errors.first('current_password') }}</span></transition>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="new_password">New Password</label>
                                    <input type="password" name="new_password" autocomplete="off" class="default_text" ref="new_password" v-validate="'min:8'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('new_password')">{{ errors.first('new_password') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="new_password_confirmation">New Password Confirmation</label>
                                    <input type="password" name="new_password_confirmation" autocomplete="off" class="default_text" v-validate="'confirmed:new_password'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('new_password_confirmation')">{{ errors.first('new_password_confirmation') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_group_disclaimer">
                                <div class="form_disclaimer"><img src="/icons/disclaimer-icon.svg" /> <span>Leave blank if you don't want to change your <b>password</b>.</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="button_group">
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
    import Foot from '../components/Foot'
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
            submissionSuccess () {
                const me = this
            }
        }
    }
</script>
