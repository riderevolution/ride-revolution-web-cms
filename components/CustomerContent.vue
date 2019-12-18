<template>
    <div class="customer_tab_content">
        <div v-if="type == 'packages'">
            <div class="cms_table_toggler">
                <div :class="`status ${(packageStatus == 1) ? 'active' : ''}`" @click="togglePackages(1)">Owned</div>
                <div :class="`status ${(packageStatus == 2) ? 'active' : ''}`" @click="togglePackages(2)">Shared</div>
            </div>
            <div class="cms_table_package">
                <div class="table_package" v-for="(data, key) in value.user_package_counts" :key="key">
                    <h2 class="package_title">
                        {{ data.class_package.name }}
                        <span class="warning" v-if="checkWarning(data)">{{ violator.warning }} Days Left</span>
                        <!-- <span class="shared">Shared with Sheena Villeta</span> -->
                    </h2>
                    <div class="package_details">
                        <div class="package_status">
                            <div class="box">
                                <div class="overlay">
                                    <p>{{ data.count }}</p>
                                    <label>Used</label>
                                </div>
                            </div>
                            <div class="box margin">
                                <div class="overlay">
                                    <p>{{ (parseInt(data.count) == data.class_package.class_count) ? data.count : parseInt(data.count) - data.class_package.class_count }}</p>
                                    <label>Available</label>
                                </div>
                            </div>
                        </div>
                        <div class="package_date">
                            <div class="date">
                                <p>{{ formatDate(data.created_at) }} / {{ (data.activation_date != 'NA') ? formatDate(data.activation_date) : 'N/A' }}</p>
                                <label>Purchase Date / Activation Date</label>
                            </div>
                            <div class="date margin">
                                <p>{{ formatDate(data.class_package.computed_expiration_date) }}</p>
                                <!-- <label>Expiry date <a href="javascript:void(0)" class="expiry_btn">Edit</a></label> -->
                                <label>Expiry date</label>
                            </div>
                        </div>
                        <div class="package_action">
                            <a href="/booker" class="action_success_btn" @click.prevent="getCurrentCustomer()">Book a Class</a>
                            <div class="package_options">
                                <div class="option_btn" :id="`option_${key}`" @click.self="toggledOption($event)">Options</div>
                                <div class="option_selector">
                                    <a href="javascript:void(0)" class="option_link">Transfer Package</a>
                                    <a href="javascript:void(0)" class="option_link">Share Package</a>
                                    <a href="javascript:void(0)" class="option_link">Freeze Package</a>
                                    <a href="javascript:void(0)" class="option_link">Print Receipt</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="type == 'transactions'">
            asdasd
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'packages'
            },
            value: {
                default: null
            }
        },
        data () {
            return {
                violator: {
                    warning: 0,
                    shared: 0,
                    transferred: 0,
                    freeze: 0,
                },
                packageStatus: 1
            }
        },
        methods: {
            getCurrentCustomer () {
                const me = this
                me.$axios.get(`api/customers/${me.$route.params.param}`).then(res => {
                    if (res.data) {
                        me.$store.state.customer = res.data.user
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                })
                me.$router.push('/booker')
            },
            formatDate (value) {
                if (value) {
                    return this.$moment(value).format('MMM DD, YYYY')
                }
            },
            checkWarning (data) {
                const me = this
                let expiry = me.$moment(data.class_package.computed_expiration_date)
                let current = me.$moment()
                if (parseInt(expiry.diff(current, 'days')) <= 10) {
                    me.violator.warning = expiry.diff(current, 'days')
                    return true
                } else {
                    return false
                }
            },
            toggledOption (event) {
                const me = this
                let element = event.target
                if (element.parentNode.classList.contains('toggled')) {
                    element.parentNode.classList.remove('toggled')
                } else {
                    element.parentNode.classList.add('toggled')
                }
            },
            toggleOverlays (e) {
                const me = this
                let target = e.target
                me.value.user_package_counts.forEach((result, index) => {
                    let option = document.getElementById(`option_${index}`)
                    if (option != null) {
                        if (option !== target && option !== target.parentNode.previousElementSibling) {
                            if (option.parentNode.classList.contains('toggled')) {
                                option.parentNode.classList.remove('toggled')
                            }
                        }
                    }
                })

            },
            togglePackages (status) {
                const me = this
                return me.packageStatus = status
            },
        },
        beforeMount () {
            document.addEventListener('click', this.toggleOverlays)
        },
        beforeDestroy () {
            document.removeEventListener('click', this.toggleOverlays)
        }
    }
</script>
