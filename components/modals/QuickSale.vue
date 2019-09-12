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
                            <div class="modal_tab_title" v-for="(productCategory, key) in productCategories" :key="key">{{ productCategory.name }}</div>
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
                            <div class="total_items">{{ totalItems(1000) }} <span>items</span></div>
                        </div>
                        <div class="modal_tab_content">
                            <div class="modal_tab_content_wrapper">
                                <div class="form_check">
                                    <input type="checkbox" id="enabled" name="enabled" class="action_check">
                                    <label for="enabled">Lorem ipsum</label>
                                </div>
                                <div class="modal_tab_content_price">PHP {{ totalCount(1000) }}</div>
                                <div class="form_group flex">
                                    <label>Qty.</label>
                                    <div class="form_flex_input">
                                        <input type="text" name="quantity" class="default_text number" autocomplete="off" v-validate="'numeric|max_value:24|min_value:0'">
                                        <div class="up"></div>
                                        <div class="down"></div>
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('quantity')">{{ errors.first('quantity') }}</span></transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                productCategories: []
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.quickSaleStatus = false
                document.body.classList.remove('no_scroll')
            },
            fetchTabContents () {
                const me = this
                me.$axios.get('api/inventory/product-categories').then(res => {
                    if (res.data) {
                        me.productCategories = res.data.productCategories
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
