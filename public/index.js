var app = new Vue({
    el: "#vueapp",
    data: {
        product: [],
        showproduct: true,
        ascending: true,
        sortBy: 'location',


        searchValue: '',
        name: null,
        Phonenumber: null,



        cart: [],






    },
    methods: {

        additem(id) {
            if (product[id].space > 0) {
                this.space = --product[id].space;


                this.cart.push(id);
            }
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


        submitForm() {
            alert('Submitted');
        },
        submitform() {

            if (this.formisvalid) {
                console.log("sucess")

            }
            else {
                console.log("failed")

            }

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
        nameisvalid() {
            return typeof this.name === 'text' && this.name.length < 3

        },
        Phonenumberisvalid() {
            return typeof this.Phonenumber === 'number' && this.Phonenumber.length >= 10;
        },
        formisvalid: function () {
            return this.nameisvalid && this.Phonenumberisvalid;

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
