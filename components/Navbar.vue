<template>
    <div class="navbar">
        <div class="logo">
            <img src="/logo.png" />
        </div>
        <div class="nav_list">
            <nuxt-link to="/" class="nav_item" v-for="nav_items in 8">
                <img src="/icons/icon.svg" class="image_responsive" width="25px" height="25px" />
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>
