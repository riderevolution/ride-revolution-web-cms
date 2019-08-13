<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <nuxt-link :to="`/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ lastRoute }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Add New Customer</h1>
                </div>
            </section>
            <section id="content">
                <form id="default_form" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Customer Overview</h2>
                        </div>
                        <div class="form_main_group">
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
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="email">Email Address <span>*</span></label>
                                    <input type="email" name="email" autocomplete="off" class="default_text" v-validate="'required|email'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="co_contact_number">Contact Number <span>*</span></label>
                                    <input type="text" name="co_contact_number" autocomplete="off" class="default_text" v-validate="'required|numeric'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('co_contact_number')">{{ errors.first('co_contact_number') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="co_birthdate">Birthdate <span>*</span></label>
                                    <input type="date" name="co_birthdate" autocomplete="off" class="default_text date" v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('co_birthdate')">{{ errors.first('co_birthdate') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="co_weight">Weight (in kilograms) <span>*</span></label>
                                    <input type="text" name="co_weight" autocomplete="off" class="default_text" v-validate="'required|numeric'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('co_weight')">{{ errors.first('co_weight') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_flex">
                                <div class="form_flex_radio">
                                    <label class="radio_label">Sex <span>*</span></label>
                                    <div class="form_radio">
                                        <input type="radio" id="female" value="Female" name="co_sex" class="action_radio">
                                        <label for="female">Female</label>
                                    </div>
                                    <div class="form_radio">
                                        <input type="radio" id="male" value="Male" name="co_sex" class="action_radio">
                                        <label for="male">Male</label>
                                    </div>
                                </div>
                                <div class="form_group">
                                    <label for="co_occupation">Occupation</label>
                                    <select class="default_select alternate" name="co_occupation" id="co_occupation">
                                        <option value="greenbelt">Greenbelt</option>
                                        <option value="shangri-la-plaza">Shangri-la Plaza</option>
                                    </select>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('co_occupation')">{{ errors.first('co_occupation') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="co_shoe_size">Shoe Size</label>
                                    <input type="text" name="co_shoe_size" autocomplete="off" class="default_text" v-validate="'required|numeric'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('co_shoe_size')">{{ errors.first('co_shoe_size') }}</span></transition>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Password</h2>
                        </div>
                        <div class="form_main_group">
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
                        </div>
                    </div>
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Personal Address</h2>
                        </div>
                        <div class="form_main_group">
                            <div class="form_group">
                                <label for="pa_address_1">Address Line 1 <span>*</span></label>
                                <input type="text" name="pa_address_1" autocomplete="off" class="default_text" v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('pa_address_1')">{{ errors.first('pa_address_1') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="pa_address_2">Address Line 2</label>
                                <input type="text" name="pa_address_2" autocomplete="off" class="default_text">
                            </div>
                            <div class="form_group">
                                <label for="pa_city">City</label>
                                <input type="text" name="pa_city" autocomplete="off" class="default_text">
                            </div>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="form_check">
                                <input type="checkbox" id="enabled" name="enabled" class="action_check" checked>
                                <label for="enabled">Activate</label>
                            </div>
                            <div class="button_group">
                                <nuxt-link :to="`/admin/${prevRoute}/${lastRoute}`" class="action_cancel_btn">Cancel</nuxt-link>
                                <button type="submit" name="submit" class="action_btn alternate margin">Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                lastRoute: '',
                prevRoute: '',
                form: {
                    booking: {
                        hour: 0,
                        mins: 0
                    },
                    cancel: {
                        hour: 0,
                        mins: 0
                    },
                    noShow: {
                        hour: 0,
                        mins: 0
                    },
                }
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('allowed_time_booking', `${(me.form.booking.hour * 3600) + (me.form.booking.mins * 60) + (0 * 1)}+${me.form.booking.hour}:${me.form.booking.mins}`)
                        formData.append('allowed_time_cancel', `${(me.form.cancel.hour * 3600) + (me.form.cancel.mins * 60) + (0 * 1)}+${me.form.cancel.hour}:${me.form.cancel.mins}`)
                        formData.append('allowed_time_no_show', `${(me.form.noShow.hour * 3600) + (me.form.noShow.mins * 60) + (0 * 1)}+${me.form.noShow.hour}:${me.form.noShow.mins}`)
                        me.loader(true)
                        me.$axios.post('api/studios', formData).then(res => {
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
							offset: -250
						})
                    }
                })
            },
        },
        async mounted () {
            const me = this
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 2]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
        }
    }
</script>
