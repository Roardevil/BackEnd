let app = new Vue({
    el: "#vueapp",
    data: {
        products: {},
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
        searchproducts: async function () {
            if (this.filter != "") {
                this.products = null;
                response = await fetch("https://deepwebapp.herokuapp.com/collection/productss" + this.filter);

            }


        },
        async submitform() {

            const submitform = []
            for (let j = 0; j < this.products.length; j++) {
                if (this.cartCount(this.products[j].id) > 0)
                    submitform.push({ name: this.order.name, Phonenumber: this.order.Phonenumber, productsId: this.products[j].id, space: this.cartCount(this.products[j].id) })
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





        additem(id, space) {
            if (this.products[id].space > 0) {
                --this.products[id].space;


                this.cart.push(id);
            }

            fetch('https://deepwebapp.herokuapp.com/collection/productss' + this.products[space].id, {

                method: 'PUT', //Set the HTTP method as 'PUT'

                headers: {

                    'Content-Type': 'application/json', //Set the data type as JSON

                },

                body: JSON.stringify({ "space": this.counter(products) }), //Need to stringify the JSON object

            }) //chnage

                .then(response => response.json())

                .then(responseJSON => {

                    console.log('Success:', responseJSON);  //Retuns the message of success.

                });
        },
        isdisable(cet) {
            return this.products[cet].space === 0;

        },


        showcheckout() {
            this.showproducts = this.showproducts ? false : true;
        },
        canaddtocart(aproducts) {
            console.log("iuhiyheiuh   " + this.productss[aproducts].space + "yuguyguy  " + aproducts);

            return this.products[aproducts].space > 4;
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
            this.products[index].space++;
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



        created: function () {
            // replace the URL to your Heroku app and route
            fetch('https://deepwebapp.herokuapp.com/collection/productss').then(
                function (response) {
                    response.json().then(
                        function (json) {
                            // note that we used 'store.products' instead of 'this.products'
                            app.products = json;
                        });
                })
        }
    }

})
