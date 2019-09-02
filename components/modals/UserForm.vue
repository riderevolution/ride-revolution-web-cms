<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay" @submit.prevent="submissionAddSuccess()" enctype="multipart/form-data" v-if="type == 0 && loaded">
            <div class="modal_wrapper">
                <h2 class="form_title">Add a New User</h2>
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_main_group alternate">
                    <div class="form_group">
                        <label for="name">Choose a Role <span>*</span></label>
                        <select class="default_select alternate" name="role_id" v-validate="'required'">
                            <option value="" selected disabled>Choose a Role</option>
                            <option :value="role.id" v-for="(role, index) in roles">{{ role.display_name }}</option>
                        </select>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('role')">{{ errors.first('role') }}</span></transition>
                    </div>
                    <div class="form_flex select_all">
                        <label class="flex_label">Restrict access to studios:</label>
                        <div class="form_check" v-for="(studio, key) in studios" :key="key">
                            <input type="checkbox" :id="`studio_${key}`" name="studio_access[]" :value="studio.id" class="action_check">
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
                    <div class="form_flex">
                        <div class="form_group">
                            <label for="password">Password <span>*</span></label>
                            <input type="password" name="password" autocomplete="off" class="default_text" ref="password" v-validate="'required|min:8'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('password')">{{ errors.first('password') }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="password_confirmation">Password Confirmation <span>*</span></label>
                            <input type="password" name="password_confirmation" autocomplete="off" class="default_text" v-validate="'required|confirmed:password'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span></transition>
                        </div>
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
        <form id="default_form" class="overlay" @submit.prevent="submissionUpdateSuccess()" enctype="multipart/form-data" v-if="type == 1 && loaded">
            <div class="modal_wrapper">
                <h2 class="form_title">Update {{ res.first_name }} {{ res.last_name }}</h2>
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_main_group">
                    <div class="form_group">
                        <label for="name">Choose a Role <span>*</span></label>
                        <select class="default_select alternate" name="role_id" v-validate="'required'">
                            <option value="" disabled>Choose a Role</option>
                            <option :value="role.id" v-for="(role, index) in roles" :selected="res.staff_details.role_id == role.id">{{ role.display_name }}</option>
                        </select>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('role')">{{ errors.first('role') }}</span></transition>
                    </div>
                    <div class="form_flex select_all">
                        <label class="flex_label">Restrict access to studios:</label>
                        <div class="form_check studios" v-for="(studio, key) in studios" :key="key">
                            <input type="checkbox" :id="`studio_${key}`" name="studio_access[]" class="action_check" :value="studio.id" :checked="studio.status">
                            <label :for="`studio_${key}`">{{ studio.name }}</label>
                        </div>
                    </div>
                    <div class="form_flex">
                        <div class="form_group">
                            <label for="first_name">First Name <span>*</span></label>
                            <input type="text" name="first_name" autocomplete="off" class="default_text" v-validate="'required'" v-model="res.first_name">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('first_name')">{{ errors.first('first_name') }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="last_name">Last Name <span>*</span></label>
                            <input type="text" name="last_name" autocomplete="off" class="default_text" v-validate="'required'" v-model="res.last_name">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('last_name')">{{ errors.first('last_name') }}</span></transition>
                        </div>
                    </div>
                    <div class="form_group">
                        <label for="email">Email Address <span>*</span></label>
                        <input type="text" name="email" autocomplete="off" class="default_text" v-validate="'required|email'" v-model="res.email">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') }}</span></transition>
                    </div>
                    <div class="form_flex">
                        <div class="form_group">
                            <label for="password">Password</label>
                            <input type="password" name="password" autocomplete="off" class="default_text" ref="password" v-validate="'min:8'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('password')">{{ errors.first('password') }}</span></transition>
                        </div>
                        <div class="form_group">
                            <label for="password_confirmation">Password Confirmation</label>
                            <input type="password" name="password_confirmation" autocomplete="off" class="default_text" v-validate="'confirmed:password'">
                            <transition name="slide"><span class="validation_errors" v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span></transition>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="form_check default">
                                <input type="checkbox" id="enabled" name="enabled" class="action_check" :checked="res.enabled == 1">
                                <label for="enabled">Activate</label>
                            </div>
                            <div class="button_group">
                                <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                                <button type="submit" name="submit" class="action_success_btn margin alternate">Update User</button>
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
            status: {
                type: Number,
                default: 0
            },
            id: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                loaded: false,
                res: {
                    staff_details: {
                        role_id: '',
                        studio_access: [
                            {
                                studio_id: ''
                            }
                        ]
                    }
                },
                roles: [],
                studios: [],
                studioLength: 0
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.userForm = false
                document.body.classList.remove('no_scroll')
            },
            submissionAddSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        me.loader(true)
                        me.$axios.post('api/staff', formData).then(res => {
                            setTimeout( () => {
                                if (res.data) {
                                    me.notify('Added')
                                } else {
                                    me.$store.state.errorList.push('Sorry, Something went wrong')
                                    me.$store.state.errorStatus = true
                                }
                            }, 200)
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                                if (!me.$store.state.errorStatus) {
                                    me.$parent.fetchData(me.status)
                                    me.$store.state.userForm = false
                                }
                            }, 200)
                            document.body.classList.remove('no_scroll')
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '.default_modal',
                            offset: -250
                        })
                    }
                })
            },
            submissionUpdateSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        if (formData.get('password').length <= 0) {
                            formData.delete('password')
                        }
                        formData.append('_method', 'PATCH')
                        me.loader(true)
                        me.$axios.post(`api/staff/${me.id}`, formData).then(res => {
                            setTimeout( () => {
                                if (res.data) {
                                    me.notify('Updated')
                                } else {
                                    me.$store.state.errorList.push('Sorry, Something went wrong')
                                    me.$store.state.errorStatus = true
                                }
                            }, 200)
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                                if (!me.$store.state.errorStatus) {
                                    me.$parent.fetchData(me.status)
                                    me.$store.state.userForm = false
                                }
                            }, 200)
                            document.body.classList.remove('no_scroll')
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '.default_modal',
                            offset: -250
                        })
                    }
                })
            },
            fetchStudios (studioStatus) {
                const me = this
                me.$axios.get('api/studios').then(res => {
                    me.studios = res.data.studios
                    if (me.id != 0) {
                        me.studios.forEach((studio, index) => {
                            studio.status = false
                            me.res.staff_details.studio_access.forEach((access, index) => {
                                if (studio.id == access.studio_id) {
                                    studio.status = true
                                }
                            })
                        })
                    } else {
                        me.studios.forEach((studio, index) => {
                            studio.status = studioStatus
                        })
                    }
                })
            }
        },
        async mounted () {
            const me = this
            me.$axios.get('api/roles').then(res => {
                me.roles = res.data.roles
            })
            if (me.id != 0) {
                me.$axios.get(`api/staff/${me.id}`).then(res => {
                    me.res = res.data.user
                    me.fetchStudios(false)
                })
            } else {
                me.fetchStudios(false)
            }
            me.loaded = true
        }
    }
</script>
