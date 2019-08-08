<template>
    <div v-if="enabled">
        <div class="form_group">
            <input type="file" class="action_image" :id="`icon${unique}`" name="icon" ref="file" @change="getFile($event)" v-validate="`image|ext:svg,png${(dimension.imageWidth == 0) ? '' : `|dimensions:${dimension.imageWidth},${dimension.imageHeight}`}`" :required="item.key == null">
            <label class="action_image_label default_text" :for="`icon${unique}`">{{ (item.key != null) ? item.name : 'Choose File' }}</label>
            <transition name="slide"><span class="validation_errors" v-if="errors.has('icon')">{{ errors.first('icon') }}</span></transition>
        </div>
        <div class="form_tags_group" v-if="showTags">
            <div class="preview_group">
                <img :id="`preview_icon${unique}`" :src="`${(item != null) ? item.path : ''}`" />
            </div>
            <div class="tags_group">
                <div class="form_group">
                    <label :for="`icon_title${unique}`">Icon Title</label>
                    <input type="text" name="icon_title[]" :id="`icon_title${unique}`" autocomplete="off" class="action_form default_text" v-model="dataImage.title">
                </div>
                <div class="form_group">
                    <label :for="`icon_alt${unique}`">Icon Alt</label>
                    <input type="text" name="icon_alt[]" :id="`icon_alt${unique}`" autocomplete="off" class="action_form default_text" v-model="dataImage.alt">
                    <input type="hidden" name="icon_key[]" :value="`${(item.key) ? item.key : ''}`">
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
        data () {
            return {
                showTags: false,
                enabled: true,
                dataImage: {
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
                    reader.readAsDataURL(element.files[0])
                }
            }
        },
        async mounted () {
            await setTimeout( () => {
                if (this.item) {
                    this.dataImage.title = this.item.title
                    this.dataImage.alt = this.item.alt
                    this.showTags = (this.item != 0) ? true : false
                }
            }, 300)
        }
    }
</script>
