<template>
    <div class="input_content_wrapper threshold">
        <div class="input_wrapper">
            <div class="input_content">{{ value.variant }}</div>
            <div class="input_content">{{ value.sku_id }}</div>
            <div class="input_content">{{ (value.sellable) ? 'Yes' : 'No' }}</div>
            <div class="input_content">{{ value.sku_id }}</div>
            <div class="input_content">{{ value.quantity }}</div>
            <div class="input_content">
                <input type="text" name="quantity[]" class="default_text" v-validate="'required|numeric'" v-model="quantity">
                <transition name="slide"><span class="validation_errors" v-if="errors.has('quantity[]')">{{ errors.first('quantity[]') }}</span></transition>
            </div>
            <div class="input_content">PHP {{ totalCount(value.unit_price) }}</div>
            <div class="input_content"><input type="text" name="shipping_cost[]" autocomplete="off" class="default_text"></div>
            <div class="input_content"><input type="text" name="addistional_cost[]" autocomplete="off" class="default_text"></div>
            <div class="input_content">
                PHP {{ totalCount(quantity * value.unit_price) }}
                <div class="close_wrapper alternate">
                    <div class="close_icon"></div>
                </div>
            </div>
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
