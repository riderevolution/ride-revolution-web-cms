<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table" v-if="loaded">
                <nuxt-link :to="`/${prevRoute}/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ replacer(lastRoute) }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">New Purchase Orders <span>ID: </span></h1>
                </div>
                <div class="filter_wrapper">
                    <form class="filter_flex" id="filter" method="post" @submit.prevent="submissionSuccess()">
                        <div class="form_group">
                            <label for="supplier_id">Supplier</label>
                            <select class="default_select alternate" name="supplier_id">
                                <option value="" selected>Select a Supplier</option>
                                <option :value="supplier.id" v-for="(supplier, key) in suppliers" :key="key">{{ supplier.name }}</option>
                            </select>
                        </div>
                        <div class="form_group margin">
                            <label for="studio_id">Studio</label>
                            <select class="default_select alternate" name="studio_id">
                                <option value="" selected>Select a Studio</option>
                                <option :value="studio.id" v-for="(studio, key) in studios" :key="key">{{ studio.name }}</option>
                            </select>
                        </div>
                        <button type="submit" name="button" class="action_btn alternate margin">Search</button>
                    </form>
                </div>
            </section>
            <section id="content" v-if="loaded">
                <table class="cms_table">
                    <thead>
                        <tr>
                            <th>P.O. Number</th>
                            <th>Supplier</th>
                            <th>Studio</th>
                            <th>Subtotal</th>
                            <th>Shipping Cost</th>
                            <th>Additional Cost</th>
                            <th>Total</th>
                            <th>Requisition Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody v-if="res.suppliers.data.length > 0">
                        <tr v-for="(data, key) in res.suppliers.data" :key="key">
                            <td>{{ data.name }}</td>
                            <td>{{ data.name }}</td>
                            <td>{{ data.name }}</td>
                            <td>PHP 265.00</td>
                            <td>PHP 0.00</td>
                            <td>PHP 0.00</td>
                            <td>PHP 265.00</td>
                            <td>{{ data.name }}</td>
                            <td>{{ data.name }}</td>
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
                lastRoute: '',
                prevRoute: '',
                rowCount: 0,
                status: 1,
                res: [],
                suppliers: [],
                studios: [],
                form_search: {
                    user: ''
                }
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
            },
            async fetchStudiosSuppliers () {
                const me = this
                me.$axios.get('api/studios').then(res => {
                    me.studios = res.data.studios
                })
                me.$axios.get('api/suppliers').then(res => {
                    me.suppliers = res.data.suppliers.data
                })
            }
        },
        async mounted () {
            const me = this
            me.fetchData(1)
            me.fetchStudiosSuppliers()
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 2]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
        }
    }
</script>
