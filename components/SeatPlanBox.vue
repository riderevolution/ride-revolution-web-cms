<template>
    <div :class="`seat_boxes ${position} ${layout}`" v-if="data.length > 0">
        <div :class="`seat_position ${(seat.status == 'open') ? '' : 'sign_in'}`" v-for="(seat, lkey) in data" v-if="position == 'left'">
            <div :id="`seat_menu_${seat.number}`" class="seat_menu" @click.self="toggleMenu($event)">&#x25CF;&#x25CF;&#x25CF;</div>
            <ul class="seat_overlay_menu">
                <li><a href="javascript:void(0)" class="seat_item" @click="seatStatus('comp')">Comp</a></li>
                <li><a href="javascript:void(0)" class="seat_item" @click="seatStatus('broken')">Broken Bike</a></li>
            </ul>
            <div class="seat_number">{{ seat.number }}</div>
            <div class="seat_pending" @click.self="checkPending()" v-if="seat.status == 'sign-out'"></div>
            <div class="seat_action" @click.self="toggleAction()"></div>
        </div>
        <div :class="`seat_position ${(seat.status == 'open') ? '' : 'sign_in'}`" v-for="(seat, rkey) in data" v-if="position == 'right'">
            <div :id="`seat_menu_${seat.number}`" class="seat_menu" @click.self="toggleMenu($event)">&#x25CF;&#x25CF;&#x25CF;</div>
            <ul class="seat_overlay_menu">
                <li><a href="javascript:void(0)" class="seat_item" @click="seatStatus('comp')">Comp</a></li>
                <li><a href="javascript:void(0)" class="seat_item" @click="seatStatus('broken')">Broken Bike</a></li>
            </ul>
            <div class="seat_number">{{ seat.number }}</div>
            <div class="seat_pending" @click.self="checkPending()" v-if="seat.status == 'sign-out'"></div>
            <div class="seat_action" @click.self="toggleAction()"></div>
        </div>
        <div :class="`seat_position ${(seat.status == 'open') ? '' : 'sign_in'}`" v-for="(seat, bkey) in data" v-if="position == 'bottom'">
            <div :id="`seat_menu_${seat.number}`" class="seat_menu" @click.self="toggleMenu($event)">&#x25CF;&#x25CF;&#x25CF;</div>
            <ul class="seat_overlay_menu">
                <li><a href="javascript:void(0)" class="seat_item" @click="seatStatus('comp')">Comp</a></li>
                <li><a href="javascript:void(0)" class="seat_item" @click="seatStatus('broken')">Broken Bike</a></li>
            </ul>
            <div class="seat_number">{{ seat.number }}</div>
            <div class="seat_pending" @click.self="checkPending()" v-if="seat.status == 'sign-out'"></div>
            <div class="seat_action" @click.self="toggleAction()"></div>
        </div>
        <div :class="`seat_position ${(seat.status == 'open') ? '' : 'sign_in'}`" v-for="(seat, bkey) in data" v-if="position == 'bottom_alt'">
            <div :id="`seat_menu_${seat.number}`" class="seat_menu" @click.self="toggleMenu($event)">&#x25CF;&#x25CF;&#x25CF;</div>
            <ul class="seat_overlay_menu">
                <li><a href="javascript:void(0)" class="seat_item" @click="seatStatus('comp')">Comp</a></li>
                <li><a href="javascript:void(0)" class="seat_item" @click="seatStatus('broken')">Broken Bike</a></li>
            </ul>
            <div class="seat_number">{{ seat.number }}</div>
            <div class="seat_pending" @click.self="checkPending()" v-if="seat.status == 'sign-out'"></div>
            <div class="seat_action" @click.self="toggleAction()"></div>
        </div>
        <div :class="`seat_position ${(seat.status == 'open') ? '' : 'sign_in'}`" v-for="(seat, bkey) in data" v-if="position == 'bottom_alt_2'">
            <div :id="`seat_menu_${seat.number}`" class="seat_menu" @click.self="toggleMenu($event)">&#x25CF;&#x25CF;&#x25CF;</div>
            <ul class="seat_overlay_menu">
                <li><a href="javascript:void(0)" class="seat_item" @click="seatStatus('comp')">Comp</a></li>
                <li><a href="javascript:void(0)" class="seat_item" @click="seatStatus('broken')">Broken Bike</a></li>
            </ul>
            <div class="seat_number">{{ seat.number }}</div>
            <div class="seat_pending" @click.self="checkPending()" v-if="seat.status == 'sign-out'"></div>
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
            seatStatus (type) {
                const me = this
                switch (type) {
                    case 'comp':

                        break
                    case 'broken':

                        break
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
    }
</script>
