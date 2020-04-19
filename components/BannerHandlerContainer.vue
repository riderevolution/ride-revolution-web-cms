<template>
	<div class="form_image_group">
        <label>Banner <span>*</span> <strong v-if="dimension.imageWidth != 0">( Max: 2MB: Dimension: {{ dimension.imageWidth }} x {{ dimension.imageHeight }} )</strong></label>
		<banner-handler v-for="(image, key) in images" :key="key" :unique="key" :item="image" ref="imagePicker" :parent="parent" :tableName="tableName" :dimension="dimension" />
	</div>
</template>

<script>
	import BannerHandler from './BannerHandler'
	export default {
		props: {
			data: {
				default: ''
			},
			parent: {
				type: Number,
				default: 0
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
		components: {
			BannerHandler
		},
		data () {
			return {
				tableName: '',
                files: [],
				images: [0],
				showCloser: false
			}
		},
		methods: {
            determineIfShowCloser () {
				let enabledCount = 0
				setTimeout(() => {
					this.$refs.imagePicker.forEach((item, index) => {
						if (item.enabled == true) {
							enabledCount++
						}
					})
					this.showCloser = (enabledCount > 1) ? true : false
				}, 10)
			}
		},
		async mounted () {
            await setTimeout( () => {
                if (this.data != '') {
    				this.images = this.data
    			}
                this.determineIfShowCloser()
            }, 250)
		}
	}
</script>
