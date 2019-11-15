<template>
    <div class="content">
        <div id="admin" class="cms_dashboard user">
            <section id="top_content">
                <nuxt-link :to="`/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ lastRoute }}</span></nuxt-link>
                <div class="user_info">
                    <div class="user_image_default">
                        AT
                    </div>
                    <div class="user_details">
                        <h1 class="user_name">Ayiin Tolentino</h1>
                        <div class="user_contact">
                            <a href="tel:0999 999 9999" class="number">0999 999 9999</a>
                            <a href="mailto:ayiin.tolentino@gmail.com" class="email">ayiin.tolentino@gmail.com</a>
                        </div>
                        <div class="user_summary">
                            <div class="summary">Completed Rides: 89</div>
                            <div class="summary">Store Credits: 2,000</div>
                            <div class="summary pending">Pending Payment: Php 500.00</div>
                        </div>
                        <div class="user_action">
                            <a href="javascript:void(0)" class="action_user_btn">Buy Credits</a>
                            <a href="javascript:void(0)" class="action_user_btn margin">Buy Products</a>
                        </div>
                    </div>
                </div>
                <div class="user_tabs">
                    <nuxt-link :to="tab.link" class="tab_title" v-for="(tab, key) in tabs" :key="key">{{ tab.name }}</nuxt-link>
                </div>
            </section>
            <section id="content">
                <customer-content :type="$route.params.slug" />
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import CustomerContent from '../../../components/CustomerContent'
    import Foot from '../../../components/Foot'
    export default {
        components: {
            CustomerContent,
            Foot
        },
        data () {
            return {
                lastRoute: '',
                tabs: [
                    {
                        name: 'Packages',
                        link: `/customers/${this.$route.params.param}/packages`
                    },
                    {
                        name: 'Badges',
                        link: `/customers/${this.$route.params.param}/badges`
                    },
                    {
                        name: 'Upcoming Classes',
                        link: `/customers/${this.$route.params.param}/upcoming-classes`
                    },
                    {
                        name: 'Class History',
                        link: `/customers/${this.$route.params.param}/class-history`
                    },
                    {
                        name: 'Transactions',
                        link: `/customers/${this.$route.params.param}/transactions`
                    },
                    {
                        name: 'Details',
                        link: `/customers/${this.$route.params.param}/details`
                    }
                ],
            }
        },
        mounted () {
            const me = this
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
        },
    }
</script>
