var app = new Vue({
    el: "#vueapp",
    data: {
        lesson: [],
        showproduct: true,
        ascending: true,
        sortBy: 'location',


        searchValue: '',
        name: null,
        Phonenumber: null,



        cart: [],






    },
    methods: {
        productsFetch: async function () {
            const response = await fetch("https://deepwebapp.herokuapp.com/collection/products");
            const data = await response.json();
            this.product = data;
        },
        additem(id) {
            if (lesson[id].space > 0) {
                this.space = --lesson[id].space;


                this.cart.push(id);
            }
        },
        isdisable(cet) {
            return this.lesson[cet].space === 0;

        },


        showcheckout() {
            this.showproduct = this.showproduct ? false : true;
        },
        canaddtocart(alesson) {
            console.log("iuhiyheiuh   " + this.lesson[alesson].space + "yuguyguy  " + alesson);

            return this.lesson[alesson].space > 4;
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
            this.lesson[index].space++;
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

        getlesson() {

            let searchlesson = this.lesson

            // Process search input
            if (this.searchValue != '' && this.searchValue) {
                searchlesson = searchlesson.filter((lesson) => {
                    return lesson.subject
                        .toLowerCase()
                        .includes(this.searchValue.toLowerCase())
                })
            }



            // Sort by alphabetical order
            searchlesson = searchlesson.sort((a, b) => {
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
                searchlesson.reverse()
            }

            return searchlesson
        }
    },
    mounted: function () {
        this.productsFetch();
    }
})