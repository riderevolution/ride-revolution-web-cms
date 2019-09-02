<template>
    <div>
        <div class="input_wrapper" v-show="show" v-if="type == 0">
            <div class="input_content"><input type="text" name="variant[]" autocomplete="off" class="default_text"></div>
            <div class="input_content"><input type="text" name="sku_id[]" autocomplete="off" class="default_text"></div>
            <div class="input_content"><input type="text" name="quantity[]" autocomplete="off" class="default_text"></div>
            <div class="input_content"><input type="text" name="reorder_point[]" autocomplete="off" class="default_text"></div>
            <div class="input_content"><input type="text" name="unit_price[]" autocomplete="off" class="default_text"></div>
            <div class="input_content"><input type="text" name="sale_price[]" autocomplete="off" class="default_text"></div>
            <div class="input_content image_upload">
                <a href="javascript:void(0)" class="action_btn" @click="toggleVariantImage(unique)"><svg xmlns="http://www.w3.org/2000/svg" width="18.306" height="18.306" viewBox="0 0 18.306 18.306"> <g transform="translate(-1233.873 -1197.248) rotate(-9)"> <g transform="translate(1031 1378)" class="upload_image"> <rect width="16" height="16" rx="2" stroke="none" /> <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="none" /> </g> <path d="M16305.061-1443.824l5.559-4.864,4.563,4.259,2.891-3.014,2.3,3.014" transform="translate(-15273.644 2834.915)" class="upload_image" /> <g transform="translate(1039 1380.909)" class="upload_image"> <circle cx="1.818" cy="1.818" r="1.818" stroke="none" /> <circle cx="1.818" cy="1.818" r="1.318" fill="none" /> </g> </g> </svg>Upload Images ({{ totalUploaded }})</a>
                <a href="javascript:void(0)" class="action_cancel_btn margin" @click="removeVariant()">Remove</a>
            </div>
            <variant-image-form v-show="showImages" :parentTitle="$parent.form.title" :unique="unique" :values="value.images" />
            <input type="hidden" name="is_show[]" :value="`${(show) ? 1 : 0}`">
            <input type="hidden" name="temporary_id[]" :value="tempID">
        </div>
        <div class="input_wrapper" v-show="show" v-else>
            <div class="input_content"><input type="text" name="variant[]" autocomplete="off" class="default_text" v-model="value.variant"></div>
            <div class="input_content"><input type="text" name="sku_id[]" autocomplete="off" class="default_text" v-model="value.sku_id"></div>
            <div class="input_content"><input type="text" name="quantity[]" autocomplete="off" class="default_text" v-model="value.quantity"></div>
            <div class="input_content"><input type="text" name="reorder_point[]" autocomplete="off" class="default_text" v-model="value.reorder_point"></div>
            <div class="input_content"><input type="text" name="unit_price[]" autocomplete="off" class="default_text" v-model="value.unit_price"></div>
            <div class="input_content"><input type="text" name="sale_price[]" autocomplete="off" class="default_text" v-model="value.sale_price"></div>
            <div class="input_content image_upload">
                <a href="javascript:void(0)" class="action_btn" @click="toggleVariantImage(unique)"><svg xmlns="http://www.w3.org/2000/svg" width="18.306" height="18.306" viewBox="0 0 18.306 18.306"> <g transform="translate(-1233.873 -1197.248) rotate(-9)"> <g transform="translate(1031 1378)" class="upload_image"> <rect width="16" height="16" rx="2" stroke="none" /> <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="none" /> </g> <path d="M16305.061-1443.824l5.559-4.864,4.563,4.259,2.891-3.014,2.3,3.014" transform="translate(-15273.644 2834.915)" class="upload_image" /> <g transform="translate(1039 1380.909)" class="upload_image"> <circle cx="1.818" cy="1.818" r="1.818" stroke="none" /> <circle cx="1.818" cy="1.818" r="1.318" fill="none" /> </g> </g> </svg>{{ (value.images.length > 0) ? 'Manage Images' : 'Upload Images' }} ({{ (value.images.length > 0) ? totalUploaded = value.images.length : totalUploaded }})</a>
                <a href="javascript:void(0)" class="action_cancel_btn margin" @click="removeVariant()">Remove</a>
            </div>
            <variant-image-form v-show="showImages" :parentTitle="$parent.form.title" :unique="unique" :values="value.images" />
            <input type="hidden" name="is_show[]" :value="`${(show) ? 1 : 0}`">
            <input type="hidden" name="temporary_id[]" v-model="value.temporary_id">
        </div>
    </div>
</template>

<script>
    import VariantImageForm from './modals/VariantImageForm'
    export default {
        props: {
            type: {
                type: Number,
                default: 0
            },
            unique: {
                type: Number,
                default: null
            },
            value: {
                default: function () {
                    return 0
                }
            }
        },
        components: {
            VariantImageForm
        },
        data () {
            return {
                tempID: '',
                show: true,
                parentKeys: [],
                showImages: false,
                totalUploaded: 0
            }
        },
        methods: {
            toggleVariantImage (key) {
                const me = this
                me.showImages = true
                document.getElementById(`key_${key}`).classList.remove('fade_out')
                document.getElementById(`key_${key}`).classList.add('fade_in')
                document.body.classList.add('no_scroll')
            },
            removeVariant () {
                const me = this
                me.show = false
            }
        },
        mounted () {
            const me = this
            me.tempID = me.randomString()
        }
    }
</script>
