<template>
  <div id="app">
   
        <div class="container">
            <h1>products</h1>



            <select name="sortBy" id="select" v-model="sortBy">
                <option value="location">Subject</option>
                <option value="location">Location</option>
                <option value="price">price</option>

                <option value="space">Space</option>
            </select> 
            <button type="up" v-on:click="ascending = !ascending">Sort By
                <i v-if="ascending" class="glyphicon glyphicon-sort"></i>
                <i v-else class="glyphicon glyphicon-sort"></i>
            </button>
            <!-- <input type="text" @keyup="searchproduct" v-model="filter" placeholder="Search product" id="search-input"></input> -->
            <i class="fa fa-search"></i>
      

            <button type="button" v-on:click="showcheckout" :disabled="!cartItemCount">
                <span class="glyphicon glyphicon-shopping-cart">{{ cartItemCount }}</span> Checkout
            </button>
            <br>
            <br>
            <br>

        </div>
        <product-list :product="product" :getproduct="getproduct" ></product-list>

      
  </div>
</template>

<script>
import productList from "./components/productlist.vue"

export default {
  name: "App",
  data(){
    return{
      product: [],
        showproduct: true,
        ascending: true,
        sortBy: 'location',
        filter:"",
        cart: [],
    }
  },
  components: { "product-list":productList },
  methods:{
       searchproduct: async function () {
          
          console.log("hhhh")
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
            this.product = data;
        },

        additem() {
            // if (this.product[id].space > 0) {
            //     --this.product[id].space;


            //     this.cart.push(id);
            // }

        
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



  },    computed: {


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
    },

    mounted: function () {
        this. searchproduct();
    },   created() {
        this.searchproduct();
    },

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
