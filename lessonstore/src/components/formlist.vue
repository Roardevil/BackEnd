<template>
  <div>
    <h1>School club checkout</h1>
    <h4>
      <strong>Enter Your Information</strong>
    </h4>
    <div v-for="(products, index) in getproduct" :key="index">
      <div v-if="cartCount(index) > 0">
        <img v-bind:src="products.image" height="200" width="300" />
        <p>subject: {{ products.subject }}</p>
        <!--Get data from object using v-text-->
        <p>Location: {{ products.location }}</p>
        <!--Get data from object-->
        <p>Price: {{ products.price }}</p>
        <!--Get data from object-->
        <p>space: {{ cartCount(index) }}</p>
        <!--Get data from object-->

        <button class="btn btn-success" v-on:click="removeButton(index)">
          Remove
        </button>

        <form @submit.prevent="submitform">
          <h2>Checkout</h2>
          <p>
            <strong>Name:</strong>
            <!-- This input field is bound to 'firstName' in the 'order' object -->
            <input v-model="order.name" />
          </p>
          <p>
            <strong>Phonenumber:</strong>
            <!-- This input field is bound to 'lastName' in the 'order' object -->
            <input v-model="order.Phonenumber" />
          </p>

          <h2>Order Information</h2>
          <p>Name: {{ order.name }}</p>
          <p>Phonenumber: {{ order.Phonenumber }}</p>
          <button class="btn btn-success" :disabled="formisvalid">
            submit
          </button>
          <p>{{ messageCheckout }}</p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "formList",
  props: ["product", "getproduct", "cartCount"],
  data() {
    return {
      order: {
        name: "",
        Phonenumber: "",
      },

      messageCheckout: "",
    };
  },
  methods: {
    async submitform() {
      const submitform = [];
      for (let j = 0; j < this.product.length; j++) {
        if (this.cartCount(this.product[j].id) > 0)
          submitform.push({
            name: this.order.name,
            Phonenumber: this.order.Phonenumber,
            productId: this.product[j].id,
            space: this.cartCount(this.product[j].id),
          });
      }
      console.log(submitform);

      const response = await fetch(
        "https://deepwebapp.herokuapp.com/collection/orderinfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitform),
        }
      );
      console.log(await response.text());

      this.messageCheckout = "Order Placed";
      console.log("sucess");
    },
      showcheckout() {
    this.showproduct = this.showproduct ? false : true;
  },

  removeButton(index) {
    this.$emit("removeButton", index);
  }
  },


  computed: {
    formisvalid: function () {
      if (
        this.order.name.match(/[A-Za-z]/) &&
        this.order.Phonenumber.match(/[0-9]/) &&
        this.order.Phonenumber.length >= 10
      ) {
        return false;
      } else return true;
    },
  },
};
</script>