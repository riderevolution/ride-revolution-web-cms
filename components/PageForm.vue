<template>
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
                        <label for="title">Title <span>*</span></label>
                        <input type="text" name="title" placeholder="Enter page title" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\-|\'|\,|\!|\&]*$', max: 30}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('title')">{{ errors.first('title') | properFormat }}</span></transition>
                    </div>
                    <div class="form_group">
                        <label for="subtitle">Subtitle <span>*</span></label>
                        <input type="text" name="subtitle" placeholder="Enter page subtitle" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\-|\'|\,|\!|\&]*$', max: 100}">
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('subtitle')">{{ errors.first('subtitle') | properFormat }}</span></transition>
                    </div>
                </div>
            </div>
        </div>
        <div class="form_wrapper" v-if="hasImage">
            <div class="form_header_wrapper">
                <h2 class="form_title">Image Upload</h2>
            </div>
            <div class="form_main_group">
                <banner-handler-container ref="banner_handler" :dimension="bannerDimensions" />
            </div>
        </div>
        <div class="form_wrapper">
            <div class="form_header_wrapper">
                <h2 class="form_title">Metatags (SEO)</h2>
            </div>
            <div class="form_main_group">
                <div class="form_group">
                    <label for="meta_title">Meta Title <span>*</span></label>
                    <input type="text" name="meta_title" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ ]*$', min: 20, max: 70}">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_title')">{{ errors.first('meta_title') | properFormat }}</span></transition>
                </div>
                <div class="form_group">
                    <label for="meta_keywords">Meta Keywords <span>*</span></label>
                    <input type="text" name="meta_keywords" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\,]*$', min: 50, max: 150}">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_keywords')">{{ errors.first('meta_keywords') | properFormat }}</span></transition>
                </div>
                <div class="form_group">
                    <label for="meta_description">Meta Description <span>*</span></label>
                    <textarea name="meta_description" rows="4" id="meta_description" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ |\,|\.]*$', min: 150, max: 380}"></textarea>
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
</template>

<script>
    import BannerHandlerContainer from './BannerHandlerContainer'
    export default {
        props: {
            data: {
                default: null
            },
            hasImage: {
                type: Boolean,
                default: true
            },
            slug: {
                type: String,
                default: null
            },
            isHome: {
                type: Boolean,
                default: false
            }
        },
        components: {
            BannerHandlerContainer
        },
        data () {
            return {
                loaded: false,
                bannerDimensions: {
                    imageWidth: (!this.isHome) ? 2564 : 1280,
                    imageHeight: (!this.isHome) ? 593 : 803
                }
            }
        },
        inject: ['$validator'],
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
                        let formData = new FormData(document.getElementById('default_form'))
                    } else {
                        me.$scrollTo('.validation_errors', {
                            offset: -250
                        })
                    }
                })
            },
            fetchData () {
                const me = this
                me.loaded = true
            }
        }
    }
</script>
