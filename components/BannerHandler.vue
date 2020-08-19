<template>
    <div v-if="enabled" :data-vv-scope="`image_form_${unique}`">
        <div class="form_group">
            <input type="file" class="action_image" :id="`banner${unique}`" :data-vv-name="`image_form_${unique}.banner[]`" name="banner[]" ref="file" @change="getFile($event)" v-validate="`${(dataImage.id) ? '' : 'required|'}image|ext:jpeg,jpg,png|size:20000${(dimension.imageWidth == 0) ? '' : `|dimensions:${dimension.imageWidth},${dimension.imageHeight}`}`">
            <input type="hidden" name="banner_id[]" v-model="dataImage.id">
            <label class="action_image_label" :for="`banner${unique}`">Choose File</label>
            <div v-if="$parent.showCloser" class="action_image_remove" @click="removeImage($event, unique, item.id, parent)">Remove</div>
            <transition name="slide"><span class="validation_errors" v-if="errors.has(`image_form_${unique}.banner[]`)">{{ properFormat(errors.first(`image_form_${unique}.banner[]`)) }}</span></transition>
        </div>
        <div class="form_tags_group" v-if="showTags">
            <div class="preview_group">
                <img :id="`preview_banner${unique}`" :src="`${(item != null) ? item.path : ''}`" />
            </div>
            <div class="tags_group">
                <div class="form_group">
                    <label :for="`banner_title${unique}`">Banner Title <span>*</span></label>
                    <input type="text" name="banner_title[]" :id="`banner_title${unique}`" :data-vv-name="`image_form_${unique}.banner_title[]`" v-validate="{required: true, regex: '^[a-zA-Z\-_ |\_]*$', max: 20}" autocomplete="off" class="action_form default_text" v-model="dataImage.title">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has(`image_form_${unique}.banner_title[]`)">{{ properFormat(errors.first(`image_form_${unique}.banner_title[]`)) }}</span></transition>
                </div>
                <div class="form_group">
                    <label :for="`banner_alt${unique}`">Banner Alt <span>*</span></label>
                    <input type="text" name="banner_alt[]" :id="`banner_alt${unique}`" :data-vv-name="`image_form_${unique}.banner_alt[]`" v-validate="{required: true, regex: '^[a-zA-Z\-|\_]*$', max: 20}" autocomplete="off" class="action_form default_text" v-model="dataImage.alt">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has(`image_form_${unique}.banner_alt[]`)">{{ properFormat(errors.first(`image_form_${unique}.banner_alt[]`)) }}</span></transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                default: 0
            },
            unique: {
                type: Number
            },
            parent: {
                type: Number,
                default: 0
            },
            tableName: {
                type: String
            },
            dimension: {
                type: Object,
                default: function () {
                    return {
                        imageWidth: 0,
                        imageHeight: 0
                    }
                }
            }
        },
        inject: ['$validator'],
        data () {
            return {
                showTags: false,
                enabled: true,
                dataImage: {
                    id: 0,
                    title: '',
                    alt: ''
                }
            }
        },
        methods: {
            getFile (event) {
                let element = event.target
                let me = this
                if (element.files[0]) {
                    element.nextElementSibling.innerText = element.files[0].name
                    me.showTags = true
                    me.$parent.files[me.unique] = me.$refs.file.files[0]
                }
                if (element.files && element.files[0]) {
                    let reader = new FileReader()
                    reader.onload = function () {
                        let image = document.getElementById(`preview_banner${me.unique}`)
                        image.src = reader.result
                    }
                    setTimeout( () => {
                        reader.readAsDataURL(element.files[0])
                    }, 10)
                }
            }
        },
        mounted () {
            let ctr = 0
            setInterval( () => {
                if (ctr < 1 && this.item) {
                    this.dataImage.id = (this.item.id != null) ? this.item.id : 0
                    this.dataImage.title = this.item.title
                    this.dataImage.alt = this.item.alt
                    this.showTags = (this.item != 0) ? true : false
                    ctr++
                }
            }, 500)
        }
    }
</script>
