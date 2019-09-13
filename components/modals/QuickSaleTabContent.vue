<template>
    <div class="modal_tab_content_wrapper">
        <div class="form_check">
            <input type="checkbox" :id="`product_${unique}`" name="product[]" class="action_check">
            <label :for="`product_${unique}`">{{ value.variant }}</label>
        </div>
        <div class="total_price">PHP {{ totalCount(value.sale_price) }}</div>
        <div class="form_group">
            <label>Qty.</label>
            <div class="form_flex_input">
                <input type="text" :name="`quantity_${unique}`" class="default_text number" autocomplete="off" v-model="quantity" v-validate="'numeric|min_value:0'">
                <div class="up" @click="addCount()"></div>
                <div class="down" @click="subtractCount()"></div>
                <transition name="slide"><span class="validation_errors" v-if="errors.has('quantity')">{{ errors.first('quantity') }}</span></transition>
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
            value: {
                default: function() {
                    return 0
                }
            }
        },
        data () {
            return {
                quantity: 0
            }
        },
        methods: {
            addCount () {
                const me = this
                let data
                data = parseInt(me.quantity)
                data != 0 && (me.quantity = 0)
                me.quantity = (data += 1)
            },
            subtractCount () {
                const me = this
                let data
                data = parseInt(me.quantity)
                data > 0 && (me.quantity = (data -= 1))
            }
        }
    }
</script>
