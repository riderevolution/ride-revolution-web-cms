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
                                <label for="q">Find a Instructor</label>
                                <input type="text" name="q" autocomplete="off" placeholder="Search for a instructor" class="default_text search_alternate">
                            </div>
                            <div class="form_group margin">
                                <label for="studio_id">Studio</label>
                                <select class="default_select alternate" name="studio_id">
                                    <option value="0" selected>All Studios</option>
                                    <option :value="data.id" v-for="(data, key) in studios" :key="key">{{ data.name }}</option>
                                </select>
                            </div>
                            <button type="submit" name="button" class="action_btn alternate margin">Search</button>
                        </form>
                    </div>
                </section>
                <section id="content">
                    <table class="cms_table">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Studio</th>
                                <th>Nickname</th>
                                <th>Email Address</th>
                                <th>Contact No.</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="res.instructors.data.length > 0">
                            <tr v-for="(data, key) in res.instructors.data" :key="key">
                                <td>
                                    <div class="thumb">
                                        <img :src="data.instructor_details.images[0].path_resized" v-if="data.instructor_details.images[0].path != null" />
                                        <div class="table_image_default" v-else>
                                            <div class="overlay">
                                                {{ data.first_name.charAt(0) }}{{ data.last_name.charAt(0) }}
                                            </div>
                                        </div>
                                        <div class="table_data_link">{{ data.first_name }} {{ data.last_name }}</div>
                                    </div>
                                </td>
                                <td>{{ data.instructor_details.studio.name }}</td>
                                <td>{{ data.instructor_details.nickname }}</td>
                                <td>{{ data.email }}</td>
                                <td>{{ (data.instructor_details != null) ? data.instructor_details.io_contact_number : '-' }}</td>
                                <td>
                                    <div class="table_actions">
                                        <nuxt-link class="table_action_edit" :to="`${$route.path}/${data.id}/edit`">Edit</nuxt-link>
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
                    <pagination :apiRoute="res.instructors.path" :current="res.instructors.current_page" :last="res.instructors.last_page" />
                </section>
            </div>
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../components/Foot'
    import Pagination from '../../components/Pagination'
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
                res: [],
                studios: []
            }
        },
        methods: {
            submitFilter () {
                const me = this
                let formData = new FormData(document.getElementById('filter'))
                formData.append('enabled', me.status)
                me.loader(true)
                me.$axios.post(`api/instructors/search`, formData).then(res => {
                    me.res = res.data
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            toggleOnOff (value) {
                const me = this
                me.status = value
                me.fetchData(value)
            },
            fetchData (status) {
                const me = this
                me.loader(true)
                me.$axios.get(`api/instructors?enabled=${status}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.$axios.get('api/studios?enabled=1').then(res => {
                                me.studios = res.data.studios
                            })

                            me.res = res.data
                            me.rowCount = document.getElementsByTagName('th').length
                            me.totalCount = me.res.instructors.total
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
