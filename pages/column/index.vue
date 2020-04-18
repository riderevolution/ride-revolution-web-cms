<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content">
                <h1 class="header_title">Column</h1>
            </section>
            <section id="content" class="pad_alt">
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
    import Foot from '../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                res: {
                    today: [
                        {
                            label: 'Sample',
                            imgSrc: '/icons/studio-icon.svg',
                            link: '/admin/configuration/studios'
                        },
                        {
                            label: 'Sample',
                            imgSrc: '/icons/types-icon.svg',
                            link: '/admin/configuration/customer-types'
                        },
                        {
                            label: 'Sample',
                            imgSrc: '/icons/occupation-icon.svg',
                            link: '/admin/configuration/occupations'
                        },
                        {
                            label: 'Sample',
                            imgSrc: '/icons/gift-card-title-icon.svg',
                            link: '/admin/configuration/gift-card-titles'
                        },
                        {
                            label: 'Sample',
                            imgSrc: '/icons/medical-history-icon.svg',
                            link: '/admin/configuration/medical-history'
                        },
                        {
                            label: 'Sample',
                            imgSrc: '/icons/system-emails-icon.svg',
                            link: '/admin/configuration/system-emails'
                        },
                        {
                            label: 'Sample',
                            imgSrc: '/icons/mailchimp-icon.svg',
                            link: '/admin/configuration/mailchimp'
                        }
                    ]
                }
            }
        }
    }
</script>
