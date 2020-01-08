<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay" @submit.prevent="submissionSuccess()">
            <div class="modal_wrapper">
                <h2 class="form_title">Choose a Package</h2>
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_main_group">
                    <div class="form_flex_radio alternate margin">
                        <div class="form_radio" v-for="(data, key) in res" :key="key">
                            <input type="radio" :id="`package_${key}`" :value="data.class_package.id" name="packages" class="action_radio" @change="selectPackage(data, key)">
                            <label :for="`package_${key}`">
                                <p>{{ data.class_package.name }}</p>
                                <p class="id">Package ID: {{ data.class_package.sku_id }}</p>
                            </label>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="button_group">
                            <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleClose()">Cancel</a>
                            <button type="submit" name="submit" class="action_success_btn margin alternate">Select</button>
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
            studioID: {
                type: String,
                default: 0
            }
        },
        data () {
            return {
                res: [],
                class_package_id: []
            }
        },
        methods: {
            selectPackage (data, key) {
                const me = this
                let element = document.getElementById(`package_${key}`)
                me.class_package_id = data.class_package.id
                me.res.forEach((value, index) => {
                    if (index == key) {
                        element.parentNode.classList.add('toggled')
                    } else {
                        document.getElementById(`package_${index}`).parentNode.classList.remove('toggled')
                    }
                })
            },
            toggleClose () {
                const me = this
                me.$store.state.customerPackageStatus = false
                document.body.classList.remove('no_scroll')
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('scheduled_date_id', me.$store.state.scheduleID)
                        formData.append('seat_id', me.$store.state.seatID)
                        formData.append('user_id', me.$store.state.customerID)
                        formData.append('class_package_id', me.class_package_id)
                        me.loader(true)
                        me.$axios.post('api/bookings', formData).then(res => {
                            setTimeout( () => {
                                if (res.data) {
                                    me.notify('Seat has been Reserved')
                                } else {
                                    me.$store.state.errorList.push('Sorry, Something went wrong')
                                    me.$store.state.errorStatus = true
                                }
                            }, 500)
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorStatus = true
                        }).then(() => {
                            me.$store.state.customerPackageStatus = false
                            setTimeout( () => {
                                me.$parent.$refs.plan.fetchSeats(me.$store.state.scheduleID, me.studioID)
                                document.querySelector('.plan_wrapper').style.transform = `matrix(0.55, 0, 0, 0.55, ${me.customWidth}, ${me.customHeight})`
                                me.loader(false)
                            }, 500)
                            document.body.classList.remove('no_scroll')
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            container: '.default_modal',
                            offset: -250
                        })
                    }
                })
            }
        },
        async mounted () {
            const me = this
            if (me.$store.state.customerID != 0) {
                me.$axios.get(`api/customers/${me.$store.state.customerID}/packages`).then(res => {
                    if (res.data.customer.user_package_counts) {
                        me.res = res.data.customer.user_package_counts
                    }
                })
            }
        }
    }
</script>
