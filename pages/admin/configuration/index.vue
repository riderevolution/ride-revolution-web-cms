<template>
    <div class="content">
        <div id="admin" class="cms_dashboard">
            <section id="top_content">
                <h1 class="header_title">Configuration</h1>
            </section>
            <section id="content">
                <div class="cms_col_four">
                    <nuxt-link :to="data.link" class="wrapper" v-for="(data, key) in res.today" :key="key">
                        <div class="total_image">
                            <img class="front" :src="data.imgSrc" />
                            <img class="back" :src="data.imgSrc" />
                        </div>
                        <div class="total_title">{{ data.label }}</div>
                    </nuxt-link>
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
                            label: 'Studios',
                            imgSrc: '/icons/studio-icon.svg',
                            link: '/admin/configuration/studios'
                        },
                        {
                            label: 'Customer Types',
                            imgSrc: '/icons/types-icon.svg',
                            link: '/admin/configuration/customer-types'
                        },
                        {
                            label: 'System Emails',
                            imgSrc: '/icons/system-emails-icon.svg',
                            link: '/admin/configuration/system-emails'
                        },
                        {
                            label: 'MailChimp',
                            imgSrc: '/icons/mailchimp-icon.svg',
                            link: '/admin/configuration/mailchimp'
                        }
                    ]
                }
            }
        }
    }
</script>
