<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content">
                <h1 class="header_title">Modal</h1>
            </section>
            <section id="content" class="main">
                <div class="cms_col_four">
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Confirm Modal Button</label>
                            <div class="action_btn alternate" @click="$store.state.confirmStatus = true">Action</div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Successful Modal Button</label>
                            <div class="action_btn alternate" @click="$store.state.successfulStatus = true">Action</div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Form Modal Button</label>
                            <div class="action_btn alternate" @click="$store.state.formStatus = true">Action</div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Error Modal Button</label>
                            <div class="action_btn alternate" @click="$store.state.errorStatus = true">Action</div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Import Modal Button</label>
                            <div class="action_btn alternate" @click="$store.state.importStatus = true">Action</div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Loader Button</label>
                            <div class="action_btn alternate" @click="triggerLoader()">Action</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <transition name="fade">
            <confirm v-if="$store.state.confirmStatus" />
        </transition>
        <transition name="fade">
            <successful v-if="$store.state.successfulStatus" />
        </transition>
        <transition name="fade">
            <user-form v-if="$store.state.formStatus" />
        </transition>
        <transition name="fade">
            <error-prompt v-if="$store.state.errorStatus" />
        </transition>
        <transition name="fade">
            <import v-if="$store.state.importStatus" />
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../components/Foot'
    import Confirm from '../../components/modals/Confirm'
    import Successful from '../../components/modals/Successful'
    import UserForm from '../../components/modals/UserForm'
    import ErrorPrompt from '../../components/modals/Error'
    import Import from '../../components/modals/Import'
    export default {
        components: {
            Foot,
            Confirm,
            Successful,
            UserForm,
            ErrorPrompt,
            Import
        },
        methods: {
            triggerLoader () {
                const me = this
                me.loader(true)
                setTimeout( () => {
                    me.loader(false)
                }, 1500)
            }
        }
    }
</script>
