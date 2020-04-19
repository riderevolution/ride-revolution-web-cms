<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="$store.state.isAuth">
                <section id="top_content">
                    <h1 class="header_title">Dashboard</h1>
                </section>
                <section id="content" class="pad_alt">
                    <div class="cms_col_four">
                        <div class="cms_col" v-for="(data, key) in res" :key="key">
                            <div class="wrapper">
                                <div class="total_image">
                                    <img class="front" :src="data.imgSrc" />
                                    <img class="back" :src="data.imgSrc" />
                                </div>
                                <div class="total_count">0</div>
                                <div class="total_text">{{ data.label }}</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                res: [
                    {
                        label: 'Inquiries',
                        imgSrc: '/icons/system-emails-icon.svg'
                    },
                    {
                        label: 'Inquiries',
                        imgSrc: '/icons/system-emails-icon.svg'
                    },
                    {
                        label: 'Inquiries',
                        imgSrc: '/icons/system-emails-icon.svg'
                    },
                    {
                        label: 'Inquiries',
                        imgSrc: '/icons/system-emails-icon.svg'
                    }
                ]
            }
        },
        mounted () {
            const me = this
            me.loader(true)
            setTimeout( () => {
                if (!me.$nuxt.$loading.show) {
                    me.loader(false)
                }
            }, 500)
        }
    }
</script>
