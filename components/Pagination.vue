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
            }
        },
        methods: {
            nextPage (current, last) {
                let me = this
                if (current != last) {
                    me.$axios.get(`${me.apiRoute}?page=${current + 1}`).then(res => {
                        me.$parent.res = res.data
                    })
                }
            },
            currentPage (count) {
                let me = this
                me.$axios.get(`${me.apiRoute}?page=${count}`).then(res => {
                    me.$parent.res = res.data
                })
            },
            prevPage (current, last) {
                let me = this
                if (current != 1) {
                    me.$axios.get(`${me.apiRoute}?page=${current - 1}`).then(res => {
                        me.$parent.res = res.data
                    })
                }
            }
        }
    }
</script>
