//my cart as empty array coz we will store the data that we push
let myCart = [];

//fetching all the requirments product/category
function GetProduct() {
  try {
    fetch("https://fakestoreapi.com/products")
      .then((repsonse) => repsonse.json())
      .then((data) => {
        const cards = document.getElementById("cards");
        data.forEach((product) => {
          cards.innerHTML += `
        <div class="col-lg-2 col-md-4 col-sm-12 col-xs-12 mb-2">

                    <div class="card pt-1 fast-card rounded-0">
                        <img src="${product.image}" class="card-img-top"
                            alt="${product.category}">
                        <div class="card-body">
                            <p class="fast-price">&#36;${product.price}</p>
                            <p class="fast-title">${product.title}</p>
                        </div>
                        <div class="fast-card-btn">
                            <a class="fast-buy" href="javascript:;" onclick="addItem('${product.id}')">Buy Now!</a>
                            <a class="fast-view" href="javascript:;" onclick="viewItem('${product.id}')">View Details</a>
                        </div>
                    </div>
                </div>
        `;
        });
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

// fetch all category
function GetCategory() {
  try {
    fetch(`https://fakestoreapi.com/products/categories`)
      .then((response) => response.json())
      .then((data) => {
        const c = document.getElementById("shop-category");
        data.forEach((category) => {
          c.innerHTML += `<li><a class="dropdown-item" onclick="viewCategory(&quot;${category}&quot;)" href="javascript:;">${category}</a></li>`;
        });
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

//functions for items
// In each case, the ID is used as a base for fetching data.

// function in adding the item from the api to empty object/array
function addItem(id) {
  try {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        
        const image = data.image;
        const title = data.title;
        const price = data.price;
        const description = data.description;
        const category = data.category;

        let newItem = {
          id: id,
          image: image,
          title: title,
          price: price,
          description: description,
          category: category,
          quantity: 1,
        };

        const findItem = myCart.find((item) => item.id === newItem.id);
        if (findItem) {
          findItem.quantity++;
        } else {
          myCart.push(newItem);
        }

        myCarts(myCart);
        let cartModal = new bootstrap.Modal(
          document.getElementById("cartModal")
        );
        cartModal.show();
      });
  } catch (error) {
    console.error("Error:", error);
  }
}

// function in viewing the product information using modal
function viewItem(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const viewItem = document.getElementById("viewItem");
      viewItem.innerHTML = `<div class="modal-body fast-product">
                        <div class="row justify-content-center">
                            <div class="col-lg-6 col-md-6 col-sm-12 text-center">
                                <img src="${data.image}" alt="" srcset="">
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <div class="price">$${data.price} only!</div>
                                <div class="title">
                                    ${data.title}
                                </div>
                                <div class="description">
                                    Description: <br>
                                    ${data.description}</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="ratings">
                            ${data.rating.rate}<span>/5.0 ~ ${data.rating.count}feedback/s</span>
                        </div>
                    </div>`;
      let productModal = new bootstrap.Modal(
        document.getElementById("productModal")
      );
      productModal.show();
    });
}

//function for myCart 
//view cart
function myCarts(myCart) {
  const cartItem = document.getElementById("cartItem");
  const countItem = document.getElementById("countItem");
  const totalItem = document.getElementById("totalItem");

  cartItem.innerHTML = "";

  if (myCart.length === 0) {
    cartItem.innerHTML = "<p>No Item added to cart</p>";
    countItem.innerHTML = "0";
  } else {
    let count = 0;
    let total = 0;

    myCart.forEach((obj) => {
      const itemtotal = obj.quantity * obj.price;
      total += itemtotal;

      count++;
      cartItem.innerHTML += `
      <tr class="align-middle">
        <td><img src="${obj.image}" alt="" srcset=""></td>
        <td>${obj.title}</td>
        <td>&#36;${obj.price}</td>
        <td>${obj.quantity}</td>
      </tr>`;
    });

    countItem.innerHTML = count;
    totalItem.innerHTML = "Total Amount: &#36;" + total.toFixed(2);
    // console.log(total);
  }
}

//function for Category
//viewCategory
function viewCategory(category){
  // console.log(id);
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((response) => response.json())
    .then((data) => {
      const cards = document.getElementById("cards");
      cards.innerHTML ='';
      
      data.forEach((product) => {
        cards.innerHTML += `
        <div class="col-lg-2 col-md-4 col-sm-12 col-xs-12 mb-2">

                    <div class="card pt-1 fast-card rounded-0">
                        <img src="${product.image}" class="card-img-top"
                            alt="${product.category}">
                        <div class="card-body">
                            <p class="fast-price">&#36;${product.price}</p>
                            <p class="fast-title">${product.title}</p>
                        </div>
                        <div class="fast-card-btn">
                            <a class="fast-buy" href="javascript:;" onclick="addItem('${product.id}')">Buy Now!</a>
                            <a class="fast-view" href="javascript:;" onclick="viewItem('${product.id}')">View Details</a>
                        </div>
                    </div>
                </div>
        `;
      });
    });
}

//About us button when click
const button = document.getElementById("about_us");
const author = document.getElementById("Author");

button.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("assets/json/aboutAuthor.json")
    .then((response) => response.json())
    .then((data) => {
      author.innerHTML = `
        <div class="row">
          <div class="col-lg-6 col-md-12 col-sm-12 fast-profile">
            <img src="${data.Profile}" alt="${data.Name}">
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12 fast-desc">
            <p style="text-align: justify;">${data.Message}
              <br>
              <br>
              Sincerely,<br>
              ${data.Name}
            </p>
          </div>
        </div>
      `;
    })
});

GetCategory();
GetProduct();
myCarts(myCart);