<template>
    
</template>
<script>
export default {
  name:"formlist",
  methods:{
      
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
  }
}
</script>