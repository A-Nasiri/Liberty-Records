"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cartBtn = document.querySelector(".cart-btn");
var closeCartBtn = document.querySelector(".close-cart");
var clearCartBtn = document.querySelector(".clear-cart");
var cartDOM = document.querySelector(".cart");
var cartOverlay = document.querySelector(".cart-overlay");
var cartItems = document.querySelector(".cart-items");
var cartTotal = document.querySelector(".cart-total");
var cartContent = document.querySelector(".cart-content");
var productsDOM = document.querySelector(".products-center");
var menuBars = document.querySelector('.fa-bars');
var closeMenuBtn = document.querySelector('.close-menu');
var menu = document.querySelector('.menu');
var cart = [];
var buttonsDOM = []; // Getting the products

var Products =
/*#__PURE__*/
function () {
  function Products() {
    _classCallCheck(this, Products);
  }

  _createClass(Products, [{
    key: "getProducts",
    value: function () {
      var _getProducts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var result, data, products;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fetch("products.json");

              case 3:
                result = _context.sent;
                _context.next = 6;
                return result.json();

              case 6:
                data = _context.sent;
                products = data.items;
                products = products.map(function (item) {
                  var _item$fields = item.fields,
                      title = _item$fields.title,
                      price = _item$fields.price;
                  var id = item.sys.id;
                  var image = item.fields.image.fields.file.url;
                  return {
                    title: title,
                    price: price,
                    id: id,
                    image: image
                  };
                });
                return _context.abrupt("return", products);

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12]]);
      }));

      function getProducts() {
        return _getProducts.apply(this, arguments);
      }

      return getProducts;
    }()
  }]);

  return Products;
}(); // Display products


