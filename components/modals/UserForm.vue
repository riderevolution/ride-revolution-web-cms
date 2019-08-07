<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
            <div class="modal_wrapper">
                <h2 class="form_title">Add a New User</h2>
                <div class="modal_main_group">
                    <div class="form_group">
                        <label for="name">Choose a Role <span>*</span></label>
                        <select class="default_select alternate" name="role" v-validate="'required'">
                            <option value="" selected disabled>Choose a Role</option>
                            <option :value="role.id" v-for="(role, index) in roles">{{ role.display_name }}</option>
                        </select>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('role')">{{ errors.first('role') }}</span></transition>
                    </div>
                    <div class="form_flex">
                        <label class="flex_label">Restrict access to studios:</label>
                        <div class="form_check" v-for="(studio, key) in studios" :key="key">
                            <input type="checkbox" :id="`studio_${key}`" name="studios" :class="`action_check ${studio.class}`" v-model="studio.checked">
                            <label :for="`studio_${key}`">{{ studio.name }}</label>
                        </div>
                    </div>
                    <div class="form_flex">
                        <div class="form_group">
                            <label for="first_name">First Name <span>*</span></label>
                            <input type="text" name="first_name" autocomplete="off" class="default_text" v-validate="'required'">
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
                        <input type="text" name="email" autocomplete="off" class="default_text" v-validate="'required|email'">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') }}</span></transition>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="form_check default">
                                <input type="checkbox" id="enabled" name="enabled" class="action_check" checked>
                                <label for="enabled">Activate</label>
                            </div>
                            <div class="button_group">
                                <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                                <button type="submit" name="submit" class="action_success_btn margin alternate">Add User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: Number,
                default: 0
            },
            id: {
                type: Number
            }
        },
        data () {
            return {
                res: [],
                roles: [],
                studios: []
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.userForm = false
            }
        },
        async mounted () {
            const me = this
            me.$axios.get('api/roles').then(res => {
                me.roles = res.data.roles
            })
            me.$axios.get('api/studios').then(res => {
                me.studios = res.data.studios
            })
        }
    }
</script>
