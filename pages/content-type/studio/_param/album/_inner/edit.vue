<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link :to="`/content-type/studio/${$route.params.param}/album`" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Album</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Update {{ res.name }}</h1>
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
                                        <input type="text" name="name" placeholder="Enter album name" v-model="res.name" autocomplete="off" class="default_text" v-validate="{required: true, regex: '^[a-zA-Z0-9_ ]*$', min: 5, max:100}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('name')">{{ properFormat(errors.first('name')) }}</span></transition>
                                    </div>
                                    <div class="form_group">
                                        <label for="sequence">Sequence <span>*</span></label>
                                        <input type="text" name="sequence" placeholder="Enter sequence" v-model="res.sequence" autocomplete="off" class="default_text" v-validate="{required: true, numeric: true, min_value: 1, max_value: 99}">
                                        <transition name="slide"><span class="validation_errors" v-if="errors.has('sequence')">{{ properFormat(errors.first('sequence')) }}</span></transition>
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
                                <image-handler-container ref="image_handler" :multiple="true" :data="res.images" :parent="res.id" />
                            </div>
                        </div>
                        <div class="form_footer_wrapper">
                            <div class="form_check">
                                <input type="checkbox" id="is_featured" name="is_featured" class="action_check" :checked="res.is_featured == 1">
                                <label for="is_featured">Amenities</label>
                            </div>
                            <div class="form_check">
                                <input type="checkbox" id="is_homepage" name="is_homepage" class="action_check" :checked="res.is_homepage == 1">
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
    import Foot from '../../../../../../components/Foot'
    import ImageHandlerContainer from '../../../../../../components/ImageHandlerContainer'
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
                        formData.append('_method', 'PATCH')
                        me.$axios.post(`api/web/studio-albums/${me.$route.params.inner}`, formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.notify('Content has been updated')
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
                me.$axios.get(`api/web/studio-albums/${me.$route.params.inner}`).then(res => {
                    if (res.data) {
                        setTimeout( () => {
                            me.res = res.data.studioAlbum
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
