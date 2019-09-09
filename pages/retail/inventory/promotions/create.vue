<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <nuxt-link :to="`/admin/${prevRoute}/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ lastRoute }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Add a Promo</h1>
                </div>
            </section>
            <section id="content">
                <form id="default_form" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Promo Details</h2>
                        </div>
                        <div class="form_main_group">
                            <div class="form_group">
                                <label for="name">Promo Name <span>*</span></label>
                                <input type="text" name="name" autocomplete="off" class="default_text" autofocus v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ errors.first('name') }}</span></transition>
                            </div>
                            <div class="form_flex">
                                <div class="form_flex_radio">
                                    <label class="radio_label">Discount Type <span>*</span></label>
                                    <div class="form_radio">
                                        <input type="radio" id="percent" value="percent" name="discount_type" class="action_radio" checked @change="isDiscount = true">
                                        <label for="percent">Percent</label>
                                    </div>
                                    <div class="form_radio">
                                        <input type="radio" id="flat_rate" value="flat_rate" name="discount_type" class="action_radio" @change="isDiscount = false">
                                        <label for="flat_rate">Flat Rate</label>
                                    </div>
                                </div>
                                <div class="form_group" v-if="isDiscount">
                                    <label for="discount_field">Percent Discount <span>*</span></label>
                                    <div class="violator">%</div>
                                    <input type="text" name="discount_field" autocomplete="off" class="default_text" v-validate="'required|numeric'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('discount_field')">{{ errors.first('discount_field') }}</span></transition>
                                </div>
                                <div class="form_group" v-else>
                                    <label for="discount_field">Flat Rate Discount <span>*</span></label>
                                    <input type="text" name="discount_field" autocomplete="off" class="default_text" v-validate="'required|numeric'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('discount_field')">{{ errors.first('discount_field') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_group">
                                <label for="promo_code">Promo Code <span>*</span></label>
                                <input type="text" name="promo_code" autocomplete="off" class="default_text">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('promo_code')">{{ errors.first('promo_code') }}</span></transition>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="start_date">Start Date <span>*</span></label>
                                    <input type="date" name="start_date" autocomplete="off" class="default_text date" v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('start_date')">{{ errors.first('start_date') }}</span></transition>
                                </div>
                                <div class="form_group flex alternate">
                                    <label>Start Time<span>*</span></label>
                                    <div class="form_flex_input">
                                        <input type="text" name="start_time_hour" class="default_text" autocomplete="off" v-model="form.start.hour" maxlength="2" v-validate="'required|numeric|max_value:12|min_value:0'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('start_time_hour')">{{ errors.first('start_time_hour') }}</span></transition>
                                    </div>
                                    <div class="form_flex_separator">:</div>
                                    <div class="form_flex_input">
                                        <input type="text" name="start_time_minutes" class="default_text" autocomplete="off" v-model="form.start.mins" maxlength="2" v-validate="'required|numeric|max_value:60|min_value:0'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('start_time_minutes')">{{ errors.first('start_time_minutes') }}</span></transition>
                                    </div>
                                    <div class="form_flex_input">
                                        <input type="text" name="start_convention" class="default_text number no_click" autocomplete="off" v-model="form.start.convention" v-validate="'required'">
                                        <div class="up" @click="changeConvention('start', 'AM')"></div>
                                        <div class="down" @click="changeConvention('start', 'PM')"></div>
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('start_convention')">{{ errors.first('start_convention') }}</span></transition>
                                    </div>
                                </div>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="end_date">End Date <span>*</span></label>
                                    <input type="date" name="end_date" autocomplete="off" class="default_text date" v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('end_date')">{{ errors.first('end_date') }}</span></transition>
                                </div>
                                <div class="form_group flex alternate">
                                    <label>End Time<span>*</span></label>
                                    <div class="form_flex_input">
                                        <input type="text" name="end_time_hour" class="default_text" autocomplete="off" v-model="form.end.hour" maxlength="2" v-validate="'required|numeric|max_value:12|min_value:0'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('end_time_hour')">{{ errors.first('end_time_hour') }}</span></transition>
                                    </div>
                                    <div class="form_flex_separator">:</div>
                                    <div class="form_flex_input">
                                        <input type="text" name="end_time_minutes" class="default_text" autocomplete="off" v-model="form.end.mins" maxlength="2" v-validate="'required|numeric|max_value:60|min_value:0'">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('end_time_minutes')">{{ errors.first('end_time_minutes') }}</span></transition>
                                    </div>
                                    <div class="form_flex_input">
                                        <input type="text" name="end_convention" class="default_text number no_click" autocomplete="off" v-model="form.end.convention" v-validate="'required'">
                                        <div class="up" @click="changeConvention('end', 'AM')"></div>
                                        <div class="down" @click="changeConvention('ebd', 'PM')"></div>
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('end_convention')">{{ errors.first('end_convention') }}</span></transition>
                                    </div>
                                </div>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="redemption_limit">Redemption Limit <span>*</span></label>
                                    <input type="text" name="redemption_limit" autocomplete="off" class="default_text" v-validate="'required|numeric'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('redemption_limit')">{{ errors.first('redemption_limit') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="per_customer_limit">Per Customer Limit <span>*</span></label>
                                    <input type="text" name="per_customer_limit" autocomplete="off" class="default_text" v-validate="'required|numeric'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('per_customer_limit')">{{ errors.first('per_customer_limit') }}</span></transition>
                                </div>
                            </div>
                            <div class="form_check">
                                <input type="checkbox" id="restrict_to_new_customers" name="restrict_to_new_customers" class="action_check" checked>
                                <label for="restrict_to_new_customers">Restrict to New Customers</label>
                            </div>
                        </div>
                    </div>
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Products</h2>
                            <div class="form_flex_radio">
                                <label class="radio_label">Apply this promo code to:</label>
                                <div class="form_radio">
                                    <input type="radio" id="class_packages" value="class_packages" name="apply_promo" class="action_radio" @change="getData('class_packages')">
                                    <label for="class_packages">Class Packages</label>
                                </div>
                                <div class="form_radio">
                                    <input type="radio" id="products" value="products" name="apply_promo" class="action_radio" @change="getData('products')">
                                    <label for="products">Products</label>
                                </div>
                            </div>
                        </div>
                        <transition name="fade">
                            <div class="form_main_group" v-if="filters.length > 0">
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="q">Search products</label>
                                        <input type="text" name="q" autocomplete="off" placeholder="Search for a product" class="default_text search_alternate">
                                    </div>
                                    <div class="form_group">
                                        <label for="products">Select Products</label>
                                        <select class="default_select alternate" name="products">
                                            <option value="" selected>All {{ (filterType == 'class_packages') ? 'Class Packages' : 'Products' }}</option>
                                            <option :value="data.id" v-for="(data, key) in filters">{{ data.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </transition>
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
    import Foot from '../../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                isDiscount: true,
                lastRoute: '',
                prevRoute: '',
                filters: [],
                filterType: '',
                form: {
                    start: {
                        hour: 0,
                        mins: 0,
                        convention: 'AM'
                    },
                    end: {
                        hour: 0,
                        mins: 0,
                        convention: 'PM'
                    }
                }
            }
        },
        methods: {
            getData (type) {
                const me = this
                let apiRoute = ''
                me.filterType = type
                switch (type) {
                    case 'class_packages':
                        apiRoute = 'api/packages/class-packages?enabled=1'
                        break
                    case 'products':
                        apiRoute = 'api/inventory/product-categories'
                        break
                }
                me.$axios.get(apiRoute).then(res => {
                    if (res.data) {
                        if (type == 'class_packages') {
                            me.filters = res.data.classPackages.data
                        } else {
                            me.filters = res.data.productCategories
                        }
                    }
                })
            },
            changeConvention (type, status) {
                const me = this
                switch (type) {
                    case 'start':
                        me.form.start.convention = status
                        break
                    case 'end':
                        me.form.end.convention = status
                        break
                }
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
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
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 4]
        }
    }
</script>
