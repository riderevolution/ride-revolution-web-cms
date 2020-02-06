<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content">
                <h1 class="header_title">Button</h1>
            </section>
            <section id="content" class="main">
                <div class="cms_col_four">
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Success Button</label>
                            <div class="action_success_btn">Success</div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Success Alternate Button</label>
                            <div class="action_success_btn alternate">Success</div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Success Disabled Button</label>
                            <div class="action_success_btn disabled">Success</div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Cancel Button</label>
                            <div class="action_cancel_btn">Cancel</div>
                        </div>
                    </div>
                </div>
                <div class="cms_col_four">
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Back Button</label>
                            <div class="action_back_btn"><img src="/icons/back-icon.svg" /><span>Back</span></div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Action Button</label>
                            <div class="action_btn">Action</div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Action Alternate Button</label>
                            <div class="action_btn alternate">Action</div>
                        </div>
                    </div>
                    <div class="cms_col">
                        <div class="form_group">
                            <label>Action Disabled Button</label>
                            <div class="action_btn disabled">Action</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../components/Foot'
    export default {
        components: {
            Foot
        }
    }
</script>
