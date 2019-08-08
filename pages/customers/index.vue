<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <div class="action_wrapper">
                    <h1 class="header_title">Customers</h1>
                    <div class="actions">
                        <nuxt-link :to="`${$route.path}/create`" class="action_btn"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add New Customer</nuxt-link>
                        <div class="total">Total: {{ totalCount(total_count) }}</div>
                        <div class="toggler">
                            <div :class="`status ${(status == 1) ? 'active' : ''}`" @click="toggleOnOff(1)">Activated</div>
                            <div :class="`status ${(status == 0) ? 'active' : ''}`" @click="toggleOnOff(0)">Deactivated</div>
                        </div>
                    </div>
                </div>
                <div class="filter_wrapper">
                    <div class="filter_flex">
                        <div class="form_group">
                            <label for="q">Find a user</label>
                            <input type="text" name="q" autocomplete="off" class="default_text" v-model="form_search.user" @change="search()">
                        </div>
                        <div class="form_group margin">
                            <label for="studio_id">Customer Type</label>
                            <select class="default_select alternate" name="studio_id" v-model="form_search.studio" @change="search()">
                                <option value="All" selected disabled>All Studios</option>
                                <option :value="studio.id" v-for="(studio, key) in studios" :key="key">{{ studio.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            <section id="content">
                <!-- Accordion Role -->
                <div class="cms_table_accordion" v-if="status == 1">
                    <div class="header_wrapper">
                        <div class="accordion_header">Role Name</div>
                        <div class="accordion_header">Users</div>
                        <div class="accordion_header">Permissions</div>
                        <div class="accordion_header action">Action</div>
                    </div>
                    <div :class="`content_wrapper ${(role.open) ? 'toggled' : ''}`" v-for="(role, key) in res">
                        <div class="toggler" @click="toggleAccordion($event, key)"></div>
                        <div class="content_headers">
                            <div class="accordion_content">{{ role.display_name }}</div>
                            <div class="accordion_content">{{ countActivatedUsers(role.staff_details) }}</div>
                            <div class="accordion_content">{{ countPermissions(parser(role.permissions)) }}</div>
                            <div class="accordion_actions action">
                                <a class="accordion_action_edit" href="javascript:void(0)" @click="toggleForm(role.id, 1, 'role')">Edit Role</a>
                                <a class="accordion_action_cancel" @click.self="toggleStatus(role.id, 0, 'Deactivated')" href="javascript:void(0)" v-if="status == 1">Deactivate Role</a>
                                <a class="accordion_action_success" @click.self="toggleStatus(role.id, 1, 'Activated')" href="javascript:void(0)" v-if="status == 0">Activate Role</a>
                            </div>
                        </div>
                        <!-- Accordion User per Role -->
                        <div class="accordion_table">
                            <table class="cms_table">
                                <thead>
                                    <tr>
                                        <th class="padding_left">Email Address</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody v-if="role.staff_details.length > 0">
                                    <tr v-for="(staff, key) in role.staff_details" :key="key" v-if="staff.user.enabled == 1">
                                        <td class="padding_left">{{ staff.user.email }}</td>
                                        <td>{{ staff.user.first_name }}</td>
                                        <td>{{ staff.user.last_name }}</td>
                                        <td class="table_actions">
                                            <a class="table_action_edit" href="javascript:void(0)" @click="toggleForm(staff.user.id, 1, 'user')">Edit User</a>
                                            <a class="table_action_cancel" @click.self="toggleUserStatus(staff.user.id, 0, 'Deactivated')" href="javascript:void(0)" v-if="status == 1">Deactivate User</a>
                                            <a class="table_action_success" @click.self="toggleUserStatus(staff.user.id, 1, 'Activated')" href="javascript:void(0)" v-if="status == 0">Activate User</a>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody class="no_results" v-else>
                                    <tr>
                                        <td :colspan="rowCount">No Result(s) Found.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- Roles Table -->
                <table class="cms_table" v-else-if="status == 0">
                    <thead>
                        <tr>
                            <th>Role Name</th>
                            <th>Users</th>
                            <th>Permissions</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="res.length > 0">
                        <tr v-for="(role, key) in res" :key="key">
                            <td>{{ role.display_name }}</td>
                            <td>{{ role.staff_details.length }}</td>
                            <td>{{ countPermissions(parser(role.permissions)) }}</td>
                            <td class="table_actions">
                                <a class="table_action_edit" href="javascript:void(0)" @click="toggleForm(role.id, 1, 'role')">Edit Role</a>
                                <a class="table_action_success" @click.self="toggleStatus(role.id, 1, 'Activated')" href="javascript:void(0)">Activate Role</a>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="no_results" v-else>
                        <tr>
                            <td :colspan="rowCount">No Result(s) Found.</td>
                        </tr>
                    </tbody>
                </table>
                <!-- Users Table -->
                <table class="cms_table" v-else-if="status == -1">
                    <thead>
                        <tr>
                            <th>Email Address</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="res.length > 0">
                        <tr v-for="(staff, key) in res" :key="key">
                            <td>{{ staff.email }}</td>
                            <td>{{ staff.first_name }}</td>
                            <td>{{ staff.last_name }}</td>
                            <td class="table_actions">
                                <a class="table_action_edit" href="javascript:void(0)" @click="toggleForm(staff.id, 1, 'user')">Edit User</a>
                                <a class="table_action_success" @click.self="toggleUserStatus(staff.id, 1, 'Activated')" href="javascript:void(0)">Activate User</a>
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
        <transition name="fade">
            <user-form v-if="$store.state.userForm" :type="type" :id="id" />
        </transition>
        <transition name="fade">
            <role-form v-if="$store.state.roleForm" :type="type" :id="id" />
        </transition>
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
    export default {
        components: {
            Foot,
            UserForm,
            RoleForm,
            ConfirmStatus
        },
        data () {
            return {
                id: 0,
                type: 0,
                rowCount: 0,
                status: 1,
                res: [],
                total_count: 0,
                studios: [],
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
             * Count Permissions per role
             * @param  {[array]} values
             * @return {[ctr]}
             */
            countPermissions (values) {
                const me = this
                if (values !== undefined) {
                    let ctr = 0
                    values.forEach((value, index) => {
                        if (value.checked) {
                            ctr++
                        }
                    })
                    if (ctr == 16) {
                        return 'All'
                    } else {
                        return ctr
                    }
                }
            },
            /**
             * Count Activated Users
             * @param  {[array]} values
             * @return {[ctr]}
             */
            countActivatedUsers (values) {
                const me = this
                if (values.length > 0) {
                    if (values !== undefined) {
                        let ctr = 0
                        values.forEach((value, index) => {
                            if (value !== undefined) {
                                if (value.user.enabled) {
                                    ctr++
                                }
                            }
                        })
                        return ctr
                    }
                } else {
                    return 0
                }
            },
            /**
             * Custom toggler for accordion
             * @param  {[object]} event
             * @param  {[int]} key
             * @return {[css]}
             */
            toggleAccordion (event, key) {
                const me = this
                const target = event.target
                me.res[key].open ^= true
                if (me.res[key].open) {
                    target.parentNode.querySelector('.accordion_table').style.height = `${target.parentNode.querySelector('.accordion_table').scrollHeight}px`
                } else {
                    target.parentNode.querySelector('.accordion_table').style.height = 0
                }
            },
            /**
             * Toggle User and Role Form
             * @param  {[int]} value id
             * @param  {[int]} type method
             * @param  {[string]} category
             * @return {[boolean]}
             */
            toggleForm (value, type, category) {
                const me = this
                switch (category) {
                    case 'role':
                        me.$store.state.roleForm = true
                        break
                    case 'user':
                        me.$store.state.userForm = true
                        break
                }
                me.type = type
                if (value != 0) {
                    me.id = value
                }
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
            async toggleUserStatus (id, enabled, status) {
                const me = this
                me.$store.state.confirmStatus = true
                setTimeout( () => {
                    me.$refs.enabled.confirm.table_name = 'users'
                    me.$refs.enabled.confirm.id = id
                    me.$refs.enabled.confirm.enabled = enabled
                    me.$refs.enabled.confirm.status = status
                    me.$refs.enabled.confirm.type = 'user'
                }, 100)
            },
            toggleOnOff (value) {
                const me = this
                me.status = value
                me.fetchData(value)
                me.rowCount = document.getElementsByTagName('th').length
            },
            async fetchData (value) {
                const me = this
                me.loader(true)
                if (value != -1) {
                    me.$axios.get(`api/roles?enabled=${value}`).then(res => {
                        me.res = res.data.roles
                        me.total_count = me.res.length
                    }).catch(err => {
                        me.$store.state.errorList = err.response.data.errors
                        me.$store.state.errorStatus = true
                    }).then(() => {
                        setTimeout( () => {
                            me.loader(false)
                            const elements = document.querySelectorAll('.cms_table_accordion .content_wrapper')
                            elements.forEach((element, index) => {
                                element.querySelector('.accordion_table').style.height = 0
                            })
                        }, 500)
                    })
                } else {
                    me.$axios.get(`api/staff?enabled=0`).then(res => {
                        me.res = res.data.staff.data
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
            async fetchStudios () {
                const me = this
                me.$axios.get('api/studios').then(res => {
                    me.studios = res.data.studios
                })
            }
        },
        async mounted () {
            const me = this
            me.fetchData(1)
            me.fetchStudios()
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
        }
    }
</script>
