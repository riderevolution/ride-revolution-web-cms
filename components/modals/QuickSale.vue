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
                            <div :class="`modal_tab_title ${(key == 0) ? 'active' : '' }`" v-for="(menu, key) in menus" :key="key" @click="toggleStatus(status = key, menu.type, menu.id)">{{ menu.name }}</div>
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
                            <div class="total_items">{{ totalItems(total) }} <span>items</span></div>
                        </div>
                        <div class="modal_tab_content">
                            <quick-sale-tab-content :value="value" :unique="index" v-for="(value, index) in showProducts" :key="`${unique}_${value.id}`" />
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
                status: 0,
                total: 0,
                products: [],
                menus: [
                    {
                        id: 0,
                        name: 'Ride Rewards',
                        type: 'ride-rewards'
                    },
                    {
                        id: 0,
                        name: 'Physical Gift Card',
                        type: 'physical-card'
                    },
                    {
                        id: 0,
                        name: 'Custom Gift Card',
                        type: 'custom-card'
                    }
                ],
                isProduct: true,
                toCompare: {
                    product: 0,
                    giftCard: 0
                },
                unique: 0
            }
        },
        computed: {
            showProducts () {
                const me = this
                let products = []
                switch (me.toCompare.giftCard) {
                    case 0:
                        me.products.forEach((product, index) => {
                            if (product.product) {
                                product.isProductShow = true
                            } else {
                                product.isGiftShow = false
                            }
                        })
                        break
                    case 1:
                        me.products.forEach((product, index) => {
                            if (product.product) {
                                product.isProductShow = false
                            } else {
                                product.isGiftShow = true
                            }
                        })
                        break
                }
                products = me.products
                return products
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.quickSaleStatus = false
                document.body.classList.remove('no_scroll')
            },
            countTotalItems (type) {
                const me = this
                let count = 0
                switch (type) {
                    case 'category':
                        me.products.forEach((product, index) => {
                            if (product.product) {
                                if (me.toCompare.product == product.product.product_category_id) {
                                    count++
                                }
                            }
                        })
                        break
                    case 'physical-card':
                        me.products.forEach((product, index) => {
                            if (!product.product) {
                                count++
                            }
                        })
                        break
                }
                me.total = count
            },
            toggleStatus (unique, type, id) {
                const me = this
                me.unique = unique
                const elements = document.querySelectorAll('.modal_tab .modal_tab_title')
                let formData = new FormData()
                elements.forEach((element, index) => {
                    if (unique == index) {
                        element.classList.add('active')
                    } else {
                        element.classList.remove('active')
                    }
                })
                switch (type) {
                    case 'category':
                        me.toCompare.product = id
                        me.toCompare.giftCard = 0
                        me.countTotalItems('category')
                        break
                    case 'physical-card':
                        me.toCompare.giftCard = 1
                        me.countTotalItems('physical-card')
                        break
                }
            },
            fetchTabContents () {
                const me = this
                me.$axios.get('api/inventory/product-categories').then(res => {
                    if (res.data) {
                        res.data.productCategories.forEach((productCategory, index) => {
                            me.menus.unshift(
                                {
                                    id: res.data.productCategories[res.data.productCategories.length - (index + 1)].id,
                                    name: res.data.productCategories[res.data.productCategories.length - (index + 1)].name,
                                    type: 'category'
                                }
                            )
                        })
                        me.toCompare.product = me.menus[0].id
                        me.countTotalItems('category')
                    }
                })
            },
            fetchData () {
                const me = this
                me.$axios.get('api/inventory/product-variants?enabled=1').then(res => {
                    if (res.data) {
                        me.products = res.data.productVariants.data
                        me.products.forEach((product, index) => {
                            product.isChecked = false
                        })
                        me.fetchTabContents()
                        me.$axios.get('api/inventory/gift-cards').then(res => {
                            if (res.data) {
                                res.data.giftCards.data.forEach((data, index) => {
                                    data.isChecked = false
                                    me.products.push(data)
                                })
                            }
                        })
                    }
                })
            }
        },
        mounted () {
            const me = this
            me.fetchData()
        }
    }
</script>
