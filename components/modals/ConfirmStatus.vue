<template>
    <div class="default_modal">
        <div class="background" @click="toggleClose()"></div>
        <div class="confirmation_wrapper">
            <div class="confirmation_text">
                Are you sure you want to {{ (confirm.status == 'Activated') ? 'activate' : 'deactivate' }} this {{ confirm.type }}?
            </div>
            <div class="button_group">
                <div class="action_cancel_btn confirm" @click="cancelDelete()">Cancel</div>
                <div class="action_success_btn confirm margin" @click="proceedStatus()">Proceed</div>
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
            },
            status: {
                type: Number,
                default: 1
            }
        },
        data () {
            return {
                confirm: {
                    table_name: '',
                    id: 0,
                    enabled: 0,
                    status: '',
                    type: ''
                }
            }
        },
        methods: {
            toggleClose () {
                const me = this
                me.$store.state.confirmStatus = false
            },
            async proceedStatus () {
                const me = this
                me.loader(true)
                me.$axios.patch(`api/extras/toggle-status`, me.confirm).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.$store.state.confirmStatus = false
                            me.notify(me.confirm.status)
                            me.$parent.fetchData(me.status)
                        }, 300)
                    } else {
                        alert('Sorry. Something went wrong.')
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            cancelDelete () {
                const me = this
                me.$store.state.confirmStatus = false
            }
        }
    }
</script>
