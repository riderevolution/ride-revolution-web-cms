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
                                    <input type="text" name="name" autocomplete="off" class="default_text" autofocus v-validate="'required'" v-model="form.title">
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
                                    <label for="product_category_id">Category <span>*</span></label>
                                    <select class="default_select alternate" name="product_category_id" v-validate="'required'">
                                        <option value="" selected disabled>Choose a Category</option>
                                        <option :value="category.id" v-for="(category, key) in categories">{{ category.name }}</option>
                                    </select>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('product_category_id')">{{ errors.first('product_category_id') }}</span></transition>
                                </div>
                                <div class="form_group" v-if="$route.query.c">
                                    <label for="product_category_name">Category <span>*</span></label>
                                    <input type="text" name="product_category_name" autocomplete="off" class="default_text disabled" v-validate="'required'" v-model="form.category.name">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('product_category_name')">{{ errors.first('product_category_name') }}</span></transition>
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
                                            <input type="radio" id="sellable_yes" value="Yes" name="sellable" class="action_radio" checked>
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
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <div class="title">
                                <h2 class="form_title">Inventory Pricing</h2>
                                <h3 class="form_label">Modify the variants to be created.</h3>
                            </div>
                            <a href="javascript:void(0)" class="action_success_btn" @click="addVariant()"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add a Variant</a>
                        </div>
                        <div class="form_main_group alternate_2">
                            <table class="cms_table">
                                <thead>
                                    <tr>
                                        <th>Variant</th>
                                        <th>SKU ID</th>
                                        <th>Inventory Qty.</th>
                                        <th>Reorder Point</th>
                                        <th>Unit Price (PHP)</th>
                                        <th>Sale Price (PHP)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(variant, key) in variants" :key="key">
                                        <td><input type="text" name="name[]" autocomplete="off" class="default_text"></td>
                                        <td><input type="text" name="sku_id[]" autocomplete="off" class="default_text"></td>
                                        <td><input type="text" name="qty[]" autocomplete="off" class="default_text"></td>
                                        <td><input type="text" name="reorder_point[]" autocomplete="off" class="default_text"></td>
                                        <td><input type="text" name="unit_price[]" autocomplete="off" class="default_text"></td>
                                        <td><input type="text" name="sale_price[]" autocomplete="off" class="default_text"></td>
                                        <td class="image_upload" width="300"><a href="javascript:void(0)" class="action_btn" @click="toggleVariantImage(id, 0)"><svg xmlns="http://www.w3.org/2000/svg" width="18.306" height="18.306" viewBox="0 0 18.306 18.306"> <g transform="translate(-1233.873 -1197.248) rotate(-9)"> <g transform="translate(1031 1378)" class="upload_image"> <rect width="16" height="16" rx="2" stroke="none" /> <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="none" /> </g> <path d="M16305.061-1443.824l5.559-4.864,4.563,4.259,2.891-3.014,2.3,3.014" transform="translate(-15273.644 2834.915)" class="upload_image" /> <g transform="translate(1039 1380.909)" class="upload_image"> <circle cx="1.818" cy="1.818" r="1.818" stroke="none" /> <circle cx="1.818" cy="1.818" r="1.318" fill="none" /> </g> </g> </svg>Uploaded Image (0)</a></td>
                                    </tr>
                                </tbody>
                            </table>
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
                                <button type="submit" name="submit" class="action_btn alternate margin">Upload</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
        <transition name="fade">
            <variant-image-form v-if="$store.state.variantImageForm" :type="type" :id="id" :parentTitle="form.title" />
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../../components/Foot'
    import VariantImageForm from '../../../../components/modals/VariantImageForm'
    export default {
        components: {
            Foot,
            VariantImageForm
        },
        data () {
            return {
                id: 0,
                error: false,
                lastRoute: '',
                prevRoute: '',
                form: {
                    title: '',
                    category: [],
                    supplier: []
                },
                studios: [],
                categories: [],
                suppliers: [],
                variants: [0]
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
            /**
             * Toggle User and Role Form
             * @param  {[int]} value id
             * @param  {[int]} type method
             * @param  {[string]} category
             * @return {[boolean]}
             */
            toggleVariantImage (value, type) {
                const me = this
                me.$store.state.variantImageForm = true
                document.body.classList.add('no_scroll')
                me.type = type
                if (value != 0) {
                    me.id = value
                }
            },
            addVariant () {
                const me = this
                me.variants.push(0)
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        me.loader(true)
                        me.$axios.post('api/inventory/products', formData).then(res => {
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
                me.$axios.get('api/inventory/product-categories').then(res => {
                    me.categories = res.data.productCategories
                })
                me.$axios.get(`api/suppliers/${me.$route.query.s}`).then(res => {
                    me.form.supplier = res.data.supplier
                })
            } else {
                me.$axios.get('api/suppliers').then(res => {
                    me.suppliers = res.data.suppliers.data
                })
                me.$axios.get(`api/inventory/product-categories/${me.$route.query.c}`).then(res => {
                    me.form.category = res.data.productCategory
                })
            }
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 4]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 5]
        }
    }
</script>
