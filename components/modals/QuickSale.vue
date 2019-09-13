<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <form id="default_form" class="overlay alternate" @submit.prevent="submissionAddSuccess()" enctype="multipart/form-data">
            <div class="modal_wrapper">
                <div class="form_close" @click="toggleClose()"></div>
                <div class="modal_tab_wrapper">
                    <div class="left_side">
                        <div class="overlay">
                            <h2 class="total_title">Buy Products</h2>
                            <div class="total_price">Total: PHP {{ totalCount(1000) }}</div>
                        </div>
                        <div class="modal_tab">
                            <div :class="`modal_tab_title ${(key == 0) ? 'active' : '' }`" v-for="(productCategory, key) in productCategories" :key="key" @click="fetchProducts(productCategory.id, type = key)">{{ productCategory.name }}</div>
                            <div class="modal_tab_title">Ride Rewards</div>
                            <div class="modal_tab_title">Physical Gift Card</div>
                            <div class="modal_tab_title">Custom Gift Card</div>
                        </div>
                    </div>
                    <div class="right_side">
                        <div class="modal_tab_content_header">
                            <div class="form_flex alternate">
                                <div class="form_group">
                                    <label for="q">Search a Product</label>
                                    <input type="text" name="q" autocomplete="off" placeholder="Search for a products" class="default_text search_alternate">
                                </div>
                                <div class="button_group">
                                    <button type="button" name="button" class="action_btn alternate">Take Payment</button>
                                </div>
                            </div>
                            <div class="total_items">{{ totalItems(productTotal) }} <span>items</span></div>
                        </div>
                        <div class="modal_tab_content">
                            <quick-sale-tab-content :value="product" v-for="(product, key) in products" :key="key" v-if="isProduct" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import QuickSaleTabContent from './QuickSaleTabContent'
    export default {
        components: {
            QuickSaleTabContent
        },
        data () {
            return {
                type: 0,
                isProduct: true,
                productTotal: 0,
                products: [],
                productCategories: []
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.quickSaleStatus = false
                document.body.classList.remove('no_scroll')
            },
            fetchProducts (id, unique) {
                const me = this
                const elements = document.querySelectorAll('.modal_tab .modal_tab_title')
                let formData = new FormData()
                elements.forEach((element, index) => {
                    if (unique == index) {
                        element.classList.add('active')
                    } else {
                        element.classList.remove('active')
                    }
                })
                formData.append('category_id', id)
                formData.append('enabled', 1)
                me.$axios.post('api/inventory/product-variants/search', formData).then(res => {
                    if (res.data) {
                        me.products = res.data.productVariants.data
                        me.productTotal = me.products.length
                    }
                })
            },
            fetchTabContents () {
                const me = this
                me.$axios.get('api/inventory/product-categories').then(res => {
                    if (res.data) {
                        me.productCategories = res.data.productCategories
                        me.fetchProducts(me.productCategories[0].id, 0)
                    }
                })
            }
        },
        mounted () {
            const me = this
            me.fetchTabContents()
        }
    }
</script>
