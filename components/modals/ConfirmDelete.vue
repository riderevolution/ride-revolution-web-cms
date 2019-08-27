<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <div class="confirmation_wrapper" v-if="$store.state.deleteStatus">
            <div class="confirmation_text">
                This action cannot be undone.
            </div>
            <div class="button_group">
                <div class="action_cancel_btn confirm" @click="toggleClose()">Cancel</div>
                <div class="action_success_btn confirm margin" @click="proceedDelete()">Proceed</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            url: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                contentID: 0,
                hasUser: false,
            }
        },
        methods: {
            proceedDelete () {
                const me = this
                me.$store.state.deleteStatus = false
                me.$axios.delete(`${me.url}/${me.contentID}`).then(res => {
                    if (res.data) {
                        if (me.hasUser) {
                            me.$axios.get(`${me.url}?id=${me.$store.state.user.id}`).then(res => {
                                me.$parent.fetchData(1)
                            })
                        } else {
                            me.$axios.get(`${me.url}`).then(res => {
                                me.$parent.fetchData(1)
                            })
                        }
                    }
                })
            },
            toggleClose () {
                this.$store.state.deleteStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
