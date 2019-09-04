<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <form id="default_form" class="alternate" @submit.prevent="submissionSuccess()" enctype="multipart/form-data" v-if="loaded">
                <section id="top_content" class="table" v-if="loaded">
                    <nuxt-link :to="`/${prevRoute}/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ replacer(lastRoute) }}</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">
                            <div>New Purchase Orders</div>
                            <span class="header_id">ID: {{ randomID }}</span>
                            <div class="form_check alternate">
                                <input type="checkbox" id="paid" name="paid" class="action_check">
                                <label for="paid">Paid</label>
                            </div>
                        </h1>
                    </div>
                    <div class="filter_wrapper">
                        <div class="filter_flex" id="filter">
                            <div class="form_group">
                                <label for="supplier_id">Supplier</label>
                                <select class="default_select alternate" name="supplier_id" @change="isSupplier = true" v-model="form.supplier">
                                    <option value="" selected disabled>Select a Supplier</option>
                                    <option :value="supplier.id" v-for="(supplier, key) in suppliers" :key="key">{{ supplier.name }}</option>
                                </select>
                            </div>
                            <div class="form_group margin">
                                <label for="studio_id">Studio</label>
                                <select :class="`default_select alternate ${(!isSupplier) ? 'disabled' : '' }`" name="studio_id" v-model="form.studio" @change="searchVariants()">
                                    <option value="" selected disabled>Select a Studio</option>
                                    <option :value="studio.id" v-for="(studio, key) in studios" :key="key">{{ studio.name }}</option>
                                </select>
                            </div>
                            <div class="form_group margin">
                                <label for="po_number">P.O. Number</label>
                                <input type="text" name="po_number" placeholder="Enter P.O. Number" autocomplete="off" :class="`default_text ${(!isStudio) ? 'disabled' : '' }`" v-validate="'required'">
                                <transition name="slide"><span class="validation_errors" v-if="errors.has('po_number')">{{ errors.first('po_number') }}</span></transition>
                            </div>
                            <div class="form_group margin" v-click-outside="closeMe">
                                <label>Search a Product</label>
                                <input type="text" autocomplete="off" placeholder="Add a product" :class="`default_text search_alternate ${(!isStudio) ? 'disabled' : '' }`" @click="autocomplete ^= true">
                                <div class="cms_autocomplete ${(variants.length >= 6) ? 'scrollable' : ''}`" v-if="autocomplete">
                                    <div class="autocomplete_title" v-for="(variant, key) in variants" :key="key" @click="addVariant(variant)" v-if="variants.length > 0">{{ variant.variant }}</div>
                                    <div class="autocomplete_title" v-if="variants.length == 0">No Product(s) Found.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="content" v-if="loaded">
                    <div class="cms_table_input alternate" v-if="isSupplier && isStudio">
                        <div class="header_wrapper">
                            <div class="input_header">Product Name</div>
                            <div class="input_header">SKU ID</div>
                            <div class="input_header">Sellable</div>
                            <div class="input_header">Category</div>
                            <div class="input_header">In Stock</div>
                            <div class="input_header">Qty.</div>
                            <div class="input_header">Unit Price</div>
                            <div class="input_header">Shipping Cost</div>
                            <div class="input_header">Additional Cost</div>
                            <div class="input_header">Cost</div>
                        </div>
                        <div class="content_wrapper" v-if="purchaseOrders.length > 0">
                            <purchase-order ref="orders" :unique="key" :value="data" v-for="(data, key) in purchaseOrders" :key="key" />
                            <div class="footer_wrapper">
                                <div class="footer_cost">Total Additional Cost: PHP {{ computeAdditional }}</div>
                                <div class="footer_cost">Total Shipping Cost: PHP {{ computeShipping }}</div>
                                <div class="footer_total_cost">Total: <span class="total_cost">PHP {{ getAllCost }}</span></div>
                            </div>
                        </div>
                        <div class="no_results" v-if="purchaseOrders.length == 0">
                            No Variant(s) Found. Please add a variant.
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="button_group">
                                <nuxt-link :to="`/${prevRoute}/${lastRoute}`" class="action_cancel_btn">Cancel</nuxt-link>
                                <button type="submit" name="submit" class="action_btn alternate margin">Create P.O.</button>
                            </div>
                        </div>
                    </div>
                    <div class="no_contents" v-else>
                        Select a supplier &amp; studio before entering any products.
                    </div>
                </section>
            </form>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import PurchaseOrder from '../../../components/PurchaseOrder'
    import Foot from '../../../components/Foot'
    export default {
        components: {
            PurchaseOrder,
            Foot
        },
        provide () {
            return {
                $validator: this.$validator
            }
        },
        data () {
            return {
                isSupplier: false,
                isStudio: false,
                autocomplete: false,
                loaded: false,
                randomID: 0,
                lastRoute: '',
                prevRoute: '',
                status: 1,
                suppliers: [],
                studios: [],
                variants: [],
                purchaseOrders: [],
                form: {
                    supplier: '',
                    studio: '',
                    additional: [],
                    shipping: [],
                    total: []
                }
            }
        },
        computed: {
            getAllCost () {
                const me = this
                let total = 0.00
                me.form.total.forEach((item, index) => {
                    if (item.unique !== undefined) {
                        total = total + parseFloat(item.value)
                    }
                })
                return me.totalCount(total)
            },
            computeShipping () {
                const me = this
                let shipping = 0.00
                me.form.shipping.forEach((item, index) => {
                    if (item.unique !== undefined) {
                        shipping = shipping + parseFloat(item.value)
                    }
                })
                return me.totalCount(shipping)
            },
            computeAdditional () {
                const me = this
                let additional = 0.00
                me.form.additional.forEach((item, index) => {
                    if (item.unique !== undefined) {
                        additional = additional + parseFloat(item.value)
                    }
                })
                return me.totalCount(additional)
            }
        },
        methods: {
            closeMe () {
                const me = this
                me.autocomplete = false
            },
            addVariant (data) {
                const me = this
                me.purchaseOrders.push(data)
                me.fetchItems()
                me.autocomplete = false
            },
            fetchItems () {
                const me = this
                if (me.purchaseOrders.length > 0) {
                    me.purchaseOrders.forEach((purchaseOrder, pindex) => {
                        me.variants.forEach((variant, vindex) => {
                            if (purchaseOrder.id == variant.id) {
                                me.variants.splice(vindex, 1)
                            }
                        })
                    })
                    for (let i = me.form.shipping.length; i < me.purchaseOrders.length; i++) {
                        me.form.shipping.push(
                            {
                                unique: i,
                                value: 0.00
                            }
                        )
                    }
                    for (let j = me.form.additional.length; j < me.purchaseOrders.length; j++) {
                        me.form.additional.push(
                            {
                                unique: j,
                                value: 0.00
                            }
                        )
                    }
                    for (let k = me.form.total.length; k < me.purchaseOrders.length; k++) {
                        me.form.total.push(
                            {
                                unique: k,
                                value: 0.00
                            }
                        )
                    }
                }
            },
            searchVariants () {
                const me = this
                me.$axios.get(`api/extras/purchase-orders-products-filter?supplier_id=${me.form.supplier}&studio_id=${me.form.studio}`).then(res => {
                    me.variants = res.data.productVariants
                    me.variants.forEach((variant, vindex) => {
                        if (variant.quantity < variant.reorder_point) {
                            me.purchaseOrders.push(variant)
                        }
                    })
                    me.fetchItems()
                    me.isStudio = true
                })
            },
            fetchData () {
                const me = this
                me.$axios.get('api/studios').then(res => {
                    me.studios = res.data.studios
                })
                me.$axios.get('api/suppliers').then(res => {
                    me.suppliers = res.data.suppliers.data
                })
                me.$axios.get('api/extras/random-string').then(res => {
                    me.randomID = res.data.randomString
                })
                me.loaded = true
            },
            submissionSuccess () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('po_id', me.randomID)
                        me.loader(true)
                        me.$axios.post('api/inventory/purchase-orders', formData).then(res => {
                            console.log(res.data)
                        //     setTimeout( () => {
                        //         if (res.data) {
                        //             me.notify('Added')
                        //         } else {
                        //             me.$store.state.errorList.push('Sorry, Something went wrong')
                        //             me.$store.state.errorStatus = true
                        //         }
                        //     }, 500)
                        // }).catch(err => {
                        //     me.$store.state.errorList = err.response.data.errors
                        //     me.$store.state.errorStatus = true
                        // }).then(() => {
                        //     setTimeout( () => {
                        //         if (!me.$store.state.errorStatus) {
                        //             me.$router.push(`/${me.prevRoute}/${me.lastRoute}`)
                        //         }
                        //         me.loader(false)
                        //     }, 500)
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
            me.fetchData()
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 2]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
        }
    }
</script>
