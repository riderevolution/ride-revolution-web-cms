<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <nuxt-link :to="`/${prevRoute}/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ replacer(lastRoute) }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Update {{ res.name }}</h1>
                </div>
            </section>
            <section id="content">
                <form id="default_form" @submit.prevent="submissionSuccess()" enctype="multipart/form-data" v-if="loaded">
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Supplier Information</h2>
                        </div>
                        <div class="form_main_group">
                            <div class="form_group">
                                <label for="name">Supplier Name <span>*</span></label>
                                <input type="text" name="name" autocomplete="off" class="default_text" autofocus v-validate="'required'" v-model="res.name">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ errors.first('name') }}</span></transition>
                            </div>
                            <div class="form_group">
                                <label for="address">Office Address <span>*</span></label>
                                <input type="text" name="address" autocomplete="off" class="default_text" v-validate="'required'" v-model="res.address">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('address')">{{ errors.first('address') }}</span></transition>
                            </div>
                            <div class="form_flex">
                                <div class="form_group">
                                    <label for="email">Email Address <span>*</span></label>
                                    <input type="email" name="email" autocomplete="off" class="default_text" v-validate="'required|email'" v-model="res.email">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('email')">{{ errors.first('email') }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="contact_number">Contact Number <span>*</span></label>
                                    <input type="text" name="contact_number" autocomplete="off" class="default_text" v-validate="'required|numeric'" v-model="res.contact_number">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('contact_number')">{{ errors.first('contact_number') }}</span></transition>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form_wrapper">
                        <div class="form_header_wrapper">
                            <h2 class="form_title">Products</h2>
                            <nuxt-link :to="`/${prevRoute}/inventory/products/create?s=${res.id}`" class="action_success_btn">Add Product</nuxt-link>
                        </div>
                        <div class="form_main_group alternate_2">
                            <table class="cms_table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>SKU ID</th>
                                        <th>Unit Price (PHP)</th>
                                        <th>Sale Price (PHP)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(variant, key) in variants" :key="key">
                                        <td>{{ variant.variant }}</td>
                                        <td>{{ variant.sku_id }}</td>
                                        <td>{{ variant.unit_price }}</td>
                                        <td>{{ variant.sale_price }}</td>
                                        <td class="table_actions full">
                                            <a class="table_action_cancel" href="javascript:void(0)" @click="toggleDelete(variant.id)">Remove</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="form_flex">
                            <div class="form_check">
                                <input type="checkbox" id="enabled" name="enabled" class="action_check" :checked="res.enabled == 1">
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
        <transition name="fade">
            <confirm-delete v-if="$store.state.deleteStatus" ref="delete" :url="'api/inventory/product-variants'" />
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../../components/Foot'
    import ConfirmDelete from '../../../../components/modals/ConfirmDelete'
    export default {
        components: {
            Foot,
            ConfirmDelete
        },
        data () {
            return {
                loaded: false,
                lastRoute: '',
                prevRoute: '',
                res: [],
                variants: []
            }
        },
        methods: {
            toggleDelete (id) {
                const me = this
                me.$store.state.deleteStatus = true
                document.body.classList.add('no_scroll')
                setTimeout( () => {
                    me.$refs.delete.contentID = id
                }, 100)
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('_method', 'PATCH')
                        me.loader(true)
                        me.$axios.post(`api/suppliers/${me.$route.params.param}`, formData).then(res => {
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
                                    me.$router.push(`/${me.prevRoute}/${me.lastRoute}`)
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
            me.$axios.get(`api/suppliers/${me.$route.params.param}`).then(res => {
                me.res = res.data.supplier
                me.variants = []
                me.res.products.forEach((product, pindex) => {
                    product.product_variants.forEach((variant, vindex) => {
                        me.variants.push(variant)
                    })
                })
                me.loaded = true
            })
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 4]
        }
    }
</script>
