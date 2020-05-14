<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/faq" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Pro Tip</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Update a Pro Tip</h1>
                    </div>
                </section>
                <section id="content">
                    <form id="default_form" @submit.prevent="submitForm()">
                        <div class="form_group_disclaimer">
                            <div class="form_disclaimer"><img src="/icons/disclaimer-icon.svg" /> <span>Fields with asterisks(*) are required.</span></div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Information</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="label">Text <span>*</span></label>
                                    <textarea name="label" rows="2" id="label" class="default_text" v-model="res.label" v-validate="'required|max:150'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('label')">{{ errors.first('label') | properFormat }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_flex">
                                <div class="form_check"></div>
                                <div class="button_group">
                                    <nuxt-link to="/content-type/pro-tip" class="action_cancel_btn">Cancel</nuxt-link>
                                    <button type="submit" name="submit" class="action_btn alternate margin">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </transition>
        <foot v-if="$store.state.isAuth" />
    </div>
</template>

<script>
    import Foot from '../../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                loaded: false,
                res: []
            }
        },
        filters: {
            properFormat (value) {
                let newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                } else {
                    newValue = value.split('The ')[1].split(' field')[0].split('_')
                    if (newValue.length > 1) {
                        let firstValue = ''
                        let lastValue = ''
                        if (newValue[0] != 'co' && newValue[0] != 'pa' && newValue[0] != 'ec' && newValue[0] != 'ba') {
                            firstValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                        }
                        for (let i = 1; i < newValue.length; i++) {
                            if (newValue[i] != 'id') {
                                lastValue += ' ' + newValue[i].charAt(0).toUpperCase() + newValue[i].slice(1)
                            }
                        }
                        newValue = firstValue + ' ' + lastValue
                    } else {
                        newValue = value.split('The ')[1].split(' field')[0].charAt(0).toUpperCase() + value.split('The ')[1].split(' field')[0].slice(1)
                    }
                }
                let message = value.split('The ')[1].split(' field')
                if (message.length > 1) {
                    message = message[1]
                    return `The ${newValue} field${message}`
                } else {
					if (message[0].split('file').length > 1) {
                        message = message[0].split('file')[1]
                        return `The ${newValue} field${message}`
                    } else {
                        return `The ${newValue}`
                    }
                }
            }
        },
        methods: {
            submitForm () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        me.loader(true)
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('_method', 'PATCH')
                        me.$axios.post(`api/pro-tips/${me.$route.params.param}`, formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.$router.push('/content-type/pro-tip')
                                    me.notify('Content has been updated')
                                }, 500)
                            }
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                            }, 500)
                        })
                    } else {
                        me.$scrollTo('.validation_errors', {
                            offset: -250
                        })
                    }
                })
            },
            fetchData () {
                const me = this
                me.loader(true)
                me.$axios.get(`api/pro-tips/${me.$route.params.param}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data.proTip
                            me.loaded = true
                        }, 500)
                    }
                }).catch(err => {
                    me.$store.state.errorList = err.response.data.errors
                    me.$store.state.errorStatus = true
                }).then(() => {
                    setTimeout( () => {
                        me.loader(false)
                    }, 500)
                })
            }
        },
        mounted () {
            const me = this
            me.fetchData()
        }
    }
</script>
