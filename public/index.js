let app = new Vue({
    el: "#vueapp",
    data: {
        product: [],
        showproduct: true,
        ascending: true,
        sortBy: 'location',
        messageCheckout: "",
        filter:"",

        order: {
            name: "",
            Phonenumber: "",
        },

        cart: [],


        components: {
            Keypress: () => import('vue-keypress')
          }



    },
    methods: {
        searchproduct: async function () {
            let response ;
            if(this.filter!="") {
                this.product=null;
           response =  await fetch("https://deepwebapp.herokuapp.com/collection/products/"+this.filter);
            }
            else{
            response = await fetch("https://deepwebapp.herokuapp.com/collection/products");
            }

            const data = await response.json();
            console.log(data);
            app.product = data;
        },

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
            if(response=="OK"){
                for (let i = 0; i < updateStock.length; i++) {
                    let id=updateStock[i]._id;
                    delete updateStock[i]._id;
                    let check=await this.fetchFunction(updateStock[i], "PUT","https://vueproject99.herokuapp.com/collection/products/"+id);
                    console.log(check);
                }
            }

            
            console.log(response);


            this.messageCheckout = "Order Placed";

        },
        fetchFunction: async function (data, type,api) {
            const response = await fetch(api, {
                method: type, //JSON
                headers: {
                    'Content-Type': 'application/json'
                },
                body: (JSON.stringify(data))//Sending object for if statement
            });
            return await response.text();//Receiving response
        },
            



        },





        additem(id, space) {
            if (this.product[id].space > 0) {
                --this.product[id].space;


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




        removeButton(index) {
            this.product[index].space++;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] == index) {
                    this.cart.splice(i, 1);
                    break;

                }
            }
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





            return searchproduct
        }
    ,

    mounted: function () {
        this. searchproduct();
    }

    }
})
