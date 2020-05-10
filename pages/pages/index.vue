<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <div class="action_wrapper">
                        <h1 class="header_title">Pages</h1>
                    </div>
                    <div class="filter_wrapper">
                        <form class="filter_flex" id="filter">
                            <div class="form_group">
                                <label for="q">Find a page</label>
                                <input type="text" name="q" autocomplete="off" @input="submitFilter()" v-model="form.search" placeholder="Search for a page title" class="default_text search_alternate">
                            </div>
                        </form>
                    </div>
                </section>
                <section id="content">
                    <table class="cms_table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Link</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="!noSearchFound">
                            <tr v-for="(data, key) in populatePages" :key="key" v-if="data.searched">
                                <td>{{ data.label }}</td>
                                <td>{{ data.page_link }}</td>
                                <td width="20%">
                                    <div class="table_actions">
                                        <a target="_blank" class="table_action_success" :href="data.page_link">View Page</a>
                                        <nuxt-link class="table_action_edit" :to="data.cms_link">Edit</nuxt-link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody class="no_results" v-else>
                            <tr>
                                <td :colspan="rowCount">No Result(s) Found.</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../components/Foot'
    export default {
        components: {
            Foot
        },
        computed: {
            populatePages () {
                const me = this
                let result = []
                me.res.forEach((data, index) => {
                    result.push(data)
                })
                return result
            }
        },
        data () {
            return {
                loaded: false,
                noSearchFound: false,
                form: {
                    search: ''
                },
                rowCount: 0,
                res: [
                    {
                        label: 'Home',
                        page_link: 'http://riderev.designbluemanila.ph',
                        cms_link: `/pages/home?h=${this.randomString()}`,
                        searched: true
                    },
                    {
                        label: 'Buy Rides',
                        page_link: 'http://riderev.designbluemanila.ph/buy-rides',
                        cms_link: '/pages/buy-rides',
                        searched: true
                    },
                    {
                        label: 'Book a Bike',
                        page_link: 'http://riderev.designbluemanila.ph/book-a-bike',
                        cms_link: '/pages/book-a-bike',
                        searched: true
                    },
                    {
                        label: "Rider's Guide",
                        page_link: 'http://riderev.designbluemanila.ph/riders-guide',
                        cms_link: `/pages/riders-guide?t=${this.randomString()}`,
                        searched: true
                    },
                    {
                        label: 'Instructors',
                        page_link: 'http://riderev.designbluemanila.ph/instructors',
                        cms_link: `/pages/instructors?n=${this.randomString()}`,
                        searched: true
                    },
                    {
                        label: 'Studios',
                        page_link: 'http://riderev.designbluemanila.ph/studios',
                        cms_link: '/pages/studios',
                        searched: true
                    },
                    {
                        label: 'About',
                        page_link: 'http://riderev.designbluemanila.ph/about',
                        cms_link: `/pages/about?t=${this.randomString()}`,
                        searched: true
                    },
                    {
                        label: 'Ride Rewards',
                        page_link: 'http://riderev.designbluemanila.ph/ride-rewards',
                        cms_link: `/pages/ride-rewards?t=${this.randomString()}`,
                        searched: true
                    },
                    {
                        label: 'Promos',
                        page_link: 'http://riderev.designbluemanila.ph/Promos',
                        cms_link: '/pages/Promos',
                        searched: true
                    },
                    {
                        label: 'News',
                        page_link: 'http://riderev.designbluemanila.ph/news',
                        cms_link: '/pages/news',
                        searched: true
                    },
                    {
                        label: 'FAQs',
                        page_link: 'http://riderev.designbluemanila.ph/faqs',
                        cms_link: '/pages/faqs',
                        searched: true
                    },
                    {
                        label: 'Refer a Friend',
                        page_link: 'http://riderev.designbluemanila.ph/refer-a-friend',
                        cms_link: '/pages/refer-a-friend',
                        searched: true
                    },
                    {
                        label: 'Contact Us',
                        page_link: 'http://riderev.designbluemanila.ph/contact-us',
                        cms_link: '/pages/contact-us',
                        searched: true
                    },
                    {
                        label: 'Privacy Policy',
                        page_link: 'http://riderev.designbluemanila.ph/privacy-policy',
                        cms_link: `/pages/privacy-policy?n=${this.randomString()}`,
                        searched: true
                    },
                    {
                        label: 'Terms & Conditions',
                        page_link: 'http://riderev.designbluemanila.ph/terms-and-conditions',
                        cms_link: `/pages/terms-and-conditions?n=${this.randomString()}`,
                        searched: true
                    },
                ]
            }
        },
        methods: {
            submitFilter () {
                const me = this
                let ctr = 0
                me.res.forEach((data, index) => {
                    let label = data.label.toLowerCase()
                    if (me.form.search != '') {
                        if (label.includes(me.form.search.toLowerCase())) {
                            data.searched = true
                        } else {
                            ctr++
                            data.searched = false
                        }
                    } else {
                        data.searched = true
                    }
                })
                if (ctr == me.res.length) {
                    me.noSearchFound = true
                } else {
                    me.noSearchFound = false
                }
                me.rowCount = document.getElementsByTagName('th').length
            }
        },
        mounted (){
            const me = this
            me.loaded = true
        }
    }
</script>