var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, [{
    key: "displayProducts",
    value: function displayProducts(products) {
      var result = "";
      products.forEach(function (product) {
        result += "\n            <article class=\"product\">\n          <div class=\"img-container\">\n            <img src=".concat(product.image, " alt=\"\" class=\"product-img\" />\n            <button class=\"bag-btn\" data-id=").concat(product.id, ">\n              <i class=\"fas fa-shopping-cart\"></i>Add to cart\n            </button>\n          </div>\n          <h3>").concat(product.title, "</h3>\n          <h4>$").concat(product.price, "</h4>\n        </article>\n            ");
      });
      productsDOM.innerHTML = result;
    }
  }, {
    key: "showMenu",
    value: function showMenu() {
      cartOverlay.classList.add("transparentBcg");
      menu.classList.add("showCart");
    }
  }, {
    key: "hideMenu",
    value: function hideMenu() {
      cartOverlay.classList.remove("transparentBcg");
      menu.classList.remove("showCart");
    }
  }, {
    key: "getBagButtons",
    value: function getBagButtons() {
      var _this = this;

      var buttons = _toConsumableArray(document.querySelectorAll(".bag-btn"));

      buttonsDOM = buttons;
      buttons.forEach(function (button) {
        var id = button.dataset.id;
        var inCart = cart.find(function (item) {
          return item.id === id;
        });

        if (inCart) {
          button.innerText = "Added To Cart";
          button.disabled = true;
        }

        button.addEventListener("click", function (ev) {
          ev.target.innerText = "Added To Cart";
          ev.target.disabled = true; // Get album from products

          var cartItem = _objectSpread({}, Storage.getProduct(id), {
            amount: 1
          }); // Add album to cart


          cart = [].concat(_toConsumableArray(cart), [cartItem]); // Save cart in local storage

          Storage.saveCart(cart); // Set cart values

          _this.setCartValues(cart); // Display cart item


          _this.addCartItem(cartItem); // Show cart when album added


          _this.showCart();
        });
      });
    }
  }, {
    key: "setCartValues",
    value: function setCartValues(cart) {
      var tempTotal = 0;
      var itemsTotal = 0;
      cart.map(function (item) {
        tempTotal += item.price * item.amount;
        itemsTotal += item.amount;
      });
      cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
      cartItems.innerText = itemsTotal;
    }
  }, {
    key: "addCartItem",
    value: function addCartItem(item) {
      var div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = "\n    <img src=".concat(item.image, " alt=\"\" />\n            <div>\n              <h4>").concat(item.title, "</h4>\n              <h5>$").concat(item.price, "</h5>\n              <span class=\"remove-item\" data-id=").concat(item.id, ">remove</span>\n            </div>\n            <div>\n              <i class=\"fas fa-chevron-up\" data-id=").concat(item.id, "></i>\n              <p class=\"item-amount\">").concat(item.amount, "</p>\n              <i class=\"fas fa-chevron-down\" data-id=").concat(item.id, "></i>\n            </div>\n    ");
      cartContent.appendChild(div);
    }
  }, {
    key: "showCart",
    value: function showCart() {
      cartOverlay.classList.add("transparentBcg");
      cartDOM.classList.add("showCart");
    }
  }, {
    key: "setupAPP",
    value: function setupAPP() {
      cart = Storage.getCart();
      this.setCartValues(cart);
      this.populateCart(cart);
      cartBtn.addEventListener("click", this.showCart);
      closeCartBtn.addEventListener("click", this.hideCart);
      menuBars.addEventListener('click', this.showMenu);
      closeMenuBtn.addEventListener('click', this.hideMenu);
    }
  }, {
    key: "populateCart",
    value: function populateCart(cart) {
      var _this2 = this;

      cart.forEach(function (item) {
        return _this2.addCartItem(item);
      });
    }
  }, {
    key: "hideCart",
    value: function hideCart() {
      cartOverlay.classList.remove("transparentBcg");
      cartDOM.classList.remove("showCart");
    }
  }, {
    key: "cartLogic",
    value: function cartLogic() {
      var _this3 = this;

      clearCartBtn.addEventListener("click", function () {
        _this3.clearCart();
      });
      cartContent.addEventListener("click", function (ev) {
        if (ev.target.classList.contains("remove-item")) {
          var removeItem = ev.target;
          var id = removeItem.dataset.id;
          cartContent.removeChild(removeItem.parentElement.parentElement);

          _this3.removeItem(id);
        } else if (ev.target.classList.contains("fa-chevron-up")) {
          var addAmount = ev.target;
          var _id = addAmount.dataset.id;
          var tempItem = cart.find(function (item) {
            return item.id === _id;
          });
          tempItem.amount += 1;
          Storage.saveCart(cart);

          _this3.setCartValues(cart);

          addAmount.nextElementSibling.innerText = tempItem.amount;
        } else if (ev.target.classList.contains("fa-chevron-down")) {
          var lowerAmount = ev.target;
          var _id2 = lowerAmount.dataset.id;

          var _tempItem = cart.find(function (item) {
            return item.id === _id2;
          });

          _tempItem.amount -= 1;

          if (_tempItem.amount > 0) {
            Storage.saveCart(cart);

            _this3.setCartValues(cart);

            lowerAmount.previousElementSibling.innerText = _tempItem.amount;
          } else {
            cartContent.removeChild(lowerAmount.parentElement.parentElement);

            _this3.removeItem(_id2);
          }
        }
      });
    }
  }, {
    key: "clearCart",
    value: function clearCart() {
      var _this4 = this;

      var cartItems = cart.map(function (item) {
        return item.id;
      });
      cartItems.forEach(function (id) {
        return _this4.removeItem(id);
      });

      while (cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);
      }

      this.hideCart();
    }
  }, {
    key: "removeItem",
    value: function removeItem(id) {
      cart = cart.filter(function (item) {
        return item.id !== id;
      });
      this.setCartValues(cart);
      Storage.saveCart(cart);
      var button = this.getSingleButton(id);
      button.disabled = false;
      button.innerHTML = "<i class='fas fa-shopping-cart'></i>Add To Cart";
    }
  }, {
    key: "getSingleButton",
    value: function getSingleButton(id) {
      return buttonsDOM.find(function (button) {
        return button.dataset.id === id;
      });
    }
  }]);

  return UI;
}(); // Local Storage


var Storage =
/*#__PURE__*/
function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, null, [{
    key: "saveProducts",
    value: function saveProducts(products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, {
    key: "getProduct",
    value: function getProduct(id) {
      var products = JSON.parse(localStorage.getItem("products"));
      return products.find(function (product) {
        return product.id === id;
      });
    }
  }, {
    key: "saveCart",
    value: function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, {
    key: "getCart",
    value: function getCart() {
      return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    }
  }]);

  return Storage;
}();

document.addEventListener("DOMContentLoaded", function () {
  var ui = new UI();
  var products = new Products(); // setupAPP

  ui.setupAPP();
  products.getProducts().then(function (products) {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  }).then(function () {
    ui.getBagButtons();
    ui.cartLogic();
  });
});