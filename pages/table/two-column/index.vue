<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table" v-if="loaded">
                <div class="action_wrapper">
                    <h1 class="header_title">Two Column</h1>
                    <div class="actions">
                        <div class="total">Total: {{ totalItems(total_count) }}</div>
                        <div class="toggler">
                            <div :class="`status ${(status == 1) ? 'active' : ''}`" @click="toggleOnOff(1)">Activated</div>
                            <div :class="`status ${(status == 0) ? 'active' : ''}`" @click="toggleOnOff(0)">Deactivated</div>
                        </div>
                    </div>
                </div>
                <div class="action_buttons">
                    <a href="javascript:void(0)" class="action_btn"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add a Content</a>
                </div>
            </section>
            <section id="content" class="alternate_2" v-if="loaded">
                <div class="cms_taxonomy">
                    <div class="taxonomy_wrapper" v-for="(parent, key) in res" :key="key">
                        <div class="taxonomy_body">
                            <div class="taxonomy_header">
                                <h2 class="header_title">{{ parent.name }}</h2>
                                <div class="taxonomy_actions">
                                    <nuxt-link :to="`/${prevRoute}/products/create?c=${parent.id}`" class="action_btn"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add Products</nuxt-link>
                                    <a href="javascript:void(0)" class="action_btn margin"><svg xmlns="http://www.w3.org/2000/svg" width="21.316" height="16.434" viewBox="0 0 21.316 16.434"> <g transform="translate(-1244 -346.75)"> <path class="edit" d="M1259.684,357.585v4.849H1244.75V347.5h14.934v1.785" transform="translate(0 0)" /> <g transform="translate(1255.311 348.26)"> <line class="edit_sign" x1="9.476" y2="9.476" /> </g> </g> </svg>Edit</a>
                                </div>
                            </div>
                            <div class="taxonomy_content">
                                <table class="cms_table_taxonomy">
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="parent.children.length > 0">
                                        <tr v-for="(child, key) in parent.children" :key="key">
                                            <td>{{ child.first_name }}</td>
                                            <td>{{ child.lastst_name }}</td>
                                            <td>
                                                <div class="table_actions">
                                                    <nuxt-link class="table_action_edit" :to="`/${prevRoute}/products/${child.id}/edit`">Edit</nuxt-link>
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
                            </div>
                            <div class="taxonomy_footer">
                                <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleDelete(data.id)">Delete Category</a>
                            </div>
                        </div>
                    </div>
                </div>
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
                status: 1,
                loaded: false,
                rowCount: 0,
                total_count: 0,
                res: [
                    {
                        id: 1,
                        name: 'Sample',
                        children: [
                            {
                                first_name: 'Juan',
                                last_name: 'Dela Cruz',
                                email: 'sample@gmail.com',
                                contact: '09559123947',
                                gender: 'Male'
                            },
                            {
                                first_name: 'Juan',
                                last_name: 'Dela Cruz',
                                email: 'sample@gmail.com',
                                contact: '09559123947',
                                gender: 'Male'
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: 'Sample',
                        children: [
                            {
                                first_name: 'Juan',
                                last_name: 'Dela Cruz',
                                email: 'sample@gmail.com',
                                contact: '09559123947',
                                gender: 'Male'
                            },
                            {
                                first_name: 'Juan',
                                last_name: 'Dela Cruz',
                                email: 'sample@gmail.com',
                                contact: '09559123947',
                                gender: 'Male'
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: 'Sample',
                        children: [
                            {
                                first_name: 'Juan',
                                last_name: 'Dela Cruz',
                                email: 'sample@gmail.com',
                                contact: '09559123947',
                                gender: 'Male'
                            },
                            {
                                first_name: 'Juan',
                                last_name: 'Dela Cruz',
                                email: 'sample@gmail.com',
                                contact: '09559123947',
                                gender: 'Male'
                            }
                        ]
                    },
                    {
                        id: 4,
                        name: 'Sample',
                        children: [
                            {
                                first_name: 'Juan',
                                last_name: 'Dela Cruz',
                                email: 'sample@gmail.com',
                                contact: '09559123947',
                                gender: 'Male'
                            },
                            {
                                first_name: 'Juan',
                                last_name: 'Dela Cruz',
                                email: 'sample@gmail.com',
                                contact: '09559123947',
                                gender: 'Male'
                            }
                        ]
                    },
                    {
                        id: 5,
                        name: 'Sample',
                        children: [
                            {
                                first_name: 'Juan',
                                last_name: 'Dela Cruz',
                                email: 'sample@gmail.com',
                                contact: '09559123947',
                                gender: 'Male'
                            },
                            {
                                first_name: 'Juan',
                                last_name: 'Dela Cruz',
                                email: 'sample@gmail.com',
                                contact: '09559123947',
                                gender: 'Male'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            toggleOnOff (status) {
                const me = this
                me.status = value
                me.fetchData(value)
            },
            fetchData (status) {
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
