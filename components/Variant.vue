<template>
    <div class="input_wrapper">
        <div class="input_content"><input type="text" name="variant[]" autocomplete="off" class="default_text"></div>
        <div class="input_content"><input type="text" name="sku_id[]" autocomplete="off" class="default_text"></div>
        <div class="input_content"><input type="text" name="quantity[]" autocomplete="off" class="default_text"></div>
        <div class="input_content"><input type="text" name="reorder_point[]" autocomplete="off" class="default_text"></div>
        <div class="input_content"><input type="text" name="unit_price[]" autocomplete="off" class="default_text"></div>
        <div class="input_content"><input type="text" name="sale_price[]" autocomplete="off" class="default_text"></div>
        <div class="input_content image_upload"><a href="javascript:void(0)" class="action_btn" @click="toggleVariantImage(unique)"><svg xmlns="http://www.w3.org/2000/svg" width="18.306" height="18.306" viewBox="0 0 18.306 18.306"> <g transform="translate(-1233.873 -1197.248) rotate(-9)"> <g transform="translate(1031 1378)" class="upload_image"> <rect width="16" height="16" rx="2" stroke="none" /> <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="none" /> </g> <path d="M16305.061-1443.824l5.559-4.864,4.563,4.259,2.891-3.014,2.3,3.014" transform="translate(-15273.644 2834.915)" class="upload_image" /> <g transform="translate(1039 1380.909)" class="upload_image"> <circle cx="1.818" cy="1.818" r="1.818" stroke="none" /> <circle cx="1.818" cy="1.818" r="1.318" fill="none" /> </g> </g> </svg>Upload Image ({{ totalUploaded }})</a></div>
        <variant-image-form v-show="showImages" :parentTitle="$parent.form.title" :unique="unique" />
    </div>
</template>

<script>
    import VariantImageForm from './modals/VariantImageForm'
    export default {
        props: {
            unique: {
                type: Number,
                default: null
            }
        },
        components: {
            VariantImageForm
        },
        data () {
            return {
                showImages: false,
                totalUploaded: 0
            }
        },
        methods: {
            /**
             * Toggle User and Role Form
             * @param  {[int]} value id
             * @param  {[int]} type method
             * @param  {[string]} category
             * @return {[boolean]}
             */
            toggleVariantImage (key) {
                const me = this
                me.showImages = true
                document.getElementById(`key_${key}`).classList.remove('fade_out')
                document.getElementById(`key_${key}`).classList.add('fade_in')
                document.body.classList.add('no_scroll')
            }
        }
    }
</script>
