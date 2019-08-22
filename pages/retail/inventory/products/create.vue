<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <nuxt-link :to="`/${prevRoute}/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ lastRoute }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Add New Product</h1>
                </div>
            </section>
            <section id="content">
                <form id="default_form" class="alternate" @submit.prevent="submissionSuccess()" enctype="multipart/form-data">
                    <div class="form_flex_wrapper">
                        <div class="form_wrapper main">
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="name">Product Name <span>*</span></label>
                                    <input type="text" name="name" autocomplete="off" class="default_text" autofocus v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ errors.first('name') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="description">Description <span>*</span></label>
                                    <textarea name="description" rows="10" class="default_text" @input="getCount($event)" maxlength="1000" v-validate="'required|max:1000'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('description')">{{ errors.first('description') }}</span></transition>
                                    <div class="limit">
                                        <span class="field_limit">1000</span> <span class="field_label">Characters</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form_wrapper side">
                            <div class="form_main_group">
                                <div class="form_group" v-if="$route.query.s">
                                    <label for="category_id">Category <span>*</span></label>
                                    <select class="default_select alternate" name="category_id" v-validate="'required'">
                                        <option value="" selected disabled>Choose a Category</option>
                                        <option :value="category.id" v-for="(category, key) in categories">{{ category.name }}</option>
                                    </select>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('category_id')">{{ errors.first('category_id') }}</span></transition>
                                </div>
                                <div class="form_group" v-if="$route.query.c">
                                    <label for="name">Product Name <span>*</span></label>
                                    <input type="text" name="name" autocomplete="off" class="default_text" v-validate="'required'">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ errors.first('name') }}</span></transition>
                                </div>
                                <div class="form_group" v-if="$route.query.c">
                                    <label for="supplier_id">Supplier <span>*</span></label>
                                    <select class="default_select alternate" name="supplier_id" v-validate="'required'">
                                        <option value="" selected>Choose a Supplier</option>
                                        <option :value="supplier.id" v-for="(supplier, key) in suppliers">{{ supplier.name }}</option>
                                    </select>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('supplier_id')">{{ errors.first('supplier_id') }}</span></transition>
                                </div>
                                <div class="form_group" v-if="$route.query.s">
                                    <label for="supplier_name">Supplier <span>*</span></label>
                                    <input type="text" name="supplier_name" autocomplete="off" class="default_text disabled" v-validate="'required'" v-model="form.supplier.name">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('supplier_name')">{{ errors.first('supplier_name') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="studio_id">Restrict to which studios: <span>*</span></label>
                                    <select class="default_select alternate" name="studio_id" v-validate="'required'">
                                        <option value="all" selected>All Studios</option>
                                        <option :value="studio.id" v-for="(studio, key) in studios">{{ studio.name }}</option>
                                    </select>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('studio_id')">{{ errors.first('studio_id') }}</span></transition>
                                </div>
                                <div class="form_flex_radio_alternate">
                                    <label>Is this sellable? <span>*</span></label>
                                    <div class="radio_wrapper">
                                        <div class="form_radio">
                                            <input type="radio" id="sellable_yes" value="Yes" name="sellable" class="action_radio">
                                            <label for="sellable_yes">Yes</label>
                                        </div>
                                        <div class="form_radio">
                                            <input type="radio" id="sellable_no" value="No" name="sellable" class="action_radio">
                                            <label for="sellable_no">No</label>
                                        </div>
                                    </div>
                                </div>
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
                                <nuxt-link :to="`/${prevRoute}/${lastRoute}`" class="action_cancel_btn">Cancel</nuxt-link>
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
                error: false,
                lastRoute: '',
                prevRoute: '',
                form: {
                    category: [],
                    supplier: []
                },
                studios: [],
                categories: [],
                suppliers: []
            }
        },
        methods: {
            /**
             * Count textarea character length */
            getCount (event) {
                let count = parseInt(event.target.value.length),
                    max = 1000,
                    total = max - count
                document.querySelector('.field_limit').innerText = total
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
                                    me.$router.push(`/${me.lastRoute}`)
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
            me.$axios.get('api/studios').then(res => {
                me.studios = res.data.studios
            })
            if (me.$route.query.s) {
                me.$axios.get(`api/suppliers/${me.$route.query.s}`).then(res => {
                    me.form.supplier = res.data.supplier
                })
            }
            if (me.$route.query.s) {
                me.$axios.get('api/inventory/product-categories').then(res => {
                    me.categories = res.data.productCategories
                })
            } else {
                me.$axios.get('api/suppliers').then(res => {
                    me.suppliers = res.data.suppliers.data
                })
            }
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 4]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 5]
        }
    }
</script>
