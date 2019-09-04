<template>
    <div>
        <div class="input_wrapper">
            {{ value }}
            <div class="input_content">{{ value.variant }}</div>
            <div class="input_content">{{ value.sku_id }}</div>
            <div class="input_content">{{ (value.sellable) ? 'Yes' : 'No' }}</div>
            <div class="input_content">{{ value.sku_id }}</div>
            <div class="input_content">{{ value.quantity }}</div>
            <div class="input_content">
                <input type="text" name="quantity[]" class="default_text" v-validate="'required|numeric'">
                <transition name="slide"><span class="validation_errors" v-if="errors.has('quantity[]')">{{ errors.first('quantity[]') }}</span></transition>
            </div>
            <div class="input_content"><input type="text" name="reorder_point[]" autocomplete="off" class="default_text"></div>
            <div class="input_content"><input type="text" name="unit_price[]" autocomplete="off" class="default_text"></div>
            <div class="input_content"><input type="text" name="sale_price[]" autocomplete="off" class="default_text"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                default: function () {
                    return 0
                }
            }
        },
        inject: ['$validator'],
        data () {
            return {
                quantity: 0
            }
        }
    }
</script>
