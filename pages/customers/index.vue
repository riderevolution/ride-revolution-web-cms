<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table" v-if="loaded">
                <div class="action_wrapper">
                    <h1 class="header_title">Customers</h1>
                    <div class="actions">
                        <div class="total">Total: {{ totalCount(res.customers.total) }}</div>
                        <div class="toggler">
                            <div :class="`status ${(status == 1) ? 'active' : ''}`" @click="toggleOnOff(1)">Activated</div>
                            <div :class="`status ${(status == 0) ? 'active' : ''}`" @click="toggleOnOff(0)">Deactivated</div>
                        </div>
                    </div>
                </div>
                <div class="action_buttons">
                    <nuxt-link :to="`${$route.path}/create`" class="action_btn"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add New Customer</nuxt-link>
                </div>
                <div class="filter_wrapper">
                    <div class="filter_flex">
                        <div class="form_group">
                            <label for="q">Find a Customer</label>
                            <input type="text" name="q" autocomplete="off" class="default_text search_alternate" v-model="form_search.user" @change="search()">
                        </div>
                        <div class="form_group margin">
                            <label for="studio_id">Customer Type</label>
                            <select class="default_select alternate" name="studio_id" v-model="form_search.studio" @change="search()">
                                <option value="All" selected disabled>All Customer Types</option>
                                <option :value="type.id" v-for="(type, key) in types" :key="key">{{ type.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            <section id="content" v-if="loaded">
                <table class="cms_table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Type</th>
                            <th>Rewards</th>
                            <th>Email Address</th>
                            <th>Contact No.</th>
                            <th>Pending Payment</th>
                        </tr>
                    </thead>
                    <tbody v-if="res.customers.data.length > 0">
                        <tr v-for="(data, key) in res.customers.data" :key="key">
                            <td class="thumb" width="10"><img :src="data.customer_details.images[0].path_resized" /></td>
                            <td><a class="table_data_link" :href="`${$route.path}/${data.id}`" table_action_text>{{ data.last_name }}</a></td>
                            <td><a class="table_data_link" :href="`${$route.path}/${data.id}`" table_action_text>{{ data.first_name }}</a></td>
                            <td>First Timer</td>
                            <td>Teal</td>
                            <td>{{ data.email }}</td>
                            <td>{{ (data.customer_details != null) ? data.customer_details.co_contact_number : '-' }}</td>
                            <td class="table_actions">
                                <div class="table_action_text red">Php 120.00</div>
                                <a class="table_action_success" href="javascript:void(0)">Pay Now</a>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="no_results" v-else>
                        <tr>
                            <td :colspan="rowCount">No Result(s) Found.</td>
                        </tr>
                    </tbody>
                </table>
                <pagination :apiRoute="res.customers.path" :current="res.customers.current_page" :last="res.customers.last_page" />
            </section>
        </div>
        <transition name="fade">
            <confirm-status v-if="$store.state.confirmStatus" ref="enabled" :status="status" />
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../components/Foot'
    import UserForm from '../../components/modals/UserForm'
    import RoleForm from '../../components/modals/RoleForm'
    import ConfirmStatus from '../../components/modals/ConfirmStatus'
    import Pagination from '../../components/Pagination'
    export default {
        components: {
            Foot,
            UserForm,
            RoleForm,
            ConfirmStatus,
            Pagination
        },
        data () {
            return {
                loaded: false,
                id: 0,
                type: 0,
                rowCount: 0,
                status: 1,
                res: [],
                types: [],
                form_search: {
                    user: '',
                    studio: 'All'
                }
            }
        },
        methods: {
            search () {
                const me = this
                console.log(me.form_search.user);
                console.log(me.form_search.studio);
            },
            /**
             * Toggle Confirm Status for Role
             * @param  {[int]}  id role.id
             * @param  {[boolean]}  enabled
             * @param  {[string]}  status
             * @return {boolean}
             */
            async toggleStatus (id, enabled, status) {
                const me = this
                me.$store.state.confirmStatus = true
                setTimeout( () => {
                    me.$refs.enabled.confirm.table_name = 'roles'
                    me.$refs.enabled.confirm.id = id
                    me.$refs.enabled.confirm.enabled = enabled
                    me.$refs.enabled.confirm.status = status
                    me.$refs.enabled.confirm.type = 'role'
                }, 100)
            },
            toggleOnOff (value) {
                const me = this
                me.status = value
                me.fetchData(value)
                me.rowCount = document.getElementsByTagName('th').length
            },
            fetchData (value) {
                const me = this
                me.loader(true)
                me.$axios.get(`api/customers?enabled=${value}`).then(res => {
                    me.res = res.data
                    me.loaded = true
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            fetchTypes () {
                const me = this
                me.$axios.get('api/extras/customer-types').then(res => {
                    me.types = res.data.customerTypes
                })
            }
        },
        async mounted () {
            const me = this
            me.fetchData(1)
            me.fetchTypes()
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
        }
    }
</script>
