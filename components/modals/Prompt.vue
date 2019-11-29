<template>
    <div class="default_modal">
        <div class="background" @click.once="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text">
                {{ message }}
            </div>
            <div class="button_group">
                <a href="javascript:void(0)" class="action_cancel_btn" @click.once="toggleClose(false)" v-if="hasCancel">Cancel</a>
                <div class="action_success_btn confirm margin" @click.once="toggleClose(true)">Confirm</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: ''
            },
            hasCancel: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggleClose (status) {
                const me = this
                if (status && me.hasCancel) {
                    me.$parent.prompt = false
                    me.$parent.submissionSuccess()
                    document.body.classList.remove('no_scroll')
                } else {
                    me.$parent.prompt = true
                }
                me.$store.state.promptStatus = false
            }
        }
    }
</script>
