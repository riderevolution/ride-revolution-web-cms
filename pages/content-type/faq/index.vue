<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <div class="action_wrapper">
                        <h1 class="header_title">FAQs</h1>
                        <div class="actions">
                            <div class="total">Total: {{ totalItems(totalResults) }}</div>
                            <div class="action_buttons">
                                <nuxt-link :to="`${$route.path}/create`" class="action_btn"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add a FAQ</nuxt-link>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="content">
                    <table class="cms_table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Sequence</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="res.faqs.data.length > 0">
                            <tr v-for="(data, key) in res.faqs.data" :key="key">
                                <td>{{ data.name }}</td>
                                <td>{{ data.sequence }}</td>
                                <td>{{ $moment(data.created_at).format('MMMM DD, YYYY') }}</td>
                                <td width="20%">
                                    <div class="table_actions">
                                        <nuxt-link class="table_action_edit" :to="`${$route.path}/${data.id}/edit`">Edit</nuxt-link>
                                        <div class="link table_action_cancel" @click="toggleDelete(data.id)">Delete</div>
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
                    <pagination :apiRoute="res.faqs.path" :current="res.faqs.current_page" :last="res.faqs.last_page" />
                </section>
            </div>
        </transition>
        <transition name="fade">
            <delete v-if="$store.state.deleteStatus" ref="delete" :url="`api/web/faqs`" />
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../components/Foot'
    import Pagination from '../../../components/Pagination'
    import Delete from '../../../components/modals/Delete'
    export default {
        components: {
            Foot,
            Pagination,
            Delete
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
            toggleDelete (id) {
                const me = this
                me.$store.state.deleteStatus = true
                document.body.classList.add('no_scroll')
                setTimeout( () => {
                    me.$refs.delete.contentID = id
                }, 100)
            },
            fetchData () {
                const me = this
                me.loader(true)
                me.$axios.get('api/web/faqs').then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data
                            me.totalResults = me.res.faqs.total
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
