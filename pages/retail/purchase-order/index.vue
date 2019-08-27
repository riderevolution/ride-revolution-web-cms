<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table" v-if="loaded">
                <div class="action_wrapper">
                    <h1 class="header_title">Purchase Orders</h1>
                    <div class="actions">
                        <div class="total">Total: {{ totalCount(res.suppliers.total) }}</div>
                        <div class="toggler">
                            <div :class="`status ${(status == 1) ? 'active' : ''}`" @click="toggleOnOff(1)">Paid</div>
                            <div :class="`status ${(status == 0) ? 'active' : ''}`" @click="toggleOnOff(0)">Unpaid</div>
                            <div :class="`status ${(status == -1) ? 'active' : ''}`" @click="toggleOnOff(-1)">Delivered</div>
                        </div>
                    </div>
                </div>
                <div class="action_buttons">
                    <nuxt-link :to="`${$route.path}/create`" class="action_btn"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>New Purchase Order</nuxt-link>
                </div>
                <div class="filter_wrapper">
                    <div class="filter_flex">
                        <div class="form_group">
                            <label for="q">Find a Product</label>
                            <input type="text" name="q" placeholder="Search for a product" autocomplete="off" class="default_text search_alternate" v-model="form_search.user" @change="search()">
                        </div>
                    </div>
                </div>
            </section>
            <section id="content" v-if="loaded">
                <table class="cms_table">
                    <thead>
                        <tr>
                            <th>Supplier Name</th>
                            <th>Email Address</th>
                            <th>Contact Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="res.suppliers.data.length > 0">
                        <tr v-for="(data, key) in res.suppliers.data" :key="key">
                            <td>{{ data.name }}</td>
                            <td>{{ data.email }}</td>
                            <td>{{ data.contact_number }}</td>
                            <td class="table_actions">
                                <nuxt-link class="table_action_edit" :to="`/${prevRoute}/inventory/products/create?s=${data.id}`">Add a Product</nuxt-link>
                                <nuxt-link class="table_action_edit" :to="`${$route.path}/${data.id}/edit`">Edit</nuxt-link>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="no_results" v-else>
                        <tr>
                            <td :colspan="rowCount">No Result(s) Found.</td>
                        </tr>
                    </tbody>
                </table>
                <pagination :apiRoute="res.suppliers.path" :current="res.suppliers.current_page" :last="res.suppliers.last_page" />
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../components/Foot'
    import Pagination from '../../../components/Pagination'
    export default {
        components: {
            Foot,
            Pagination        },
        data () {
            return {
                loaded: false,
                prevRoute: '',
                rowCount: 0,
                status: 1,
                res: [],
                form_search: {
                    user: ''
                }
            }
        },
        methods: {
            search () {
                const me = this
                console.log(me.form_search.user);
                console.log(me.form_search.studio);
            },
            toggleOnOff (value) {
                const me = this
                me.status = value
                me.fetchData(value)
            },
            fetchData (value) {
                const me = this
                me.loader(true)
                me.$axios.get(`api/suppliers?enabled=${value}`).then(res => {
                    me.res = res.data
                    me.loaded = true
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    me.rowCount = document.getElementsByTagName('th').length
                    setTimeout( () => {
                        me.loader(false)
                    }, 300)
                })
            }
        },
        async mounted () {
            const me = this
            me.fetchData(1)
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 2]
        }
    }
</script>
