<template>
    <div id="cms_pagination" v-if="last > 1">
        <div :class="`next ${(current == 1) ? 'disabled' : ''}`" @click.self="prevPage(current, last)">&lsaquo;</div>
        <div :class="`number ${(current == (key + 1)) ? 'active' : ''}`" v-for="(count, key) in last" @click.self="currentPage(count)">{{ count }}</div>
        <div :class="`prev ${(current == last) ? 'disabled' : ''}`" @click.self="nextPage(current, last)">&rsaquo;</div>
    </div>
</template>

<script>
    export default {
        props: {
            apiRoute: {
                type: String,
                required: true
            },
            current: {
                type: Number,
                default: 1
            },
            last: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 1
            }
        },
        methods: {
            nextPage (current, last) {
                const me = this
                if (current != last) {
                    me.loader(true)
                    me.$axios.get(`${me.apiRoute}?page=${current + 1}`).then(res => {
                        if (me.$route.params.slug == 'transactions') {
                            me.$parent.res = res.data.customer.payments
                        } else {
                            me.$parent.res = res.data
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
            currentPage (count) {
                const me = this
                me.loader(true)
                me.$axios.get(`${me.apiRoute}?page=${count}`).then(res => {
                    if (me.$route.params.slug == 'transactions') {
                        me.$parent.res = res.data.customer.payments
                    } else {
                        me.$parent.res = res.data
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            },
            prevPage (current, last) {
                const me = this
                if (current != 1) {
                    me.loader(true)
                    me.$axios.get(`${me.apiRoute}?page=${current - 1}`).then(res => {
                        if (me.$route.params.slug == 'transactions') {
                            me.$parent.res = res.data.customer.payments
                        } else {
                            me.$parent.res = res.data
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
            }
        }
    }
</script>
