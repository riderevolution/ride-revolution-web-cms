<template>
    <div class="default_modal" :id="`key_${unique}`">
        <div class="background" @click="toggleCancel(unique)"></div>
        <div id="default_form" class="overlay">
            <div class="modal_wrapper">
                <h2 class="form_title">{{ parentTitle }}</h2>
                <div class="form_close" @click="toggleCancel(unique)"></div>
                <div class="modal_main_group">
                    <div class="form_photo alternate">
                        <input type="file" :id="`image_${unique}`" name="image[]" class="action_photo" @change="getFile($event, unique)" v-validate="'required|image'" multiple>
                        <label :for="`image_${unique}`">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18.306 18.306"><g transform="translate(-1233.873 -1197.248) rotate(-9)"><g transform="translate(1031 1378)" fill="none" stroke="#00b1ff" stroke-width="1"><rect width="16" height="16" rx="2" stroke="none"/><rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="none"/></g><path d="M16305.061-1443.824l5.559-4.864,4.563,4.259,2.891-3.014,2.3,3.014" transform="translate(-15273.644 2834.915)" fill="none" stroke="#00b1ff" stroke-width="1"/><g transform="translate(1039 1380.909)" fill="none" stroke="#00b1ff" stroke-width="1"><circle cx="1.818" cy="1.818" r="1.818" stroke="none"/><circle cx="1.818" cy="1.818" r="1.318" fill="none"/></g></g></svg>
                                 Upload Photos
                             </span>
                        </label>
                        <transition name="slide"><span class="validation_errors" v-if="errors.has('image[]')">{{ errors.first('image[]') }}</span></transition>
                        <input type="hidden" name="image_parent_key[]" v-model="unique">
                    </div>
                    <div class="preview_image_wrapper" :id="`preview_image_wrapper_${unique}`">
                        <div class="preview" v-for="(data, key) in images" :key="key">
                            <img :id="`preview_image_${unique}_${key}`" src="/" v-if="previewImage"/>
                        </div>
                    </div>
                    <div class="form_footer_wrapper">
                        <div class="button_group">
                            <a href="javascript:void(0)" class="action_cancel_btn" @click="toggleCancel(unique)">Cancel</a>
                            <button type="button" name="button" class="action_btn margin alternate" @click="toggleClose(unique)">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            unique: {
                type: Number,
                default: null
            },
            parentTitle: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                previewImage: false,
                images: [],
                res: []
            }
        },
        methods: {
            getFile (event, key) {
                const me = this
                let element = event.target
                me.images = []
                if (element.files && element.files[0]) {
                    for (let i = 0; i < element.files.length; i++) {
                        me.images.push(i)
                        let reader = new FileReader()
                        reader.onload = function () {
                            let image = document.getElementById(`preview_image_${key}_${i}`)
                            image.src = reader.result
                        }
                        reader.readAsDataURL(element.files[i])
                    }
                }
                me.previewImage = true
                setTimeout( () => {
                    if (document.getElementById(`preview_image_wrapper_${key}`).scrollHeight >= 500) {
                        document.getElementById(`preview_image_wrapper_${key}`).classList.add('scrollable')
                    }
                }, 10)
            },
            toggleClose (key) {
                const me = this
                document.getElementById(`key_${key}`).classList.remove('fade_in')
                document.getElementById(`key_${key}`).classList.add('fade_out')
                document.body.classList.remove('no_scroll')
                setTimeout( () => {
                    me.$parent.showImages = false
                    me.$parent.totalUploaded = me.images.length
                    document.getElementById(`preview_image_wrapper_${key}`).classList.remove('scrollable')
                }, 300)
            },
            toggleCancel (key) {
                const me = this
                document.getElementById(`key_${key}`).classList.remove('fade_in')
                document.getElementById(`key_${key}`).classList.add('fade_out')
                document.body.classList.remove('no_scroll')
                setTimeout( () => {
                    me.$parent.showImages = false
                    me.$parent.totalUploaded = 0
                    document.getElementById(`preview_image_wrapper_${key}`).classList.remove('scrollable')
                    me.images = []
                }, 300)
            }
        },
        async mounted () {
            // const me = this
            // if (me.id != 0) {
            //     me.$axios.get(`api/inventory/product-categories/${me.id}`).then(res => {
            //         me.res = res.data.productCategory
            //     })
            // }
        }
    }
</script>
