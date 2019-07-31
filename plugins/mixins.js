import Vue from 'vue'

Vue.mixin({
    methods: {
        notify (action) {
            this.$store.state.notificationMessage = action
            setTimeout( () => {
                this.$store.state.isNotify = true
            }, 500)
            setTimeout( () => {
                this.$store.state.isNotify = false
            }, 2000)
        },
        parser (data) {
            if (data) {
                return JSON.parse(data)
            }
        },
        replacer (data) {
            if (data) {
                return data.replace(/\-/g, ' ')
            }
        },
        convertToSlug (data) {
            let slug = ''
            if (data.match(/[!@#$%^&*(){}:;"’'<>?,./|“”]|\`|\~|\=|\-|\+|\_|\[|\]|\\/g)) {
                slug = data.toLowerCase().replace(/[!@#$%^&*(){}:;"'’<>?,./|“”]|\`|\~|\=|\-|\+|\_|\[|\]|\\/g, '').replace(/\s/g, '-')
            } else {
                slug = data.toLowerCase().replace(/\s/g, '-')
            }
            return slug
        },
        loader () {
            this.$store.state.isLoaderShow = true
            document.body.classList.add('no_click')
            setTimeout( () => {
                this.$store.state.isLoaderShow = false
                document.body.classList.remove('no_click')
            }, 500)
        },
        logout () {
            let token = this.$cookies.get('token')
            this.$axios.post('api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                this.$cookies.remove('token')
                this.$store.state.isAuth = false
                this.$router.push('/login')
            }).catch(err => {
                console.log(err)
            })
        },
        validateToken () {
            return new Promise((resolve, reject) => {
                let token = this.$cookies.get('token')
                if (token != null || token != undefined) {
                    this.$axios.get('api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        if (res.data != 0) {
                            this.$store.state.isAuth = true
                            this.$store.state.token = token
                            this.$store.state.user = res.data
                        } else {
                            this.logout()
                        }
                    }).catch(err => {
                        console.log(err)
                        this.logout()
                    }).then(() =>{
                        resolve('ok')
                    })
                } else {
                    this.logout()
                }
            })
        },
        async fetchData (apiRoute) {
            const me = this
            await me.validateToken()
            let api = await me.$axios.get(apiRoute)
            return api
        }
    }
})
