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
                                <input type="text" name="pa_address_1" autocomplete="off" class="default_text" v-validate="'required'" v-model="form.pa_address_1">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('pa_address_1')">{{ errors.first('pa_address_1') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="pa_address_2">Address Line 2</label>
                                <input type="text" name="pa_address_2" autocomplete="off" class="default_text" v-model="form.pa_address_2">
                            </div>
                            <div class="form_group">
                                <label for="pa_city">City</label>
                                <input type="text" name="pa_city" autocomplete="off" class="default_text" v-model="form.pa_city">
                            </div>
                        </div>
                    </div>
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Billing Address</h2>
                            <div class="form_check">
                                <input type="checkbox" id="pa_same" name="pa_same" class="action_check" @change="copyPersonal(toggled ^= true)">
                                <label for="pa_same">Same as Personal Address</label>
                            </div>
                        </div>
                        <div class="form_main_group">
                            <div class="form_group">
                                <label for="ba_address_1">Address Line 1</label>
                                <input type="text" name="ba_address_1" autocomplete="off" class="default_text" v-model="form.ba_address_1">
                            </div>
                            <div class="form_group">
                                <label for="ba_address_2">Address Line 2</label>
                                <input type="text" name="ba_address_2" autocomplete="off" class="default_text" v-model="form.ba_address_2">
                            </div>
                            <div class="form_group">
                                <label for="ba_city">City</label>
                                <input type="text" name="ba_city" autocomplete="off" class="default_text" v-model="form.ba_city">
                            </div>
                        </div>
                    </div>
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Customer Management</h2>
                        </div>
                        <div class="form_main_group">
                            <div class="form_group">
                                <label for="name">Choose a Type <span>*</span></label>
                                <select class="default_select alternate" name="type" v-validate="'required'">
                                    <option value="" selected disabled>Choose a Type</option>
                                    <option :value="type.id" v-for="(type, index) in types">{{ type.name }}</option>
                                </select>
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('type')">{{ errors.first('type') }}</span></transition>
                            </div>
                        </div>
                    </div>
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Health Waiver</h2>
                        </div>
                        <div class="form_main_group alternate">
                            <div class="form_group">
                                <div class="form_group_header">Terms &amp; Conditions</div>
                                <div class="form_group_body">
                                    I acknowledge and fully understand that I will be engaging in activities that involve risk of serious injury, including permanent disability or death, or severe social and economic losses which might result not only from my own actions, inactions or negligence, but action, inaction or negligence of others.<br><br> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.<br><br> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu <br><br> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.<br><br> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu <br><br>
                                </div>
                            </div>
                        </div>
                        <div class="form_main_group alternate">
                            <div class="form_group">
                                <div class="form_group_header">Medical History</div>
                                <div class="form_flex_radio_alternate">
                                    <label>Do I have a history of serious injury or disease?</label>
                                    <div class="radio_wrapper">
                                        <div class="form_radio">
                                            <input type="radio" id="history_1_yes" value="Yes" name="history_1" class="action_radio">
                                            <label for="history_1_yes">Yes</label>
                                        </div>
                                        <div class="form_radio">
                                            <input type="radio" id="history_1_no" value="No" name="history_1" class="action_radio">
                                            <label for="history_1_no">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form_flex_radio_alternate">
                                    <label>Do I have a history of serious injury or disease?</label>
                                    <div class="radio_wrapper">
                                        <div class="form_radio">
                                            <input type="radio" id="history_2_yes" value="Yes" name="history_2" class="action_radio">
                                            <label for="history_2_yes">Yes</label>
                                        </div>
                                        <div class="form_radio">
                                            <input type="radio" id="history_2_no" value="No" name="history_2" class="action_radio">
                                            <label for="history_2_no">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form_flex_radio_alternate">
                                    <label>Do I have a history of serious injury or disease?</label>
                                    <div class="radio_wrapper">
                                        <div class="form_radio">
                                            <input type="radio" id="history_3_yes" value="Yes" name="history_3" class="action_radio">
                                            <label for="history_3_yes">Yes</label>
                                        </div>
                                        <div class="form_radio">
                                            <input type="radio" id="history_3_no" value="No" name="history_3" class="action_radio">
                                            <label for="history_3_no">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form_main_group alternate">
                            <div class="form_group">
                                <div class="form_group_header">Emergency Contact</div>
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="ec_full_name">Full Name</label>
                                        <input type="text" name="ec_full_name" autocomplete="off" class="default_text">
                                    </div>
                                    <div class="form_group">
                                        <label for="ec_contact_number">Contact Number</label>
                                        <input type="text" name="ec_contact_number" autocomplete="off" class="default_text" v-validate="'numeric'">
                                    </div>
                                </div>
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="ec_relationship">Relationship</label>
                                        <input type="text" name="ec_relationship" autocomplete="off" class="default_text">
                                    </div>
                                </div>
                                <div class="form_check">
                                    <input type="checkbox" id="acknowledge" name="acknowledge" class="action_check">
                                    <label for="acknowledge">I acknowledge and fully understand the terms and conditions stated above and that all information stated are true.</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_check">
                            <input type="checkbox" id="i_agree" name="i_agree" class="action_check">
                            <label for="i_agree">I agree to the <a href="javascript:void(0)" target="_blank">Terms &amp; Conditions</a> and <a href="javascript:void(0)" target="_blank">Privacy Policy</a> of Ride Revolution.</label>
                        </div>
                        <div class="form_check">
                            <input type="checkbox" id="newsletter_subscription" name="newsletter_subscription" class="action_check">
                            <label for="newsletter_subscription">Subscribe to newsletter</label>
                        </div>
                        <div class="form_check">
                            <input type="checkbox" id="before_saving" name="before_saving" class="action_check">
                            <label for="before_saving">Buy credits after saving.</label>
                        </div>
                        <div class="form_flex">
                            <div class="form_check">
                                <input type="checkbox" id="enabled" name="enabled" class="action_check" checked>
                                <label for="enabled">Activate</label>
                            </div>
                            <div class="button_group">
                                <nuxt-link :to="`/${lastRoute}`" class="action_cancel_btn">Cancel</nuxt-link>
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
                    toggled: false,
                    pa_address_1: '',
                    pa_address_2: '',
                    pa_city: '',
                    ba_address_1: '',
                    ba_address_2: '',
                    ba_city: ''
                },
                types: []
            }
        },
        methods: {
            copyPersonal (status) {
                const me = this
                if (status) {
                    me.form.ba_address_1 = me.form.pa_address_1
                    me.form.ba_address_2 = me.form.pa_address_2
                    me.form.ba_city = me.form.pa_city
                } else {
                    me.form.ba_address_1 = ''
                    me.form.ba_address_2 = ''
                    me.form.ba_city = ''
                }
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        me.loader(true)
                        me.$axios.post('api/customers', formData).then(res => {
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
            }
        },
        async mounted () {
            const me = this
            me.$axios.get('api/extras/customer-types').then(res => {
                me.types = res.data.customerTypes
            })
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 2]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
        }
    }
</script>
