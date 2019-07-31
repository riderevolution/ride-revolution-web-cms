<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content">
                <h1 class="header_title">Dashboard</h1>
                <div>
                    <nuxt-link class="action_btn" to="/">Back to Summary</nuxt-link>
                </div>
            </section>
            <section id="content" class="alternate">
                <div class="header_selector">
                    <select class="default_select">
                        <option value="greenbelt">Greenbelt</option>
                        <option value="shangri-la-plaza">Shangri-la Plaza</option>
                    </select>
                </div>
                <div class="information">
                    <div class="cms_col_four alternate">
                        <div class="filter">
                            <h2 class="action_highlight"><span>&#9679;</span> Juan Dela Cruz</h2>
                            <div class="filter_selector">
                                <select class="default_select">
                                    <option value="1">May 1, 2019</option>
                                </select>
                                <div class="divider">&mdash;</div>
                                <select class="default_select">
                                    <option value="2">May 5, 2019</option>
                                </select>
                            </div>
                        </div>
                        <div class="total_wrapper">
                            <div class="wrapper" v-for="(data, key) in res.today">
                                <div class="total_image">
                                    <img class="front" :src="data.imgSrc" />
                                    <img class="back" :src="data.imgSrc" />
                                </div>
                                <div class="total_count">{{ data.count }}</div>
                                <div class="total_text">{{ data.label }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="cms_col_alt_two">
                        <div class="wrapper">
                            <div class="header_wrapper">
                                <div class="header_title">Merchandise Inventory</div>
                                <div class="header_buttons">
                                    <nuxt-link class="action_btn" to="/">Audit</nuxt-link>
                                    <nuxt-link class="action_btn" to="/">Order</nuxt-link>
                                </div>
                                <input class="default_text search" type="text" placeholder="Search merchandise...">
                            </div>
                            <div class="list_wrapper">
                                <div class="list" v-for="(data, key) in res.merchs">
                                    <img src="/icons/bev-icon.svg" />
                                    <div class="list_title">{{ data.label }}</div>
                                    <div class="list_count">{{ data.count }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="wrapper">
                            <div class="header_wrapper">
                                <div class="header_title">Food &amp; Beverage Inventory</div>
                                <div class="header_buttons">
                                    <nuxt-link class="action_btn" to="/">Audit</nuxt-link>
                                    <nuxt-link class="action_btn" to="/">Order</nuxt-link>
                                </div>
                                <input class="default_text search" type="text" placeholder="Search food and beverage...">
                            </div>
                            <div class="list_wrapper">
                                <div class="list" v-for="(data, key) in res.bevs">
                                    <img src="/icons/bev-icon.svg" />
                                    <div class="list_title">{{ data.label }}</div>
                                    <div class="list_count">{{ data.count }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                res: {
                    today: [
                        {
                            label: 'Total Customers',
                            count: 235,
                            imgSrc: '/icons/total-customer-icon.svg'
                        },
                        {
                            label: 'Total Package Sales',
                            count: '₱150,000',
                            imgSrc: '/icons/total-package-sales-icon.svg'
                        },
                        {
                            label: 'Total Product Sales',
                            count: '₱47,830',
                            imgSrc: '/icons/total-product-sales-icon.svg'
                        },
                        {
                            label: 'Total Revenue from Packages',
                            count: '₱47,830',
                            imgSrc: '/icons/total-revenue-icon.svg'
                        }
                    ],
                    month: [
                        {
                            label: 'Total Customers',
                            count: 235,
                            imgSrc: '/icons/total-customer-icon.svg'
                        },
                        {
                            label: 'Total Package Sales',
                            count: '₱150,000',
                            imgSrc: '/icons/total-package-sales-icon.svg'
                        },
                        {
                            label: 'Total Product Sales',
                            count: '₱47,830',
                            imgSrc: '/icons/total-product-sales-icon.svg'
                        },
                        {
                            label: 'Total Revenue from Packages',
                            count: '₱47,830',
                            imgSrc: '/icons/total-revenue-icon.svg'
                        }
                    ],
                    merchs: [
                        {
                            label: 'A 2XU M Shirt Black Php2,500.00',
                            count: 5
                        },
                        {
                            label: 'B 2XU M Shirt Scarlet Scarlet Scarlet',
                            count: 5
                        },
                        {
                            label: 'A 2XU W Compression 3/4 BLK DRF',
                            count: 30
                        },
                        {
                            label: 'B 2XU M Shirt Black Php2,500.00',
                            count: 40
                        },
                        {
                            label: 'C 2XU M Shirt Scarlet Scarlet Scarlet',
                            count: 50
                        },
                        {
                            label: 'D 2XU W Compression 3/4 BLK DRF',
                            count: 60
                        },
                        {
                            label: 'E 2XU M Shirt Scarlet Scarlet Scarlet',
                            count: 70
                        }
                    ],
                    bevs: [
                        {
                            label: 'A BAI Drink',
                            count: 1
                        },
                        {
                            label: 'B Hope in a Bottle',
                            count: 5
                        },
                        {
                            label: 'A Justin’s Classic Peanut Butter',
                            count: 200
                        },
                        {
                            label: 'B BAI Drink',
                            count: 100
                        },
                        {
                            label: 'C Hope in a Bottle',
                            count: 25
                        },
                        {
                            label: 'D Avocado Pure Nectar',
                            count: 50
                        },
                        {
                            label: 'E Cashew Milk Pure Nectar',
                            count: 20
                        }
                    ]
                }
            }
        }
    }
</script>
