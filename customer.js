async function placeOrder(order) {
    const response = await fetch("https://your-backend-api.com/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (response.ok) {
      console.log("Order placed successfully!");
    }
  }
  