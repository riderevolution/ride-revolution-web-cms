<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <div class="action_wrapper">
                        <h1 class="header_title">Feedbacks</h1>
                        <div class="actions">
                            <div class="total">Total: {{ totalItems(totalResults) }}</div>
                        </div>

                    </div>
                </section>
                <section id="content">
                    <table class="cms_table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Email Address</th>
                                <th>Feedback Type</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="res.feedbacks.data.length > 0">
                            <tr v-for="(data, key) in res.feedbacks.data" :key="key">
                                <td>{{ data.id }}</td>
                                <td>{{ data.email }}</td>
                                <td>{{ data.feedback_type }}</td>
                                <td>{{ $moment(data.created_at).format('MMM DD, YYYY') }}</td>
                                <td width="20%">
                                    <div class="table_actions">
                                        <nuxt-link class="table_action_edit" :to="`${$route.path}/${data.id}/view`">View</nuxt-link>
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
                    <pagination :apiRoute="res.feedbacks.path" :current="res.feedbacks.current_page" :last="res.feedbacks.last_page" />
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
                lastRoute: '',
                rowCount: 0,
                totalResults: 0,
                res: []
            }
        },
        methods: {
            fetchData () {
                const me = this
                me.loader(true)
                me.$axios.get('api/feedbacks').then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data
                            me.totalResults = me.res.feedbacks.total
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
                me.fetchData()
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 500)
        }
    }
</script>
