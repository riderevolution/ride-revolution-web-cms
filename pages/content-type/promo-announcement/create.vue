<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/promo-announcement" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Promo Announcement</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Create Announcement</h1>
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
                                <div class="form_check">
                                    <input type="checkbox" id="is_featured" name="is_featured" class="action_check">
                                    <label for="is_featured">Home &amp; Buy Rides Page</label>
                                </div>
                            </div>
                            <div class="form_main_group">
                                <div class="form_group">
                                    <label for="name">Name <span>*</span></label>
                                    <input type="text" name="name" placeholder="Enter announcement name" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9\-_ |\'|\,|\!|\&]*$', min: 5, max: 100}">
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ properFormat(errors.first('name')) }}</span></transition>
                                </div>
                                <div class="form_group description">
                                    <label for="description">Description <span>*</span> <b>(Character limit: 500)</b></label>
                                    <textarea name="description" rows="4" id="description" class="default_text" v-validate="'required'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('description') && !length">{{ properFormat(errors.first('description')) }}</span></transition>
                                    <transition name="slide"><span class="validation_errors" v-if="length">The Description field may not be greater than 500 characters</span></transition>
                                </div>
                                <div class="form_group">
                                    <div class="form_check">
                                        <input type="checkbox" id="has_link" name="has_link" class="action_check" @change="has_link ^= true">
                                        <label for="has_link">Has Link</label>
                                    </div>
                                </div>
                                <div class="form_flex" v-if="has_link">
                                    <div class="form_group">
                                        <label for="link_label">Link label <span>*</span></label>
                                        <input type="text" name="link_label" key="link_label" placeholder="Enter link label" autocomplete="off" class="default_text" v-validate="{required: true}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('link_label')">{{ properFormat(errors.first('link_label')) }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="link">Link <span>*</span></label>
                                        <input type="text" name="link" key="link" placeholder="Enter link" autocomplete="off" class="default_text" v-validate="{required: true}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('link')">{{ properFormat(errors.first('link')) }}</span></transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form_wrapper">
                            <div class="form_header_wrapper">
                                <h2 class="form_title">Image Upload</h2>
                            </div>
                            <div class="form_main_group">
                                <banner-handler-container
                                    ref="banner_handler"
                                    :image_label="'Banner'"
                                    :dimension="bannerDimensions"
                                    :category="'banner'"
                                />
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_flex">
                                <div class="form_check">
                                    <input type="checkbox" id="enabled" name="enabled" class="action_check" checked>
                                    <label for="enabled">Activate</label>
                                </div>
                                <div class="button_group">
                                    <nuxt-link to="/content-type/promo" class="action_cancel_btn">Cancel</nuxt-link>
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
    import BannerHandlerContainer from '../../../components/BannerHandlerContainer'
    export default {
        components: {
            Foot,
            BannerHandlerContainer
        },
        data () {
            return {
                res: [],
                has_link: false,
                loaded: false,
                length: false,
                bannerDimensions: {
                    imageWidth: 2560,
                    imageHeight: 950
                },
                imageCount: 0
            }
        },
        methods: {
            submitForm () {
                const me = this

                me.$validator.validateAll().then(valid => {
                    if (valid && !me.length) {
                        me.loader(true)
                        let formData = new FormData(document.getElementById('default_form'))
                        me.$axios.post(`api/promo-announcements`, formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.notify('Content has been created')
                                    me.$router.push('/content-type/promo-announcement')
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
                setTimeout( () => {
                    me.imageCount = me.$refs.banner_handler.images
                    $('#description').summernote({
                        tabsize: 4,
                        height: 200,
                        followingToolbar: false,
                        disableResizeEditor: true,
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
                                let limit = 500, target = $(".description .note-editable").text(), total_count = target.length

                                if(total_count >= limit){
                                    me.length = true
                                } else {
                                    me.$validator.errors.remove('description')
                                    me.length = false
                                }
                            }
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
