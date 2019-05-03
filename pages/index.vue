<template>
    <div id="cms" class="content dashboard">
        <section id="top_content">
            <h1 class="header_title">Dashboard</h1>
        </section>
        <section id="content">
            <div class="branches_tab">
                <select class="branches">
                    <option value="greenbelt" selected>Greenbelt</option>
                    <option value="shangrila">Shangrila</option>
                </select>
                <div class="add_customer">Add New Customer</div>
            </div>
            <div class="total_section">
                <div class="wrapper">
                    <div class="total_icon"></div>
                    <div class="total_count">235</div>
                    <div class="total_text">Total Customers</div>
                </div>
                <div class="wrapper">
                    <div class="total_icon"></div>
                    <div class="total_count">235</div>
                    <div class="total_text">Total Customers</div>
                </div>
                <div class="wrapper">
                    <div class="total_icon"></div>
                    <div class="total_count">235</div>
                    <div class="total_text">Total Customers</div>
                </div>
                <div class="wrapper">
                    <div class="total_icon"></div>
                    <div class="total_count">235</div>
                    <div class="total_text">Total Customers</div>
                </div>
            </div>
        </section>
        <foot />
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
