import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    // if cart data is in database, you have to use async await
    const storedCart = getShoppingCart();
    const storedCartIds =Object.keys(storedCart)
    // just id gulo pabo ekta array hisebhe 
    console.log(storedCartIds)
    //console.log({storedCart}) //ei ta ekta buddi object diye data dekha 
    const loadedProducts = await fetch('http://localhost:5000/productByIds',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(storedCartIds)
        // go to backend 
    });
    const products = await loadedProducts.json();

    

    // now lets go to server and make an api 
    const savedCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    // if you need to send two things
    // return [products, savedCart]
    // another options
    // return { products, cart: savedCart }

    return savedCart;
}

export default cartProductsLoader;