<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="user">
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
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/packages`" class="tab_title">Packages</nuxt-link>
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/badges`" class="tab_title">Badges</nuxt-link>
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/upcoming-classes`" class="tab_title">Upcoming Classes</nuxt-link>
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/class-history`" class="tab_title">Class History</nuxt-link>
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/transactions`" class="tab_title">Transactions</nuxt-link>
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/details`" class="tab_title">Details</nuxt-link>
                </div>
            </section>
            <section id="content">
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                lastRoute: ''
            }
        },
        mounted () {
            const me = this
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
        }
    }
</script>
