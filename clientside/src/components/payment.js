import axios from "axios"
import { baseURL } from "../App"


 const loadScript = (src) =>{
    return new Promise((resolve)=>{
      const script=document.createElement("script")
      script.src=src

      script.onload=()=>{
          resolve(true)
      }

      script.onerror=()=>{
          resolve(false)
      }

      document.body.appendChild(script)
  })

  }

  export const displayRazorpay= async (productDetails, authToken)=>{
    console.log(productDetails)
    
    const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!res){
      alert("Youre are Offline, Failed to Load")
      return 
    }
    let totalAmount = 0;
    productDetails.forEach(product => {
      if(product.totalPrice){
        totalAmount += parseFloat(product.totalPrice);
      }
      else{
        totalAmount += parseFloat(product.price) * product.quantity;
        // console.log(product._id);
      }
      
  });
    console.log(totalAmount)
   const options={
            key: "rzp_test_cNqTIlnhNt3cjT",
            currency: "INR",
            amount: totalAmount * 100,
            name: "E-COM",
            description: "thanks for order",
            payment_capture: '1', // Auto-capture payment
            handler: async function(response) {
              alert(`Payment Successful with paymentId: ${response.razorpay_payment_id}`);
              try {

                if (!authToken) {
                  alert('User must be logged in to view cart details.');
                  return;
              }
                const orderResponse = await axios.post(`${baseURL}/order`, {
                  products: productDetails.map(product => ({
                    productId: product.totalPrice ? product.productId : product._id,
                    totalPrice: product.totalPrice ? product.totalPrice : parseFloat(product.price) * product.quantity,
                    paymentId: response.razorpay_payment_id
                }))
                }, {
                  headers: {
                    Authorization: `Bearer ${authToken}`
                  }
                });
                console.log("Order placed successfully:", orderResponse.data);
                try {
                  if (!authToken) {
                      alert('User must be logged in to view cart details.');
                      return;
                  }
                  // Clear cart after successful payment
                  await axios.post(
                    `${baseURL}/clearCart`,
                      {},
                      { headers: { Authorization: `Bearer ${authToken}` } }
                  );
                  console.log('Cart cleared after successful payment');
                  window.location.reload();
              } catch (error) {
                  console.error('Error clearing cart:', error);
              }
              } catch (error) {
                console.error("Error placing order:", error);
              }
          },
          prefill: {
            name: "E-COM"
        }
    }
    const paymentObject=new window.Razorpay(options)
        paymentObject.open()

}