<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table" v-if="loaded">
                <div class="action_wrapper">
                    <h1 class="header_title">Tables</h1>
                    <div class="actions">
                        <div class="total">Total: {{ totalItems(total_count) }}</div>
                        <div class="toggler">
                            <div :class="`status ${(status == 1) ? 'active' : ''}`" @click="toggleOnOff(1)">Activated</div>
                            <div :class="`status ${(status == 0) ? 'active' : ''}`" @click="toggleOnOff(0)">Deactivated</div>
                        </div>
                    </div>
                </div>
                <div class="action_buttons">
                    <nuxt-link :to="`${$route.path}/create`" class="action_btn"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add a Content</nuxt-link>
                </div>
            </section>
            <section id="content">
                <table class="cms_table" v-if="loaded">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Contact Number</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="res.length > 0">
                        <tr v-for="(data, key) in res" :key="key">
                            <td>{{ data.first_name }}</td>
                            <td>{{ data.last_name }}</td>
                            <td>{{ data.email }}</td>
                            <td>{{ data.contact }}</td>
                            <td>{{ data.gender }}</td>
                            <td>
                                <div class="table_actions">
                                    <nuxt-link class="table_action_edit" :to="`${$route.path}/${data.id}/edit`">Edit</nuxt-link>
                                    <div class="link table_action_cancel" v-if="status == 1">Deactivate</div>
                                    <div class="link table_action_success" v-if="status == 0">Activate</div>
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
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                loaded: false,
                lastRoute: '',
                rowCount: 0,
                res: [
                    {
                        id: 1,
                        first_name: 'Juan',
                        last_name: 'Dela Cruz',
                        email: 'sample@gmail.com',
                        contact: '09559123947',
                        gender: 'Male'
                    },
                    {
                        id: 2,
                        first_name: 'Juan',
                        last_name: 'Dela Cruz',
                        email: 'sample@gmail.com',
                        contact: '09559123947',
                        gender: 'Male'
                    },
                    {
                        id: 3,
                        first_name: 'Juan',
                        last_name: 'Dela Cruz',
                        email: 'sample@gmail.com',
                        contact: '09559123947',
                        gender: 'Male'
                    },
                    {
                        id: 4,
                        first_name: 'Juan',
                        last_name: 'Dela Cruz',
                        email: 'sample@gmail.com',
                        contact: '09559123947',
                        gender: 'Male'
                    },
                    {
                        id: 5,
                        first_name: 'Juan',
                        last_name: 'Dela Cruz',
                        email: 'sample@gmail.com',
                        contact: '09559123947',
                        gender: 'Male'
                    }
                ],
                status: 1
            }
        },
        methods: {
            toggleOnOff (value) {
                const me = this
                me.status = value
                me.fetchData(value)
            },
            fetchData (value) {
                const me = this
                me.rowCount = document.getElementsByTagName('th').length
                me.total_count = me.res.length
                me.loaded = true
            }
        },
        mounted () {
            const me = this
            me.fetchData(1)
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 2]
        }
    }
</script>
