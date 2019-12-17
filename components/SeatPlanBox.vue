<template>
    <div :class="`seat_boxes ${position} ${layout}`" v-if="data.length > 0">
        <div class="seat_position sign_in" v-for="(seat, lkey) in data" v-if="position == 'left'">
            <div :id="`seat_menu_${seat.number}`" class="seat_menu" @click.self="toggleMenu($event)">&#x25CF;&#x25CF;&#x25CF;</div>
            <ul class="seat_overlay_menu">
                <li><a href="javascript:void(0)" class="seat_item">Comp</a></li>
                <li><a href="javascript:void(0)" class="seat_item">Broken Bike</a></li>
            </ul>
            <div class="seat_number">{{ seat.number }}</div>
            <div class="seat_pending" @click.self="checkPending()"></div>
            <div class="seat_action" @click.self="toggleAction()"></div>
        </div>
        <div class="seat_position sign_out" v-for="(seat, rkey) in data" v-if="position == 'right'">
            <div :id="`seat_menu_${seat.number}`" class="seat_menu" @click.self="toggleMenu($event)">&#x25CF;&#x25CF;&#x25CF;</div>
            <ul class="seat_overlay_menu">
                <li><a href="javascript:void(0)" class="seat_item">Comp</a></li>
                <li><a href="javascript:void(0)" class="seat_item">Broken Bike</a></li>
            </ul>
            <div class="seat_number">{{ seat.number }}</div>
            <div class="seat_pending" @click.self="checkPending()"></div>
            <div class="seat_action" @click.self="toggleAction()"></div>
        </div>
        <div class="seat_position sign_in" v-for="(seat, bkey) in data" v-if="position == 'bottom'">
            <div :id="`seat_menu_${seat.number}`" class="seat_menu" @click.self="toggleMenu($event)">&#x25CF;&#x25CF;&#x25CF;</div>
            <ul class="seat_overlay_menu">
                <li><a href="javascript:void(0)" class="seat_item">Comp</a></li>
                <li><a href="javascript:void(0)" class="seat_item">Broken Bike</a></li>
            </ul>
            <div class="seat_number">{{ seat.number }}</div>
            <div class="seat_pending" @click.self="checkPending()"></div>
            <div class="seat_action" @click.self="toggleAction()"></div>
        </div>
        <div class="seat_position" v-for="(seat, bkey) in data" v-if="position == 'bottom_alt'">
            <div :id="`seat_menu_${seat.number}`" class="seat_menu" @click.self="toggleMenu($event)">&#x25CF;&#x25CF;&#x25CF;</div>
            <ul class="seat_overlay_menu">
                <li><a href="javascript:void(0)" class="seat_item">Comp</a></li>
                <li><a href="javascript:void(0)" class="seat_item">Broken Bike</a></li>
            </ul>
            <div class="seat_number">{{ seat.number }}</div>
        </div>
        <div class="seat_position sign_in" v-for="(seat, bkey) in data" v-if="position == 'bottom_alt_2'">
            <div :id="`seat_menu_${seat.number}`" class="seat_menu" @click.self="toggleMenu($event)">&#x25CF;&#x25CF;&#x25CF;</div>
            <ul class="seat_overlay_menu">
                <li><a href="javascript:void(0)" class="seat_item">Comp</a></li>
                <li><a href="javascript:void(0)" class="seat_item">Broken Bike</a></li>
            </ul>
            <div class="seat_number">{{ seat.number }}</div>
            <div class="seat_pending" @click.self="checkPending()"></div>
            <div class="seat_action" @click.self="toggleAction()"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            position: {
                type: String,
                default: null
            },
            layout: {
                type: String,
                default: null
            },
            total: {
                type: Number,
                default: 0
            },
            data: {
                default: null
            }
        },
        methods: {
            toggleOverlays (e) {
                const me = this
                let target = e.target
                for (let i = 1; i < me.total + 1; i++) {
                    let element = document.getElementById(`seat_menu_${i}`)
                    if (element !== target && element !== target.parentNode.parentNode.parentNode.previousElementSibling) {
                        if (element.nextElementSibling.classList.contains('active')) {
                            element.nextElementSibling.classList.remove('active')
                        }
                    }
                }
            },
            toggleMenu (event) {
                const me = this
                let element = event.target
                if (element.nextElementSibling.classList.contains('active')) {
                    element.nextElementSibling.classList.remove('active')
                } else {
                    element.nextElementSibling.classList.add('active')
                }
            },
            toggleAction () {
                const me = this
                alert(2)
            },
            checkPending () {
                const me = this
                alert(3)
            }
        },
        beforeMount () {
            document.addEventListener('click', this.toggleOverlays)
        },
        beforeDestroy () {
            document.removeEventListener('click', this.toggleOverlays)
        }
    }
</script>
