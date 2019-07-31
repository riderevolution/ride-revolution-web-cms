<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <nuxt-link :to="`/admin/${lastRoute}`" class="action_back_btn">{{ lastRoute }}</nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Add a New Studio</h1>
                </div>
            </section>
            <section id="content">
                <form method="POST" id="default_form" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
                    <div class="form_wrapper">
                        <h2 class="form_title">Studio Details</h2>
                        <div class="form_main_group">
                            <div class="form_group">
                                <label for="name">Studio Name <span>*</span></label>
                                <input type="text" name="name" autocomplete="off" class="default_text" v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ errors.first('name') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="address_line_1">Address Line 1<span>*</span></label>
                                <input type="text" name="address_line_1" autocomplete="off" class="default_text" v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address_line_1')">{{ errors.first('address_line_1') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="address_line_2">Address Line 2</label>
                                <input type="text" name="address_line_2" autocomplete="off" class="default_text">
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="city">City<span>*</span></label>
                                    <input type="text" name="city" autocomplete="off" class="default_text" v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('city')">{{ errors.first('city') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="state">State</label>
                                    <input type="text" name="state" autocomplete="off" class="default_text" v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('state')">{{ errors.first('state') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="country">Country<span>*</span></label>
                                    <input type="text" name="country" autocomplete="off" class="default_text" v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('country')">{{ errors.first('country') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="phone">Phone</label>
                                    <input type="text" name="phone" autocomplete="off" class="default_text" v-validate="'required|numeric'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('phone')">{{ errors.first('phone') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_group">
                                <label for="purchase_email">Purchase Email<span>*</span></label>
                                <input type="email" name="purchase_email" autocomplete="off" class="default_text" v-validate="'required|email'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('purchase_email')">{{ errors.first('purchase_email') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="reservations_email">Reservations Email<span>*</span></label>
                                <input type="email" name="reservations_email" autocomplete="off" class="default_text" v-validate="'required|email'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('reservations_email')">{{ errors.first('reservations_email') }}</span></transition>
                            </div>
                        </div>
                    </div>
                    <div class="form_wrapper">
                        <h2 class="form_title">Bokking Restrictions</h2>
                        <div class="form_main_group">
                            <div class="form_flex">
                                <div class="form_group flex">
                                    <label>Allowed time for booking before class starts:<span>*</span></label>
                                    <div class="form_flex_input">
                                        <input type="number" name="booking_hours" class="default_text" max="24" min="0" value="0" v-validate="'required|numeric'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('booking_hours')">{{ errors.first('booking_hours') }}</span></transition>
                                    </div>
                                    <div class="form_flex_input">
                                        <input type="number" name="booking_minutes" class="default_text" max="24" min="0" value="0" v-validate="'required|numeric'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('booking_minutes')">{{ errors.first('booking_minutes') }}</span></transition>
                                    </div>
                                </div>
                                <div class="form_group flex">
                                    <label>Allowed time to cancel before class starts:<span>*</span></label>
                                    <div class="form_flex_input">
                                        <input type="number" name="cancel_hours" class="default_text" max="24" min="0" value="0" v-validate="'required|numeric'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('cancel_hours')">{{ errors.first('cancel_hours') }}</span></transition>
                                    </div>
                                    <div class="form_flex_input">
                                        <input type="number" name="cancel_minutes" class="default_text" max="24" min="0" value="0" v-validate="'required|numeric'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('cancel_minutes')">{{ errors.first('cancel_minutes') }}</span></transition>
                                    </div>
                                </div>
                            </div>
                            <div class="form_flex">
                                <div class="form_group flex">
                                    <label>Time before customer is marked no show before class starts:<span>*</span></label>
                                    <div class="form_flex_input">
                                        <input type="number" name="no_show_hours" class="default_text" max="24" min="0" value="0" v-validate="'required|numeric'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('no_show_hours')">{{ errors.first('no_show_hours') }}</span></transition>
                                    </div>
                                    <div class="form_flex_input">
                                        <input type="number" name="no_show_minutes" class="default_text" max="24" min="0" value="0" v-validate="'required|numeric'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('no_show_minutes')">{{ errors.first('no_show_minutes') }}</span></transition>
                                    </div>
                                </div>
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
    import Foot from '../../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                lastRoute: ''
            }
        },
        methods: {
            submissionSuccess () {
                const me = this
                // me.$validator.validateAll().then(valid => {
                //     if (valid) {
                //         let formData = new FormData(document.getElementById('default_form'))
                //         formData.append('date', me.$moment(me.form.date).format('YYYY-MM-DD HH:mm:ss'))
                //         me.$axios.post(`admin/news-contents/${me.$route.params.category}?id=${me.$store.state.user.id}`, formData).then(res => {
                //             me.loader()
                //             setTimeout( () => {
                //                 if (res.data == 201) {
                //                     me.notify('Added')
                //                 } else {
                //                     alert('Sorry. Something went wrong.')
                //                 }
                //             }, 500)
                //         }).catch(err => {
                //             alert('Sorry. Something went wrong.')
                //         }).then(() => {
                //             setTimeout( () => {
                //                 me.$router.push(`/xsn-panel/campus-life/${me.$route.params.category}`)
                //             }, 500)
                //         })
                //     } else {
                //         me.$scrollTo('.validation_errors', {
				// 			offset: -250
				// 		})
                //     }
                // })
            }
        },
        async mounted () {
            const me = this
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 2]
        }
    }
</script>
