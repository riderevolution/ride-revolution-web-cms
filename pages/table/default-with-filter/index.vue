<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table" v-if="loaded">
                <div class="action_wrapper">
                    <h1 class="header_title">Default with filter</h1>
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
                <div class="filter_wrapper">
                    <form class="filter_flex" id="filter" @submit.prevent="submissionSuccess()">
                        <div class="form_group">
                            <label for="category_id">Filter 1</label>
                            <select class="default_select alternate" name="category_id">
                                <option value="" selected>All Filter 1</option>
                            </select>
                        </div>
                        <div class="form_group margin">
                            <label for="studio_id">Filter 2</label>
                            <select class="default_select alternate" name="studio_id">
                                <option value="" selected>All Filter 2</option>
                            </select>
                        </div>
                        <div class="form_group margin">
                            <label for="q">Find a filter</label>
                            <input type="text" name="q" autocomplete="off" placeholder="Search for a filter" class="default_text search_alternate">
                        </div>
                        <button type="submit" name="button" class="action_btn alternate margin">Search</button>
                    </form>
                </div>
            </section>
            <section id="content" v-if="loaded">
                <div class="cms_table_toggler">
                    <div :class="`status ${(filter_status == 1) ? 'active' : ''}`" @click="toggleFilter(1)">Sample</div>
                    <div :class="`status ${(filter_status == 2) ? 'active' : ''}`" @click="toggleFilter(2)">Sample 2</div>
                    <div :class="`status ${(filter_status == 3) ? 'active' : ''}`" @click="toggleFilter(3)">Sample 3</div>
                </div>
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
                status: 1,
                filter_status: 1
            }
        },
        methods: {
            toggleFilter (value) {
                const me = this
                me.filter_status = value
                me.fetchData(value)
            },
            submissionSuccess () {
                const me = this
                alert('<3')
            },
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
        }
    }
</script>
