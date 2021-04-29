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
                <div class="form_group">
                    <label for="title">Title<span>*</span></label>
                    <input type="text" name="title" placeholder="Enter page title" v-model="data.title" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-\'\?_ |\,|\!|\&|\.]*$', min: 2, max: 100}">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('title')">{{ properFormat(errors.first('title')) }}</span></transition>
                </div>
                <div class="form_group subtitle">
                    <label for="subtitle">Subtitle <b>(Character limit: 10,000)</b></label>
                    <textarea name="subtitle" rows="4" id="subtitle" class="default_text" v-validate="'min:10|max:10000'"></textarea>
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('subtitle')">{{ properFormat(errors.first('subtitle')) }}</span></transition>
                </div>
                <div class="form_group" v-if="$route.params.slug == 'home'">
                    <label for="video_link">Video Link<span>*</span></label>
                    <input type="text" name="video_link" placeholder="Enter video link" v-model="data.video_link" autocomplete="off" class="default_text" v-validate="{required: true, url: {require_protocol: true }}">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('video_link')">{{ properFormat(errors.first('video_link')) }}</span></transition>
                </div>
            </div>
        </div>
        <template v-if="$route.params.slug == 'home'">
            <div class="form_wrapper">
                <div class="form_header_wrapper">
                    <h2 class="form_title">Above The Fold</h2>
                </div>
                <div class="form_main_group">
                    <div class="form_group">
                        <div class="form_check">
                            <input type="checkbox" id="show_play_video" name="show_play_video" class="action_check" :checked="data.show_play_video">
                            <label for="show_play_video">Show Play Video</label>
                        </div>
                    </div>
                    <div class="form_group">
                        <div class="form_check">
                            <input type="checkbox" id="show_overlay" name="show_overlay" class="action_check" :checked="data.show_overlay">
                            <label for="show_overlay">Show Overlay</label>
                        </div>
                    </div>
                    <div class="form_group">
                        <label for="banner_text">Banner Text</label>
                        <input type="text" name="banner_text" placeholder="Enter banner text" v-model="data.banner_text" autocomplete="off" class="default_text">
                    </div>
                    <div class="form_group">
                        <label for="button_text">Button Text</label>
                        <input type="text" name="button_text" placeholder="Enter button text" v-model="data.button_text" autocomplete="off" class="default_text">
                    </div>
                    <div class="form_group">
                        <label for="button_link">Button Link</label>
                        <input type="text" name="button_link" placeholder="Enter button link" v-model="data.button_link" autocomplete="off" class="default_text" v-validate="{ url: {require_protocol: true } }">
                    </div>
                </div>
            </div>
        </template>
        <div class="form_wrapper" v-if="hasTeaser">
            <div class="form_header_wrapper">
                <h2 class="form_title">Teaser</h2>
            </div>
            <div class="form_main_group">
                <div class="form_group">
                    <label for="teaser_title">Teaser Title <span>*</span></label>
                    <input type="text" name="teaser_title" placeholder="Enter teaser title" v-model="data.teaser_title" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-\'\?_ |\,|\.|\!|\&]*$', min: 2, max: 100}">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('teaser_title')">{{ properFormat(errors.first('teaser_title')) }}</span></transition>
                </div>
                <div class="form_group teaser_description">
                    <label for="teaser_description">Teaser Description <span>*</span> <b>(Character limit: 1000)</b></label>
                    <textarea name="teaser_description" rows="4" id="teaser_description" class="default_text" v-validate="'min:10|max:1000'"></textarea>
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('teaser_description')">{{ properFormat(errors.first('teaser_description')) }}</span></transition>
                </div>
            </div>
        </div>
        <div class="form_wrapper" v-if="hasImage">
            <div class="form_header_wrapper">
                <h2 class="form_title">Image Upload</h2>
            </div>
            <div class="form_main_group">
                <banner-handler-container ref="banner_handler" :data="(data.banners[0].path != null) ? data.banners : ''" :parent="data.id" :dimension="bannerDimensions" />
                <input type="hidden" name="banner_category[]" value="banner" v-for="(count, key) in imageCount" :key="key">
            </div>
        </div>
        <div class="form_wrapper">
            <div class="form_header_wrapper">
                <h2 class="form_title">Metatags (SEO)</h2>
            </div>
            <div class="form_main_group">
                <div class="form_group">
                    <label for="meta_title">Meta Title <span>*</span></label>
                    <input type="text" name="meta_title" autocomplete="off" placeholder="Enter your meta title" v-model="data.meta_title" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ ]*$', min: 20, max: 70}">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_title')">{{ properFormat(errors.first('meta_title')) }}</span></transition>
                </div>
                <div class="form_group">
                    <label for="meta_keywords">Meta Keywords <span>*</span> <strong>(Use comma(,) to separate the keywords)</strong></label>
                    <input type="text" name="meta_keywords" autocomplete="off" placeholder="Enter your meta keywords" v-model="data.meta_keywords" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ |\,]*$', min: 50, max: 150}">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_keywords')">{{ properFormat(errors.first('meta_keywords')) }}</span></transition>
                </div>
                <div class="form_group">
                    <label for="meta_description">Meta Description <span>*</span></label>
                    <textarea name="meta_description" rows="4" id="meta_description" placeholder="Enter your meta description" v-model="data.meta_description" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ |\,|\.]*$', min: 150, max: 380}"></textarea>
                    <transition name="slide"><span class="validation_errors" v-if="errors.has('meta_description')">{{ properFormat(errors.first('meta_description')) }}</span></transition>
                </div>
            </div>
        </div>
        <div class="form_footer_wrapper">
            <div class="form_flex">
                <div class="form_check"></div>
                <div class="button_group">
                    <nuxt-link to="/pages" class="action_cancel_btn">Cancel</nuxt-link>
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
            hasTeaser: {
                type: Boolean,
                default: false
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
                res: null,
                imageCount: 0,
                teaser_length: false,
                subtitle_length: false,
                form: {
                    subtitle: ''
                },
                bannerDimensions: {
                    imageWidth: (!this.isHome) ? (this.$route.params.slug == 'book-a-bike' ? 2560 : 2564) : 2560,
                    imageHeight: (!this.isHome) ? (this.$route.params.slug == 'book-a-bike' ? 478 : 593) : 1606
                }
            }
        },
        inject: ['$validator'],
        methods: {
            submitForm () {
                const me = this
                me.$validator.validateAll().then(valid => {
                    if (valid && (!me.teaser_length && !me.subtitle_length)) {
                        let formData = new FormData(document.getElementById('default_form'))
                        formData.append('type', me.data.type)
                        formData.append('_method', 'PATCH')
                        me.loader(true)
                        me.$axios.post(`api/page-settings/${me.$route.params.slug}`, formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.notify('Page has been updated')
                                    me.$router.push('/pages')
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
            }
        },
        mounted () {
            const me = this
            if (me.hasTeaser) {
                setTimeout( () => {
                    $('#teaser_description').summernote({
                        tabsize: 4,
                        height: 200,
                        followingToolbar: false,
                        toolbar: [
                            [ 'font', [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear'] ],
                            [ 'color', [ 'color' ] ],
                            [ 'para', [ 'ol', 'ul', 'paragraph', 'height' ] ],
                            [ 'insert', ['link'] ],
                            [ 'view', [ 'undo', 'redo', 'fullscreen', 'codeview' ] ]
                        ],
                        codemirror: {
                            lineNumbers: true,
                            htmlMode: true,
                            mode: "text/html",
                            tabMode: 'indent',
                            lineWrapping: true
                        },
                        callbacks: {
                            onChange: function(e) {
                                let limit = 1000, target = $(".teaser_description .note-editable").text(), total_count = target.length

                                if(total_count >= limit){
                                    me.teaser_length = true
                                } else {
                                    me.$validator.errors.remove('teaser_description')
                                    me.teaser_length = false
                                }
                            }
                        }
                    })
                    if (me.data != null) {
                        $('#teaser_description').summernote('code', me.data.teaser_description)
                    }
                }, 100)
            }
            setTimeout( () => {
                $('#subtitle').summernote({
                    tabsize: 4,
                    height: 200,
                    followingToolbar: false,
                    toolbar: [
                        [ 'font', [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear'] ],
                        [ 'color', [ 'color' ] ],
                        [ 'para', [ 'ol', 'ul', 'paragraph', 'height' ] ],
                        [ 'insert', ['link'] ],
                        [ 'view', [ 'undo', 'redo', 'fullscreen', 'codeview' ] ]
                    ],
                    codemirror: {
                        lineNumbers: true,
                        htmlMode: true,
                        mode: "text/html",
                        tabMode: 'indent',
                        lineWrapping: true
                    },
                    callbacks: {
                        onChange: function(e) {
                            let limit = 10000, target = $(".subtitle .note-editable").text(), total_count = target.length

                            if(total_count >= limit){
                                me.subtitle_length = true
                            } else {
                                me.$validator.errors.remove('subtitle')
                                me.subtitle_length = false
                            }
                        }
                    }
                })
                if (me.data != null) {
                    $('#subtitle').summernote('code', me.data.subtitle)
                }
            }, 100)
            setTimeout( () => {
                if (me.hasImage) {
                    me.imageCount = me.$refs.banner_handler.images
                }
            }, 10)
        }
    }
</script>
