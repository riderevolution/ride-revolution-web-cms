<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/studio" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Studios</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Albums</h1>
                        <div class="actions">
                            <div class="total">Total: {{ totalItems(totalResults) }}</div>
                            <div class="action_buttons">
                                <nuxt-link class="action_btn" :to="`${$route.path}/create`"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add an Album</nuxt-link>
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
                                <th>Featured</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="res.length > 0">
                            <tr v-for="(data, key) in res" :key="key">
                                <td>{{ data.name }}</td>
                                <td>{{ data.sequence }}</td>
                                <td>{{ (data.is_featured) ? 'Yes' : 'No' }}</td>
                                <td>{{ $moment(data.created_at).format('MMMM DD, YYYY') }}</td>
                                <td width="20%">
                                    <div class="table_actions">
                                        <nuxt-link :to="`${$route.path}/${data.id}/edit`" class="link table_action_edit">Edit</nuxt-link>
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
                </section>
            </div>
        </transition>
        <transition name="fade">
            <delete v-if="$store.state.deleteStatus" ref="delete" :url="`api/web/studio-albums`" />
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../../../components/Foot'
    import Delete from '../../../../../components/modals/Delete'
    export default {
        components: {
            Foot,
            Delete
        },
        data () {
            return {
                loaded: false,
                rowCount: 0,
                totalResults: 0,
                res: [],
                status: 1
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
            fetchData (value) {
                const me = this
                me.loader(true)
                me.$axios.get(`api/web/studio-albums?studio_id=${me.$route.params.param}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data.studioAlbums
                            me.totalResults = me.res.length
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
            me.fetchData(1)
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
        }
    }
</script>
