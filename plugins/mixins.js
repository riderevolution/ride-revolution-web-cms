import Vue from 'vue'

Vue.mixin({
    methods: {
        properFormat (value) {
            let newValue = value.split('The ')[1].split(' field')[0].split('.')
            if (newValue.length > 1) {
                newValue = newValue[1].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                } else {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                }
            } else {
                newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                } else {
                    newValue = value.split('The ')[1].split(' field')[0].split('_')
                    if (newValue.length > 1) {
                        let firstValue = ''
                        let lastValue = ''
                        if (newValue[0] != 'co' && newValue[0] != 'pa' && newValue[0] != 'ec' && newValue[0] != 'ba') {
                            firstValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                        }
                        for (let i = 1; i < newValue.length; i++) {
                            if (newValue[i] != 'id') {
                                lastValue += ' ' + newValue[i].charAt(0).toUpperCase() + newValue[i].slice(1)
                            }
                        }
                        newValue = firstValue + ' ' + lastValue
                    } else {
                        newValue = value.split('The ')[1].split(' field')[0].charAt(0).toUpperCase() + value.split('The ')[1].split(' field')[0].slice(1)
                    }
                }
            }
            let message = value.split('The ')[1].split(' field')
            if (message.length > 1) {
                message = message[1]
                return `The ${newValue} field${message}`
            } else {
                if (message[0].split('file').length > 1) {
                    message = message[0].split('file')[1]
                    return `The ${newValue} field${message}`
                } else {
                    return `The ${newValue}`
                }
            }
        },
        randomCode () {
            return Math.random().toString(36).substring(5).toUpperCase()
        },
        randomString () {
            return Math.random().toString(36).substring(2)
        },
        totalItems (value) {
            if (value != 0) {
                return parseFloat(value).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            } else {
                return 0
            }
        },
        totalCount (value) {
            let count = 0
            if (value) {
                count = parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            return count
        },
        notify (action, isTimeout = true) {
            this.$store.state.notificationMessage = action
            setTimeout( () => {
                this.$store.state.isNotify = true
            }, 500)
            if (isTimeout) {
                setTimeout( () => {
                    this.$store.state.isNotify = false
                }, 2000)
            }
        },
        toJSON (data) {
            if (data) {
                return JSON.parse(JSON.stringify(Object.fromEntries(data)))
            }
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
        loader (data) {
            this.$store.state.isLoading = data
            if (data) {
                document.body.classList.add('no_click')
            } else {
                document.body.classList.remove('no_click')
            }
        },
        logout () {
            this.loader(true)
            let token = this.$cookies.get('70hokccms3hhhn5')
            this.$axios.post('api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                this.$cookies.remove('70hokccms3hhhn5')
                this.$store.state.isAuth = false
                this.loader(false)
                location.href = '/login'
            }).catch(err => {
                console.log(err)
            })
        },
        validateToken () {
            return new Promise((resolve, reject) => {
                let token = this.$cookies.get('70hokccms3hhhn5')
                if (token != null || token != undefined) {
                    this.$axios.get('api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res => {
                        if (res.data != 0) {
                            this.$store.state.isAuth = true
                            this.$store.state.token = token
                            this.$store.state.user = res.data.user
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
