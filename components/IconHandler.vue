<template>
    <div v-if="enabled" :data-vv-scope="`image_form_${unique}`">
        <div class="form_group">
            <input type="file" class="action_image" :id="`icon${unique}`" :data-vv-name="`image_form_${unique}.icon[]`" name="icon[]" ref="file" @change="getFile($event)" v-validate="`${(dataImage.id) ? '' : 'required|'}|size:20000|image|ext:jpeg,jpg,png,svg|${(dimension.imageWidth == 0) ? '' : `|dimensions:${dimension.imageWidth},${dimension.imageHeight}`}`" :required="item.path == null">
            <input type="hidden" name="icon_id[]" v-model="item.id">
            <label class="action_image_label default_text" :for="`icon${unique}`">Choose File</label>
            <transition name="slide"><span class="validation_errors" v-if="errors.has(`image_form_${unique}.icon[]`)">{{ properFormat(errors.first(`image_form_${unique}.icon[]`)) }}</span></transition>
        </div>
        <div class="form_tags_group" v-if="showTags">
            <div class="preview_group">
                <img :id="`preview_icon${unique}`" :src="`${(item != null) ? item.path : ''}`" />
            </div>
            <div class="tags_group">
                <div class="form_group">
                    <label :for="`icon_title${unique}`">Icon Title <span>*</span></label>
                    <input type="text" name="icon_title[]" :id="`icon_title${unique}`" :data-vv-name="`image_form_${unique}.icon_title[]`" v-validate="{required: true, regex: '^[a-zA-Z\-_ |\_]*$', max: 20}" autocomplete="off" class="action_form default_text" v-model="dataImage.title">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has(`image_form_${unique}.icon_title[]`)">{{ properFormat(errors.first(`image_form_${unique}.icon_title[]`)) }}</span></transition>
                </div>
                <div class="form_group">
                    <label :for="`icon_alt${unique}`">Icon Alt <span>*</span></label>
                    <input type="text" name="icon_alt[]" :id="`icon_alt${unique}`" :data-vv-name="`image_form_${unique}.icon_alt[]`" v-validate="{required: true, regex: '^[a-zA-Z\_\-]*$', max: 20}" autocomplete="off" class="action_form default_text" v-model="dataImage.alt">
                    <transition name="slide"><span class="validation_errors" v-if="errors.has(`image_form_${unique}.icon_alt[]`)">{{ properFormat(errors.first(`image_form_${unique}.icon_alt[]`)) }}</span></transition>
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
                        let image = document.getElementById(`preview_icon${me.unique}`)
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
