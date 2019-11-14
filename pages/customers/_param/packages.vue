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
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/packages`" class="tab_title">Packages</nuxt-link>
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/badges`" class="tab_title">Badges</nuxt-link>
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/upcoming-classes`" class="tab_title">Upcoming Classes</nuxt-link>
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/class-history`" class="tab_title">Class History</nuxt-link>
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/transactions`" class="tab_title">Transactions</nuxt-link>
                    <nuxt-link :to="`/${lastRoute}/${$route.params.param}/details`" class="tab_title">Details</nuxt-link>
                </div>
            </section>
            <section id="content">
                <div class="cms_table_toggler">
                    <div :class="`status ${(package_status == 1) ? 'active' : ''}`" @click="togglePackages(1)">Owned</div>
                    <div :class="`status ${(package_status == 2) ? 'active' : ''}`" @click="togglePackages(2)">Shared</div>
                </div>
                <div class="cms_table_package">
                    <div class="table_package">
                        <h2 class="package_title warning">50 Class Package <span>2 Days Left</span></h2>
                        <div class="package_details">
                            <div class="package_status">
                                <div class="box">
                                    <div class="overlay">
                                        <p>48</p>
                                        <label>Used</label>
                                    </div>
                                </div>
                                <div class="box margin">
                                    <div class="overlay">
                                        <p>2</p>
                                        <label>Available</label>
                                    </div>
                                </div>
                            </div>
                            <div class="package_date">
                                <div class="date">
                                    <p>Apr. 04, 2019 / Apr 8, 2019</p>
                                    <label>Purchase Date / Activation Date</label>
                                </div>
                                <div class="date margin">
                                    <p>Apr 8, 2020</p>
                                    <label>Expiry date <a href="javascript:void(0)" class="expiry_btn">Edit</a></label>
                                </div>
                            </div>
                            <div class="package_action">
                                <a href="javascript:void(0)" class="action_success_btn">Book a Class</a>
                                <div class="package_options">
                                    <div class="option_btn" @click.self="toggledOption($event)">Options</div>
                                    <div class="option_selector">
                                        <a href="javascript:void(0)" class="option_link">Transfer Package</a>
                                        <a href="javascript:void(0)" class="option_link">Share Package</a>
                                        <a href="javascript:void(0)" class="option_link">Freeze Package</a>
                                        <a href="javascript:void(0)" class="option_link">Print Receipt</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table_package">
                        <h2 class="package_title shared">10 Class Package <span>Shared with Sheena Villeta</span></h2>
                        <div class="package_details">
                            <div class="package_status">
                                <div class="box">
                                    <div class="overlay">
                                        <p>8</p>
                                        <label>Used</label>
                                    </div>
                                </div>
                                <div class="box margin">
                                    <div class="overlay">
                                        <p>2</p>
                                        <label>Available</label>
                                    </div>
                                </div>
                            </div>
                            <div class="package_date">
                                <div class="date">
                                    <p>Apr. 04, 2019 / Apr 8, 2019</p>
                                    <label>Purchase Date / Activation Date</label>
                                </div>
                                <div class="date margin">
                                    <p>Apr 8, 2020</p>
                                    <label>Expiry date <a href="javascript:void(0)" class="expiry_btn">Edit</a></label>
                                </div>
                            </div>
                            <div class="package_action">
                                <a href="javascript:void(0)" class="action_success_btn">Book a Class</a>
                                <div class="package_options">
                                    <div class="option_btn" @click.self="toggledOption($event)">Options</div>
                                    <div class="option_selector">
                                        <a href="javascript:void(0)" class="option_link">Transfer Package</a>
                                        <a href="javascript:void(0)" class="option_link">Share Package</a>
                                        <a href="javascript:void(0)" class="option_link">Freeze Package</a>
                                        <a href="javascript:void(0)" class="option_link">Print Receipt</a>
                                    </div>
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
    import Foot from '../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                lastRoute: '',
                package_status: 1
            }
        },
        methods: {
            toggledOption (event) {
                const me = this
                let element = event.target
                if (element.parentNode.classList.contains('toggled')) {
                    element.parentNode.classList.remove('toggled')
                } else {
                    element.parentNode.classList.add('toggled')
                }
            },
            togglePackages (status) {
                const me = this
                return me.package_status = status
            }
        },
        mounted () {
            const me = this
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
        }
    }
</script>
