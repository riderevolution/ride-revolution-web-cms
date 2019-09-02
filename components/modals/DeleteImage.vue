<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <div class="confirmation_wrapper" v-if="$store.state.deleteImageStatus">
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
                contentID: 0
            }
        },
        methods: {
            proceedDelete () {
                const me = this
                me.$store.state.deleteImageStatus = false
                me.$axios.delete(`${me.url}/${me.contentID}`).then(res => {
                    if (res.data) {
                        me.$parent.fetchData(1)
                    }
                })
                document.body.classList.remove('no_scroll')
            },
            toggleClose () {
                this.$store.state.deleteImageStatus = false
                document.body.classList.remove('no_scroll')
            }
        }
    }
</script>
