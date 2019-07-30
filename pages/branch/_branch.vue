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
                    <select class="default_selector">
                        <option value="greenbelt">Greenbelt</option>
                        <option value="shangri-la-plaza">Shangri-la Plaza</option>
                    </select>
                </div>
                <div class="information">
                    <div class="cms_col_four alternate">
                        <div class="filter">
                            <h2 class="action_highlight"><span>&#9679;</span> Juan Dela Cruz</h2>
                            <div class="filter_selector">
                                <select class="default_selector">
                                    <option value="1">May 1, 2019</option>
                                </select>
                                <div class="divider">&mdash;</div>
                                <select class="default_selector">
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
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
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
                    ]
                }
            }
        }
    }
</script>
