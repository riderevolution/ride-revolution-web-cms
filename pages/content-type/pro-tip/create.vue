<template>
    <div class="content">
        <transition name="fade">
            <div id="admin" class="cms_dashboard" v-if="loaded">
                <section id="top_content" class="table">
                    <nuxt-link to="/content-type/pro-tip" class="action_back_btn"><img src="/icons/back-icon.svg"><span>Pro Tip</span></nuxt-link>
                    <div class="action_wrapper">
                        <h1 class="header_title">Add a Pro Tip</h1>
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
                                    <label for="page">Page <span>*</span></label>
                                    <select class="default_select" name="page">
                                        <option :value="data.value" v-for="(data, key) in pages" :key="key">{{ data.name }}</option>
                                    </select>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('page')">{{ properFormat(errors.first('page')) }}</span></transition>
                                </div>
                                <div class="form_group">
                                    <label for="label">Text <span>*</span> <b>(Character limit: 200)</b></label>
                                    <textarea name="label" rows="2" id="label" class="default_text" v-validate="'required|max:200'"></textarea>
                                    <transition name="slide"><span class="validation_errors" v-if="errors.has('label')">{{ properFormat(errors.first('label')) }}</span></transition>
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
    import Foot from '../../../components/Foot'
    export default {
        components: {
            Foot
        },
        data () {
            return {
                loaded: false,
                pages: [
                    {
                        name: 'Review',
                        value: 'review'
                    },
                    {
                        name: 'Buy Rides',
                        value: 'buy-rides'
                    },
                    {
                        name: 'Book a Bike',
                        value: 'book-a-bike'
                    }
                ]
            }
        },
        methods: {
            submitForm () {
                const me = this

                if ($('#label').summernote('code').length <= 200) {
                    me.$validator.errors.remove('label')
                }

                me.$validator.validateAll().then(valid => {
                    if (valid) {
                        me.loader(true)
                        let formData = new FormData(document.getElementById('default_form'))
                        me.$axios.post('api/pro-tips', formData).then(res => {
                            if (res.data) {
                                setTimeout(() => {
                                    me.$router.push('/content-type/pro-tip')
                                    me.notify('Content has been created')
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
                    $('#label').summernote({
                        tabsize: 4,
                        height: 150,
                        followingToolbar: false,
                        disableResizeEditor: true,
                        toolbar: [
                            [ 'font', [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear'] ],
                            [ 'color', [ 'color' ] ],
                            [ 'para', [ 'paragraph' ] ],
                            [ 'view', [ 'undo', 'redo', 'fullscreen', 'codeview' ] ]
                        ],
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
