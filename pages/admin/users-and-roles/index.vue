<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table">
                <div class="action_wrapper">
                    <h1 class="header_title">Users &amp; Roles</h1>
                    <div class="actions">
                        <a @click="toggleUser(id, 0)" href="javascript:void(0)" class="action_btn"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add a User</a>
                        <a @click="toggleRole(id, 0)" href="javascript:void(0)" class="action_btn margin"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add a Role</a>
                        <div class="total">Total: {{ res.length }}</div>
                        <div class="toggler">
                            <div :class="`status ${(status == 1) ? 'active' : ''}`" @click="toggleOnOff(1)">Activate</div>
                            <div :class="`status ${(status == 0) ? 'active' : ''}`" @click="toggleOnOff(0)">Deactivated</div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="content">
                <div class="cms_table_accordion">
                    <div class="header_wrapper">
                        <div class="accordion_header">Role Name</div>
                        <div class="accordion_header">Users</div>
                        <div class="accordion_header">Permissions</div>
                        <div class="accordion_header action">Action</div>
                    </div>
                    <div class="content_wrapper">
                        <div class="accordion_content">Admin</div>
                        <div class="accordion_content">4</div>
                        <div class="accordion_content">All</div>
                        <td class="accordion_actions action">
                            <nuxt-link class="accordion_action_edit" :to="`${$route.path}/${1}/edit`">Edit</nuxt-link>
                            <a class="accordion_action_cancel" @click.self="toggleStatus(1, 0, 'Deactivated')" href="javascript:void(0)" v-if="status == 1">Deactivate</a>
                            <a class="accordion_action_success" @click.self="toggleStatus(1, 1, 'Activated')" href="javascript:void(0)" v-if="status == 0">Activate</a>
                        </td>
                    </div>
                </div>
            </section>
        </div>
        <transition name="fade">
            <user-form v-if="$store.state.userForm" />
        </transition>
        <transition name="fade">
            <role-form v-if="$store.state.roleForm" :type="type" :id="id" />
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../components/Foot'
    import UserForm from '../../../components/modals/UserForm'
    import RoleForm from '../../../components/modals/RoleForm'
    export default {
        components: {
            Foot,
            UserForm,
            RoleForm
        },
        data () {
            return {
                id: 0,
                type: 0,
                rowCount: 0,
                status: 1,
                res: []
            }
        },
        methods: {
            countPermissions (values) {
                const me = this
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
            },
            toggleUser () {
                const me = this
                me.$store.state.userForm = true
            },
            toggleRole (value, type) {
                const me = this
                me.$store.state.roleForm = true
                me.type = type
                if (value != 0) {
                    me.id = value
                }
            },
            async toggleStatus (id, status, type) {
                const me = this
                me.loader(true)
                me.$axios.patch(`api/studios/toggle-active-status/${id}?enabled=${status}`).then(res => {
                    if (res.data) {
                        me.notify(type)
                        setTimeout( () => {
                            me.fetchData(me.status)
                        }, 250)
                    } else {
                        alert('Sorry. Something went wrong.')
                    }
                }).catch(err => {
                    console.log(err)
                }).then(() => {
                    me.loader(false)
                })
            },
            toggleOnOff (value) {
                const me = this
                me.status = value
                me.fetchData(value)
            },
            async fetchData (value) {
                const me = this
                me.loader(true)
                me.$axios.get(`api/roles?enabled=${value}`).then(res => {
                    me.res = res.data.roles
                }).catch(err => {
                    console.log(err)
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            }
        },
        async mounted () {
            const me = this
            me.res = me.fetchData(1)
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
            me.rowCount = document.getElementsByTagName('th').length
        }
    }
</script>
