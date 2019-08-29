<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content" class="table" v-if="loaded">
                <nuxt-link :to="`/${prevRoute}/${lastRoute}`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>{{ replacer(lastRoute) }}</span></nuxt-link>
                <div class="action_wrapper">
                    <h1 class="header_title">New Purchase Orders <span>ID: {{ randomID }}</span></h1>
                </div>
                <div class="filter_wrapper">
                    <div class="filter_flex" id="filter">
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
                        <div class="form_group margin">
                            <label for="p_o_number">P.O. Number</label>
                            <input type="text" name="p_o_number" autocomplete="off" class="default_text">
                        </div>
                        <div class="form_group margin">
                            <label for="q">Search a Product</label>
                            <input type="text" name="q" autocomplete="off" placeholder="Add a product" class="default_text search_alternate">
                        </div>
                    </div>
                </div>
            </section>
            <section id="content" v-if="loaded">
                <form class="form_table">
                    <table class="cms_table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>SKU ID</th>
                                <th>Sellable</th>
                                <th>Category</th>
                                <th>In Stock</th>
                                <th>Qty.</th>
                                <th>Unit Price</th>
                                <th>Shipping Cost</th>
                                <th>Additional Cost</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>PHP 265.00</td>
                                <td>PHP 265.00</td>
                                <td>PHP 265.00</td>
                                <td>PHP 265.00</td>
                                <td>PHP 0.00</td>
                                <td width="10%">
                                    <input type="text" name="quantity[]" class="default_text">
                                </td>
                                <td>PHP 265.00</td>
                                <td width="10%">
                                    <input type="text" name="shipping_cost[]" class="default_text">
                                </td>
                                <td width="10%">
                                    <input type="text" name="additional_cost[]" class="default_text">
                                </td>
                                <td>PHP 25,000</td>
                            </tr>
                        </tbody>
                        <tbody class="no_results">
                            <tr>
                                <td :colspan="rowCount">No Result(s) Found.</td>
                            </tr>
                        </tbody>
                    </table>
                </form>
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
                randomID: 0,
                lastRoute: '',
                prevRoute: '',
                rowCount: 0,
                status: 1,
                suppliers: [],
                studios: []
            }
        },
        methods: {
            fetchStudiosSuppliers () {
                const me = this
                me.$axios.get('api/studios').then(res => {
                    me.studios = res.data.studios
                })
                me.$axios.get('api/suppliers').then(res => {
                    me.suppliers = res.data.suppliers.data
                })
                me.loaded = true
            }
        },
        async mounted () {
            const me = this
            me.fetchStudiosSuppliers()
            me.$axios.get('api/extras/random-string').then(res => {
                me.randomID = res.data.randomString
            })
            setTimeout( () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
            me.lastRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 2]
            me.prevRoute = me.$route.path.split('/')[me.$route.path.split('/').length - 3]
        }
    }
</script>
