<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <div class="confirmation_wrapper">
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
                if (me.$parent.isDelete) {
                    me.$parent.isDelete = false
                }
                me.loader(true)
                me.$axios.delete(`${me.url}/${me.contentID}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.$store.state.deleteStatus = false
                        }, 500)
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                        me.$parent.fetchData(1)
                        me.notify('Content has been deleted')
                        document.body.classList.remove('no_scroll')
                    }, 500)
                })
            },
            toggleClose () {
                const me = this
                me.$store.state.deleteStatus = false
                if (me.$parent.isDelete) {
                    me.$parent.isDelete = false
                }
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
