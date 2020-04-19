<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/news" class="action_back_btn"><img src="/icons/back-icon.svg"><span>News</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Add a News</h1>
                    </div>
                </section>
                <section id="content">
                    <form id="default_form" @submit.prevent="submitForm()" enctype="multipart/form-data">
                        <div class="form_group_disclaimer">
                            <div class="form_disclaimer"><img src="/icons/disclaimer-icon.svg" /> <span>Fields with asterisks(*) are required.</span></div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Information</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_flex">
                                    <div class="form_group">
                                        <label for="name">Name <span>*</span></label>
                                        <input type="text" name="name" placeholder="Enter news name" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\-|\'|\,|\!|\&]*$', max: 50}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ errors.first('name') | properFormat }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="date_published">Date Published <span>*</span></label>
                                        <input type="date" name="date_published" :max="$moment().format('YYYY-MM-DD')" v-validate="{required: true}" autocomplete="off" class="default_text date">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('date_published')">{{ errors.first('date_published') | properFormat }}</span></transition>
                                    </div>
                                </div>
                                <div class="form_group">
                                    <label for="summary">Summary <span>*</span></label>
                                    <textarea name="summary" rows="2" id="summary" class="default_text" v-validate="'required|max:300'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('summary')">{{ errors.first('summary') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="description">Description <span>*</span></label>
                                    <textarea name="description" rows="4" id="description" class="default_text" v-validate="'required|max:2000'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('description')">{{ errors.first('description') | properFormat }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Image Upload</h2>
                            </div>
                            <div class="form_main_group">
                                <banner-handler-container ref="banner_handler" :dimension="bannerDimensions" />
                                <input type="hidden" name="banner_category[]" value="banner" v-for="(count, key) in imageCount" :key="key">
                                <image-handler-container ref="image_handler" :dimension="imageDimensions" :multiple="false" />
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Metatags (SEO)</h2>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="meta_title">Meta Title <span>*</span></label>
                                    <input type="text" name="meta_title" autocomplete="off" class="default_text" placeholder="Enter your meta title" v-validate="{required: true, regex: '^[a-zA-Z0-9_ ]*$', min: 20, max: 70}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_title')">{{ errors.first('meta_title') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="meta_keywords">Meta Keywords <span>*</span> <strong>(Use comma(,) to separate the keywords)</strong></label>
                                    <input type="text" name="meta_keywords" autocomplete="off" placeholder="Enter your meta keywords" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\,]*$', min: 50, max: 150}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_keywords')">{{ errors.first('meta_keywords') | properFormat }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="meta_description">Meta Description <span>*</span></label>
                                    <textarea name="meta_description" rows="4" id="meta_description" placeholder="Enter your meta description" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\,|\.]*$', min: 150, max: 380}"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_description')">{{ errors.first('meta_description') | properFormat }}</span></transition>
                                </div>
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_flex">
                                <div class="form_check"></div>
                                <div class="button_group">
                                    <nuxt-link to="/content-type/news" class="action_cancel_btn">Cancel</nuxt-link>
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
    import Foot from '../../../components/Foot'
    import ImageHandlerContainer from '../../../components/ImageHandlerContainer'
    import BannerHandlerContainer from '../../../components/BannerHandlerContainer'
    export default {
        components: {
            Foot,
            ImageHandlerContainer,
            BannerHandlerContainer
        },
        data () {
            return {
                loaded: false,
                bannerDimensions: {
                    imageWidth: 2562,
                    imageHeight: 839
                },
                imageDimensions: {
                    imageWidth: 676,
                    imageHeight: 371
                },
                imageCount: 0,
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
                        me.$axios.post('api/web/news', formData).then(res => {
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
                                me.$router.push('/content-type/news')
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
                    me.imageCount = me.$refs.banner_handler.images
                    $('#description').summernote({
                        tabsize: 4,
                        height: 200,
                        followingToolbar: false,
                        codemirror: {
                            lineNumbers: true,
                            htmlMode: true,
                            mode: "text/html",
                            tabMode: 'indent',
                            lineWrapping: true
                        }
                    })
                    $('#summary').summernote({
                        tabsize: 4,
                        height: 150,
                        followingToolbar: false,
                        disableResizeEditor: true,
                        codemirror: {
                            lineNumbers: true,
                            htmlMode: true,
                            mode: "text/html",
                            tabMode: 'indent',
                            lineWrapping: true
                        }
                    })
                    me.loader(false)
                }, 100)
                me.loaded = true
            }
        },
        mounted () {
            const me = this
            me.fetchData()
        }
    }
</script>
