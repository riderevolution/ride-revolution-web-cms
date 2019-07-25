<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content">
                <h1 class="header_title">Dashboard</h1>
            </section>
            <breadcrumb />
            <section id="content">
                <div class="cms_col_three">
                    <div class="wrapper">
                        <div class="total_icon"></div>
                        <div class="total_count">12</div>
                        <div class="total_text">Total Career Applications</div>
                    </div>
                    <div class="wrapper">
                        <div class="total_icon"></div>
                        <div class="total_count">12</div>
                        <div class="total_text">Total Inquiries</div>
                    </div>
                    <div class="wrapper">
                        <div class="total_icon"></div>
                        <div class="total_count">12</div>
                        <div class="total_text">Total Prayers</div>
                    </div>
                </div>
                <div class="cms_col_three">
                    <div class="wrapper">
                        <div class="total_icon"></div>
                        <div class="total_count">12</div>
                        <div class="total_text">Total Reserve Inquiries</div>
                    </div>
                    <div class="wrapper">
                        <div class="total_icon"></div>
                        <div class="total_count">12</div>
                        <div class="total_text">Total Downloaded Forms</div>
                    </div>
                    <div class="wrapper">
                        <div class="total_icon"></div>
                        <div class="total_count">12</div>
                        <div class="total_text">Total Tuition Inquiries</div>
                    </div>
                </div>
            </section>
            <foot />
        </div>
    </div>
</template>

<script>
    import Foot from '../components/Foot'
    export default {
        components: {
            Foot
        }
    }
</script>
