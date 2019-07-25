<template>
	<div class="breadcrumb">
		<ul class="fixed">
			<li v-for="(crumb, key) in crumbs">
				<span class="home">
					<span v-if="crumb.url == '/'">Home</span>
					<span v-else class="field_crumb">{{ crumb.NAME }}</span>
				</span>
				<span class="slash">
					{{ (crumbs.length == key + 1) ? '' : '/' }}
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import breadcrumb from 'url-breadcrumb'
	export default {
		data() {
			return {
				crumbs: []
			}
		},
		props: [
			'isOverlay'
		],
		mounted() {
            let me = this
            me.crumbs = breadcrumb($nuxt.$route.path )
        },
	}
</script>
