<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table" v-if="loaded">
                <nuxt-link :to="`/admin/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg" /><span>{{ lastRoute }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">Class Packages &amp; Store Credits</h1>
                    <div class="actions">
                        <nuxt-link :to="`${$route.path}/create`" class="action_btn"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add Store Credits</nuxt-link>
                        <nuxt-link :to="`${$route.path}/class-packages/create`" class="action_btn margin"><svg xmlns="http://www.w3.org/2000/svg" width="17.016" height="17.016" viewBox="0 0 17.016 17.016"><defs></defs><g transform="translate(-553 -381)"><circle class="add" cx="8.508" cy="8.508" r="8.508" transform="translate(553 381)"/><g transform="translate(558.955 386.955)"><line class="add_sign" y2="5.233" transform="translate(2.616 0)"/><line class="add_sign" x2="5.233" transform="translate(0 2.616)"/></g></g></svg>Add Class Package</nuxt-link>
                        <div class="total">Total: {{ totalCount(res.classPackages.total) }}</div>
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
                            <input type="text" name="q" placeholder="Search for a class package" autocomplete="off" class="default_text search_alternate" v-model="form_search.user" @change="search()">
                        </div>
                    </div>
                </div>
            </section>
            <section id="content" v-if="loaded">
                <div class="cms_table_toggler">
                    <div :class="`status ${(package_status == 1) ? 'active' : ''}`" @click="togglePackages(1)">Regular</div>
                    <div :class="`status ${(package_status == 2) ? 'active' : ''}`" @click="togglePackages(2)">Promo</div>
                    <div :class="`status ${(package_status == 3) ? 'active' : ''}`" @click="togglePackages(3)">Store Credits</div>
                </div>
                <table class="cms_table">
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Package ID</th>
                            <th>Class Count</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="res.classPackages.data.length > 0">
                        <tr v-for="(data, key) in res.classPackages.data" :key="key">
                            <td>{{ data.name }}</td>
                            <td>{{ data.sku_id }}</td>
                            <td>{{ data.class_count }}</td>
                            <td>{{ data.package_price }}</td>
                            <td class="table_actions">
                                <nuxt-link class="table_action_edit" :to="`${$route.path}/class-packages/${data.id}/edit`">Edit</nuxt-link>
                                <a class="table_action_cancel" @click.self="toggleStatus(data.id, 0, 'Deactivated')" href="javascript:void(0)" v-if="status == 1">Deactivate</a>
                                <a class="table_action_success" @click.self="toggleStatus(data.id, 1, 'Activated')" href="javascript:void(0)" v-if="status == 0">Activate</a>
                            </td>
                        </tr>
                    </tbody>
                    <tbody class="no_results" v-else>
                        <tr>
                            <td :colspan="rowCount">No Result(s) Found.</td>
                        </tr>
                    </tbody>
                </table>
                <pagination :apiRoute="res.classPackages.path" :current="res.classPackages.current_page" :last="res.classPackages.last_page" />
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
        <transition name="fade">
            <confirm-status v-if="$store.state.confirmStatus" ref="enabled" :status="status" />
        </transition>
    </div>
</template>

<script>
    import Foot from '../../../../components/Foot'
    import Pagination from '../../../../components/Pagination'
    import ConfirmStatus from '../../../../components/modals/ConfirmStatus'
    export default {
        components: {
            Foot,
            Pagination,
            ConfirmStatus,
        },
        data () {
            return {
                loaded: false,
                lastRoute: '',
                rowCount: 0,
                status: 1,
                package_status: 1,
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
            async toggleStatus (id, enabled, status) {
                const me = this
                me.$store.state.confirmStatus = true
                setTimeout( () => {
                    me.$refs.enabled.confirm.table_name = 'class_packages'
                    me.$refs.enabled.confirm.id = id
                    me.$refs.enabled.confirm.enabled = enabled
                    me.$refs.enabled.confirm.status = status
                    me.$refs.enabled.confirm.type = 'class package'
                }, 100)
            },
            toggleOnOff (value) {
                const me = this
                me.status = value
                me.fetchData(value, me.package_status)
            },
            togglePackages (value) {
                const me = this
                me.package_status = value
                switch (value) {
                    case 1:
                    case 2:
                        me.fetchData(me.status, value)
                        break
                    case 3:
                        console.log('store credits')
                        break
                }
            },
            fetchData (value, packageStatus) {
                const me = this
                let apiRoute = ''
                if (packageStatus == 1) {
                    apiRoute = `api/packages/class-packages?enabled=${value}`
                } else {
                    apiRoute = `api/packages/class-packages?enabled=${value}&promo=${packageStatus}`
                }
                me.loader(true)
                me.$axios.get(apiRoute).then(res => {
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
            me.fetchData(1, 1)
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 2]
        }
    }
</script>
