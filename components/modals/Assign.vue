<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay assign" @submit.prevent="submissionSuccess()">
            <div class="modal_wrapper">
                <h2 class="form_title">{{ (type == 1) ? 'Assign a Guest' : 'Block Bike (Comp)' }}</h2>
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_main_group alternate" v-if="form.assign == 'member'">
                    <div class="form_group">
                        <div class="form_flex_radio">
                            <div class="form_radio">
                                <input type="radio" id="member" value="member" name="assign_type" class="action_radio" checked @change="getAssign($event)">
                                <label for="member">Member</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="non-member" value="non-member" name="assign_type" class="action_radio" @change="getAssign($event)">
                                <label for="non-member">Non-member</label>
                            </div>
                        </div>
                    </div>
                    <div class="form_group">
                        <label for="comp_reason">Comp Reason <span>*</span></label>
                        <select class="default_select alternate" name="comp_reason" v-validate="'required'" v-model="form.comp">
                            <option value="" selected disabled>Select a Reason</option>
                            <option value="so-sick">So Sick of love song</option>
                            <option value="other">Other</option>
                        </select>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('comp_reason')">{{ errors.first('comp_reason') }}</span></transition>
                    </div>
                    <transition name="fade">
                        <div class="form_group" v-if="form.comp == 'other'">
                            <label for="comp_reason_body">Indicate Reason</label>
                            <input type="text" name="comp_reason_body" class="default_text">
                        </div>
                    </transition>
                    <div class="customer_filter">
                        <div class="form_group" v-click-outside="closeMe">
                            <label for="customer">Find a Customer</label>
                            <input type="text" name="customer" autocomplete="off" placeholder="Search for a customer" autofocus class="default_text search_alternate" @click="toggleCustomers ^= true" @input="searchCustomer($event)">
                            <transition name="slide"><span class="validation_errors" v-if="findCustomer && customer == ''">Select Customer</span></transition>
                            <div :class="`customer_selection ${(customerLength > 6) ? 'scrollable' : ''}`" v-if="toggleCustomers">
                                <div class="customer_selection_list">
                                    <div class="customer_wrapper" v-if="customerLength > 0" :id="`customer_${customer.id}`" v-for="(customer, key) in populateCustomers" :key="key" @click="getCustomer(customer)">
                                        <img :src="customer.customer_details.images[0].path_resized" v-if="customer.customer_details.images.length > 0" />
                                        <div class="customer_image" v-else>
                                            {{ customer.first_name.charAt(0) }}{{ customer.last_name.charAt(0) }}
                                        </div>
                                        <div class="customer_name">
                                            {{ customer.first_name }} {{ customer.last_name }}
                                        </div>
                                    </div>
                                    <div class="no_results" v-if="customerLength == 0" >
                                        No customer(s) found.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <transition name="fade">
                        <div class="customer_picked" v-if="customer != ''">
                            <div class="customer_header">
                                <img class="customer_image" :src="customer.customer_details.images[0].path_resized" v-if="customer.customer_details.images.length > 0" />
                                <div class="customer_default_image" v-else>
                                    {{ customer.first_name.charAt(0) }}{{ customer.last_name.charAt(0) }}
                                </div>
                                <div class="customer_details">
                                    <h2 class="customer_name">
                                        {{ customer.first_name }} {{ customer.last_name }}
                                    </h2>
                                    <div class="customer_info">
                                        <span>Birthday: {{ $moment(customer.customer_details.co_birthdate).format('M/D/YY') }}</span>
                                        <span>{{ customer.email }}</span>
                                        <span>{{ customer.customer_details.co_contact_number }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="button_group">
                                <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                                <button type="submit" name="submit" class="action_success_btn margin alternate">{{ (type == 1) ? 'Assign' : 'Block' }}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal_main_group alternate" v-if="form.assign == 'non-member'">
                    <div class="form_group">
                        <div class="form_flex_radio">
                            <div class="form_radio">
                                <input type="radio" id="member" value="member" name="assign_type" class="action_radio" checked @change="getAssign($event)">
                                <label for="member">Member</label>
                            </div>
                            <div class="form_radio">
                                <input type="radio" id="non-member" value="non-member" name="assign_type" class="action_radio" @change="getAssign($event)">
                                <label for="non-member">Non-member</label>
                            </div>
                        </div>
                    </div>
                    <div class="form_group">
                        <label for="comp_reason">Comp Reason <span>*</span></label>
                        <select class="default_select alternate" name="comp_reason" v-validate="'required'" v-model="form.comp">
                            <option value="" selected disabled>Select a Reason</option>
                            <option value="so-sick">So Sick of love song</option>
                            <option value="other">Other</option>
                        </select>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('comp_reason')">{{ errors.first('comp_reason') }}</span></transition>
                    </div>
                    <transition name="fade">
                        <div class="form_group" v-if="form.comp == 'other'">
                            <label for="comp_reason_body">Indicate Reason</label>
                            <input type="text" name="comp_reason_body" class="default_text">
                        </div>
                    </transition>
                    <div class="form_group">
                        <label for="email">Email Address <span>*</span></label>
                        <input type="email" name="email" autocomplete="off" class="default_text" v-validate="'required|email'">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') }}</span></transition>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="button_group">
                                <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                                <button type="submit" name="submit" class="action_success_btn margin alternate">{{ (type == 1) ? 'Assign' : 'Block' }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import Prompt from './Prompt'
    export default {
        components: {
            Prompt
        },
        props: {
            type: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                findCustomer: false,
                form: {
                    comp: '',
                    assign: 'member'
                },
                toggleCustomers: false,
                customers: [],
                customer: '',
                customerLength: 0
            }
        },
        computed: {
            populateCustomers () {
                const me = this
                let results = []
                results = me.customers
                return results
            }
        },
        methods: {
            getAssign (event) {
                const me = this
                let value = event.target.value
                me.form.assign = value
            },
            closeMe () {
                const me = this
                me.toggleCustomers = false
            },
            toggleClose () {
                const me = this
                me.$store.state.assignStatus = false
                document.body.classList.remove('no_scroll')
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        if (me.customer != '' && me.form.assign == 'member') {
                            formData.append('email', me.customer.email)
                        }
                        formData.append('staff_id', me.$store.state.user.id)
                        formData.append('seat_id', me.$store.state.seatID)
                        formData.append('scheduled_date_id', me.$store.state.scheduleID)
                        me.loader(true)
                        me.$axios.post('api/comp', formData).then(res => {
                            setTimeout( () => {
                                if (res.data) {
                                    me.notify('Seat has been Updated')
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
                                me.$store.state.assignStatus = false
                                document.body.classList.remove('no_scroll')
                                me.loader(false)
                                me.$parent.$refs.plan.fetchSeats(me.$store.state.scheduleID, me.$parent.studioID)
                                document.querySelector('.plan_wrapper').style.transform = `matrix(0.55, 0, 0, 0.55, ${me.$parent.customWidth}, ${me.$parent.customHeight})`
                            }, 500)
                        })
                    } else {
                        if (me.customer == '') {
                            me.findCustomer = true
                        }
                        setTimeout( () => {
                            document.querySelector('.validation_errors').scrollIntoView({block: 'center', behavior: 'smooth'})
                        }, 10)
                    }
                })
            },
            getCustomer (data) {
                const me = this
                me.toggleCustomers = false
                me.customer = data
                me.findCustomer = false
            },
            searchCustomer (event) {
                const me = this
                let value = event.target.value
                let formData = new FormData()
                formData.append('q', value)
                formData.append('forBooker', 1)
                formData.append('enabled', 1)
                me.$axios.post('api/customers/search', formData).then(res => {
                    if (res.data) {
                        me.customers = res.data.customers
                        me.customerLength = me.customers.length
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                })
            },
            fetchData (value) {
                const me = this
                me.$axios.get(`api/customers?enabled=${value}`).then(res => {
                    if (res.data) {
                        me.customers = res.data.customers.data
                        me.customerLength = me.customers.length
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                })
            }
        },
        mounted () {
            const me = this
            me.fetchData(1)
        }
    }
</script>
