<template>
<div>
  {{"nujhuhuhu"}}
<div v-for="(product,count) in getproduct" :key="count">
                <img v-bind:src="product.image" height="200" width="300">
                <p>subject: {{ product.subject}}</p>
                <!--Get data from object using v-text-->
                <p>Location: {{ product.location }}</p>
                <!--Get data from object-->
                <p>Price: {{ product.price }}</p>
                <!--Get data from object-->
                <p>space: {{ product.space }}</p>
                <!--Get data from object-->



                <button class="btn btn-success" v-on:click="additem(count)" :disabled="product.stock == 0 ? true : false">Add
                    to cart</button>

                <span v-if="product.space === 0">All Out!
                </span>
                <span v-else-if="product.space <5">
                    Only {{product.space}} left
                </span>
                <span v-else>Buy Now!
                </span>


            </div>
</div>
            

</template>
<script>
export default {

    name:"productList",
    props:["getproduct"],
    data(){

    }
  
}
</script>