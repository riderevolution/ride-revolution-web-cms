<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <div class="action_wrapper">
                        <h1 class="header_title">Studios</h1>
                        <div class="actions">
                            <div class="total">Total: {{ totalItems(totalCount) }}</div>
                            <div class="toggler">
                                <div :class="`status ${(status == 1) ? 'active' : ''}`" @click="toggleOnOff(1)">Activated</div>
                                <div :class="`status ${(status == 0) ? 'active' : ''}`" @click="toggleOnOff(0)">Deactivated</div>
                            </div>
                        </div>
                    </div>
                    <div class="filter_wrapper">
                        <form class="filter_flex" id="filter" @submit.prevent="submitFilter()">
                            <div class="form_group">
                                <label for="q">Find a studio</label>
                                <input type="text" name="q" autocomplete="off" placeholder="Search for a studio" class="default_text search_alternate">
                            </div>
                            <button type="submit" name="button" class="action_btn alternate margin">Search</button>
                        </form>
                    </div>
                </section>
                <section id="content">
                    <table class="cms_table">
                        <thead>
                            <tr>
                                <th>Color</th>
                                <th>Studio</th>
                                <th>Purchases Email Sender</th>
                                <th>Reservations Email Sender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="res.length > 0">
                            <tr v-for="(data, key) in res" :key="key">
                                <td>
                                    <div class="table_color_code" :style="`background-color: ${data.color_code}`"></div>
                                </td>
                                <td>{{ data.name }}</td>
                                <td>{{ data.purchase_email }}</td>
                                <td>{{ data.reservations_email }}</td>
                                <td>
                                    <div class="table_actions">
                                        <nuxt-link class="table_action_edit" :to="`${$route.path}/${data.id}/edit`">Edit</nuxt-link>
                                        <nuxt-link class="table_action_success" :to="`${$route.path}/${data.id}/album`">Add Album</nuxt-link>
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
                totalCount: 0,
                status: 1,
                res: []
            }
        },
        methods: {
            submitFilter () {
                const me = this
                alert('<3')
            },
            toggleOnOff (value) {
                const me = this
                me.status = value
                me.fetchData(value)
            },
            fetchData (status) {
                const me = this
                me.loader(true)
                me.$axios.get(`api/studios?enabled=${status}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data.studios
                            me.rowCount = document.getElementsByTagName('th').length
                            me.totalCount = me.res.length
                            me.loaded = true
                        }, 500)
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
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
