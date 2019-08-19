<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content">
                <h1 class="header_title">Scheduling</h1>
            </section>
            <section id="content">
                <div class="cms_col_four">
                    <div class="cms_col" v-for="(data, key) in res.today" :key="key">
                        <nuxt-link :to="data.link" class="wrapper">
                            <div class="total_image">
                                <img class="front" :src="data.imgSrc" />
                                <img class="back" :src="data.imgSrc" />
                            </div>
                            <div class="total_title">{{ data.label }}</div>
                        </nuxt-link>
                    </div>
                </div>
            </section>
        </div>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                res: {
                    today: [
                        {
                            label: 'Class Types',
                            imgSrc: '/icons/package-icon.svg',
                            link: '/admin/configuration/class-types'
                        },
                        {
                            label: 'Class Packages',
                            imgSrc: '/icons/package-icon.svg',
                            link: '/admin/configuration/class-packages'
                        },
                        {
                            label: 'Package Type',
                            imgSrc: '/icons/package-icon.svg',
                            link: '/admin/configuration/package-type'
                        }
                    ]
                }
            }
        }
    }
</script>
