<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link :to="`/content-type/studio/${$route.params.param}/album`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Album</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Add an Album</h1>
                    </div>
                </section>
                <section id="content">
                    <form id="default_form" @submit.prevent="submitForm()" enctype="multipart/form-data">
                        <div class="form_group_disclaimer">
                            <div class="form_disclaimer"><img src="/icons/disclaimer-icon.svg" /> <span>Fields with asterisks(*) are required.</span></div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Album Overview</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="name">Name <span>*</span></label>
                                        <input type="text" name="name" placeholder="Enter album name" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ ]*$', min: 20, max: 100}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ errors.first('name') | properFormat }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="sequence">Sequence <span>*</span></label>
                                        <input type="text" name="sequence" placeholder="Enter sequence" autocomplete="off" class="default_text" v-validate="{required: true, numeric: true, min_value: 1, max_value: 99}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('sequence')">{{ errors.first('sequence') | properFormat }}</span></transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Image Upload</h2>
                                <button type="button" class="action_btn" @click="addMultiple('image')">Add Image</button>
                            </div>
                            <div class="form_main_group">
                                <image-handler-container ref="image_handler" :multiple="true" />
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_check">
                                <input type="checkbox" id="is_featured" name="is_featured" class="action_check">
                                <label for="is_featured">Amenities</label>
                            </div>
                            <div class="form_check">
                                <input type="checkbox" id="is_homepage" name="is_homepage" class="action_check">
                                <label for="is_homepage">Homepage</label>
                            </div>
                            <div class="form_flex">
                                <div class="form_check"></div>
                                <div class="button_group">
                                    <nuxt-link :to="`/content-type/studio/${$route.params.param}/album`" class="action_cancel_btn">Cancel</nuxt-link>
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
    import Foot from '../../../../../components/Foot'
    import ImageHandlerContainer from '../../../../../components/ImageHandlerContainer'
    export default {
        components: {
            Foot,
            ImageHandlerContainer
        },
        data () {
            return {
                res: [],
                loaded: false
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
            /**
             * [addMultiple add images or variants]
             * @param {[string]} type [type of method]
             */
            addMultiple (type) {
                const me = this
                switch (type) {
                    case 'image':
                        setTimeout( () => {
                            me.$refs.image_handler.addImage()
                        }, 10)
                        break
                }
            },
            submitForm () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        me.loader(true)
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('studio_id', me.$route.params.param)
                        me.$axios.post('api/web/studio-albums', formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.notify('Content has been created')
                                }, 500)
                            }
                        }).catch(err => {
                            me.$store.state.errorList = err.response.data.errors
                            me.$store.state.errorStatus = true
                        }).then(() => {
                            setTimeout( () => {
                                me.loader(false)
                                me.$router.push(`/content-type/studio/${me.$route.params.param}/album`)
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
                setTimeout( () => {
                    me.loader(false)
                    me.loaded = true
                }, 500)
            }
        },
        mounted () {
            const me = this
            me.fetchData()
        }
    }
</script>
