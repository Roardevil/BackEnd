let app = new Vue({
    el: "#vueapp",
    data: {
        product: [],
        showproduct: true,
        ascending: true,
        sortBy: 'location',

        messageCheckout: "",
        searchValue: '',
        order: {
            name: "",
            Phonenumber: "",
        },






        cart: [],






    },
    methods: {
        async submitform() {

            const submitform = []
            for (let j = 0; j < this.product.length; j++) {
                if (this.cartCount(this.product[j].id) > 0)
                    submitform.push({ name: this.order.name, Phonenumber: this.order.Phonenumber, productId: this.product[j].id, space: this.cartCount(this.product[j].id) })
            }
            console.log(submitform);


            const response = await fetch('/collection/orderinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitform)
            })
            console.log(await response.text())


            this.messageCheckout = "Order Placed";
            console.log("sucess")




        },





        additem(id) {
            if (this.product[id].space > 0) {
                --this.product[id].space;


                this.cart.push(id);
            }

            fetch('https://deepwebapp.herokuapp.com/collection/products' + this.product[Space]._id, {

                method: 'PUT', //Set the HTTP method as 'PUT'

                headers: {

                    'Content-Type': 'application/json', //Set the data type as JSON

                },

                body: JSON.stringify({ "space": this.counter(product) }), //Need to stringify the JSON object

            }) //chnage

                .then(response => response.json())

                .then(responseJSON => {

                    console.log('Success:', responseJSON);  //Retuns the message of success.

                });
        },
        isdisable(cet) {
            return this.product[cet].space === 0;

        },


        showcheckout() {
            this.showproduct = this.showproduct ? false : true;
        },
        canaddtocart(aproduct) {
            console.log("iuhiyheiuh   " + this.products[aproduct].space + "yuguyguy  " + aproduct);

            return this.product[aproduct].space > 4;
        },
        cartCount(id) {
            let count = 0;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },




        removeButton(index) {
            this.product[index].space++;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] == index) {
                    this.cart.splice(i, 1);
                    break;

                }
            }
        },








    },
    computed: {


        cartItemCount() {
            return this.cart.length || '';
        },

        formisvalid: function () {
            if (this.order.name.match(/[A-Za-z]/) && this.order.Phonenumber.match(/[0-9]/) && this.order.Phonenumber.length >= 10) {

                return false;
            }
            else
                return true;

        },

        getproduct() {

            let searchproduct = this.product

            // Process search input
            if (this.searchValue != '' && this.searchValue) {
                searchproduct = searchproduct.filter((product) => {
                    return product.subject
                        .toLowerCase()
                        .includes(this.searchValue.toLowerCase())
                })
            }



            // Sort by alphabetical order
            searchproduct = searchproduct.sort((a, b) => {
                if (this.sortBy == 'location') {
                    let fa = a.location.toLowerCase(), fb = b.location.toLowerCase()

                    if (fa < fb) {
                        return -1
                    }
                    if (fa > fb) {
                        return 1
                    }
                    return 0


                } else if (this.sortBy == 'price') {
                    return a.price - b.price
                }


                else if (this.sortBy == 'space') {
                    return a.space - b.space
                }
            })


            // Show sorted array in descending or ascending order
            if (!this.ascending) {
                searchproduct.reverse()
            }

            return searchproduct
        }
    },
    created: function () {
        // replace the URL to your Heroku app and route
        fetch('https://deepwebapp.herokuapp.com/collection/products').then(
            function (response) {
                response.json().then(
                    function (json) {
                        // note that we used 'store.product' instead of 'this.product'
                        app.product = json;
                    });
            })
    }
})
