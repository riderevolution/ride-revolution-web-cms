<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <div class="action_wrapper">
                        <h1 class="header_title">Promos</h1>
                        <div class="actions">
                            <div class="total">Total: {{ totalItems(totalResults) }}</div>
                            <div class="toggler">
                                <div :class="`status ${(status == 1) ? 'active' : ''}`" @click="toggleOnOff(1)">Activated</div>
                                <div :class="`status ${(status == 0) ? 'active' : ''}`" @click="toggleOnOff(0)">Deactivated</div>
                            </div>
                        </div>
                    </div>
                    <div class="filter_wrapper">
                        <form class="filter_flex" id="filter" @submit.prevent="submitFilter()">
                            <div class="form_group">
                                <label for="q">Find a promo</label>
                                <input type="text" name="q" autocomplete="off" placeholder="Search for a promo" class="default_text search_alternate">
                            </div>
                            <button type="submit" name="button" class="action_btn alternate margin">Search</button>
                        </form>
                    </div>
                </section>
                <section id="content">
                    <table class="cms_table">
                        <thead>
                            <tr>
                                <th>Promo Name</th>
                                <th>Discount</th>
                                <th>Promo Code</th>
                                <th>Start date</th>
                                <th>End Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="res.promos.data.length > 0">
                            <tr v-for="(data, key) in res.promos.data" :key="key">
                                <td>{{ data.name }}</td>
                                <td>{{ (data.discount_type == 'percent') ? `${data.discount_percent}  %` : `PHP ${totalCount(data.discount_flat_rate)}` }}</td>
                                <td>{{ data.promo_code }}</td>
                                <td>{{ formatDate(data.start_date) }}</td>
                                <td>{{ formatDate(data.end_date) }}</td>
                                <td>
                                    <div class="table_actions">
                                        <nuxt-link class="table_action_edit" :to="`${$route.path}/${data.id}/edit`">Edit</nuxt-link>
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
                    <pagination :apiRoute="res.promos.path" :current="res.promos.current_page" :last="res.promos.last_page" />
                </section>
            </div>
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../components/Foot'
    import Pagination from '../../../components/Pagination'
    export default {
        components: {
            Foot,
            Pagination
        },
        data () {
            return {
                loaded: false,
                rowCount: 0,
                totalResults: 0,
                status: 1,
                res: [],
                studios: []
            }
        },
        methods: {
            formatDate (value) {
                if (value) {
                    return this.$moment(value).format('MMM DD, YYYY')
                }
            },
            submitFilter () {
                const me = this
                let formData = new FormData(document.getElementById('filter'))
                formData.append('enabled', me.status)
                me.loader(true)
                me.$axios.post(`api/inventory/promos/search`, formData).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data
                            me.totalResults = me.res.promos.total
                        }, 500)
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.rowCount = document.getElementsByTagName('th').length
                        me.loader(false)
                    }, 500)
                })
            },
            toggleOnOff (value) {
                const me = this
                me.status = value
                me.fetchData(value)
            },
            fetchData (status) {
                const me = this
                me.loader(true)
                me.$axios.get(`api/inventory/promos?enabled=${status}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data
                            me.totalResults = me.res.promos.total
                            me.loaded = true
                        }, 500)
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.rowCount = document.getElementsByTagName('th').length
                        me.loader(false)
                    }, 500)
                })
            }
        },
        mounted () {
            const me = this
            setTimeout( () => {
                me.fetchData(1)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 500)
        }
    }
</script>
