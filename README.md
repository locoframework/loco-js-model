![logo](https://raw.githubusercontent.com/artofcodelabs/artofcodelabs.github.io/master/assets/ext/loco_logo_trans_sqr-300px.png)

> A missing model layer for modern JavaScript

# 🧐 What is Loco-JS-Model?

**Loco-JS-Model** is one of the [Loco framework](http://locoframework.org) components. It is a model layer for JavaScript that can be used separately.  
Loco framework is a concept that simplifies communication between front-end and back-end. The back-end part can be implemented in other languages and frameworks as well.
I am a Rails programmer. That's why I created **Loco** for [**Rails**](https://github.com/locoframework/loco-rails).

*Visualization of the Loco framework:*

```
Loco Framework
|
|--- Loco-Rails (back-end part)
|       |
|       |--- Loco-Rails-Core (logical structure for JS / can be used separately with Loco-JS-Core)
|
|--- Loco-JS (front-end part)
        |
        |--- Loco-JS-Core (logical structure for JS / can be used separately)
        |
        |--- Loco-JS-Model (model part / can be used separately)
        |
        |--- other built-in parts of Loco-JS

        Loco-JS-UI - connects models with UI elements (a separate library)
```

Loco-JS-Model works well as a part of the modern JavaScript ecosystem alongside libraries such as React and Redux.

This 🎁[**example**](https://github.com/artofcodelabs/front-end-boilerplate)🎁 presents how to combine Loco-JS-Model with React and Redux _(+ other neat tools)_.  
This repo is also a good starting point if you want to start hack on a multi-static-page app powered by React, Redux, React, React-Router, Webpack, Babel, etc.  
Especially if you are looking for something pre-configured and more straightforward than [Create React App](https://github.com/facebook/create-react-app).

# 📡 Model Layer

I liked [ActiveRecord](http://guides.rubyonrails.org/active_record_basics.html) throughout the years of using Rails. This layer stands between the business logic of your app and a database and does a lot of useful things. One of them is providing validations of objects to ensure that only valid ones are saved in a database. It also provides several finder methods to perform certain queries on a database without writing raw SQL.

## But what does model mean when it comes to an app working inside the browser? 🤔

Well, you have at least 2 ways to persist your data:

1. You can save them in local storage.
2. You can send them to a server using the API endpoint. Data are then stored in a database.

So we can assume that validating data before they reach the destination can be useful in both cases.  
But when it comes to persistence - Loco-JS-Model gravitates towards communication with a server. It provides methods that facilitate both: persisting data and fetching them from a server.

# 📥 Installation

```bash
$ npm install --save loco-js-model
```

# 🤝 Dependencies

🎊 Loco-JS-Model has no dependencies. 🎉

Although [babel-plugin-transform-class-properties](https://babeljs.io/docs/en/babel-plugin-transform-class-properties) may be helpful to support static class properties, which are useful in defining models.

Loco-JS-Model uses Promises, so remember to **polyfill** them❗️

# ⚙️ Configuration

```javascript
import { Config } from "loco-js-model";

// If provided - Loco-JS uses an absolute path instead of a site-root-relative path in all XHR requests
Config.protocolWithHost = "http://localhost:3000";

Config.locale = "pl";   // "en" by default

// Models have a static class property - "resources". It is used to specify base URLs (scopes)  
// from which data are retrieved. This property sets a default scope for all models.
Config.scope = "admin"; // null by default
```

# 🎮 Usage

## Anatomy of the model 💀

An exemplary model can look like this:

```javascript
// models/Coupon.js

import { Models } from "loco-js-model";

class Coupon extends Models.Base {
  // The value of this property should be a "stringified" class name.
  // Setting this property is required if you use a full Loco framework 
  // and send notifications from the server.
  // It is because finding this class by its name is impossible in a production
  // environment due to minification.
  static identity = "Coupon";

  // You can fetch the same type of resource from different API endpoints.
  // These endpoints can be defined using resources property.
  static resources = {
    url: "/user/coupons",
    admin: {
      url: "/admin/plans/:planId/coupons",
      paginate: { per: 100, param: "current-page" }
    }
  };

  // This property stores information about the model's attributes
  static attributes = {
    stripeId: {
      // Specify if different than the value returned via API
      remoteName: "stripe_id",
      // When assigning values from API endpoint,
      // Loco-JS-Model may convert them to certain types.
      // Available: Date, Integer, Float, Boolean, Number, String
      type: "String",
      // Available validators: Absence, Confirmation, Exclusion,
      // Format, Inclusion, Length, Numericality, Presence, Size
      validations: {
        presence: true,
        format: {
          with: /^my-project-([0-9a-z-]+)$/
        }
      }
    },
    percentOff: {
      remoteName: "percent_off",
      type: "Integer",
      validations: {
        // a validator can run conditionally
        presence: { if: o => o.amountOff == null },
        numericality: {
          greater_than_or_equal_to: 0,
          less_than_or_equal_to: 100
        }
      }
    },
    amountOff: {
      remoteName: "amount_off",
      type: "Decimal",
      validations: {
        presence: { if: o => o.percentOff == null },
        numericality: {
          greater_than_or_equal_to: 0
        }
      }
    },
    duration: {
      type: "String",
      validations: {
        presence: true,
        inclusion: {
          in: ["forever", "once", "repeating"]
        }
      }
    },
    redeemBy: {
      remoteName: "redeem_by",
      type: "Date"
    }
  };

  // It contains names of custom validation methods
  static validate = ["futureRedeemBy"];

  constructor(data = {}) {
    super(data);
  }

  // This custom method is called when the user changes the value of the field in a React component
  setAttribute(name, val) {
    // This Loco-JS-Model's method converts to a given type defined in attributes property
    this.assignAttr(name, val);
  }

  futureRedeemBy() {
    if (this.redeemBy === null) return;
    if (this.redeemBy <= new Date()) {
      this.addErrorMessage("should be in the future", { for: "redeemBy" });
    }
  }
}

export default Coupon;
```

## Fetching a collection of resources 👨‍👩‍👧‍👦

### Specifying a scope 🔎

You can fetch resources from a given scope in 3 ways:

* by specifying a scope as `resource` in method calls e.g. `Coupon.get("all", {resource: "admin"})`
* setting up default scope at the configuration stage _(see Configuration)_
* if you use **Loco-JS** you can set scope by calling `setScope("<scope name>")` controller's instance method. It's done in a namespace controller most often.

### Response formats 𝌮

Loco-JS-Model can handle responses in 2 JSON formats.

#### 1. an array of resources

```json
[
  {
    "id":101,
    "stripe_id":"my-project-20-dollar-off",
    "amount_off":20,
    "currency":"USD",
    "duration":"once",
    "percent_off":null,
    "redeem_by":null,
    "created_at":"2017-12-19T14:42:18.000Z",
    "updated_at":"2017-12-19T14:42:18.000Z"
  },
  ...
]
```

To fetch all resources, you have to specify a total number of records by using _total_ or _count_ keys.

```javascript
Coupon.get("all", {resource: "admin", planId: 6, total: 603}).then(coupons => {});
// GET "/admin/plans/6/coupons?current-page=1"
// GET "/admin/plans/6/coupons?current-page=2"
// GET "/admin/plans/6/coupons?current-page=3"
// ...
```

#### 2. with _resources_ and _count_ keys

```json
{
  "resources": [
    {
      "id":101,
      "stripe_id":"my-project-20-dollar-off",
      "amount_off":20,
      "currency":"USD",
      "duration":"once",
      "percent_off":null,
      "redeem_by":null,
      "created_at":"2017-12-19T14:42:18.000Z",
      "updated_at":"2017-12-19T14:42:18.000Z"
    },
    ...
  ],
  "count": 603
}
```

To fetch all resources, you don't have to specify a total number of records in this case, because API does it already.

```javascript
Coupon.get("all", {resource: "admin", planId: 6}).then(res => {
  res.resources; // all instances of Coupon
  res.count; // total number of coupons
});
// GET "/admin/plans/6/coupons?current-page=1"
// GET "/admin/plans/6/coupons?current-page=2"
// ...
```

### Fetching resources from other API endpoints

Just pass the name of the endpoint instead of _"all"_.
This example also contains how to pass **additional parameters** to the request.

```javascript
Coupon.get("used", {total: 211, foo: "bar", baz: 13}).then(coupons => {});
// GET "/user/coupons/used?foo=bar&baz=13&page=1"
// GET "/user/coupons/used?foo=bar&baz=13&page=2"
// ...
```

### Fetching a specific page

Just pass a `page` param.

```javascript
Coupon.get("recent", {
  resource: "admin",
  planId: 6,
  total: 414,
  page: 4,
  foo: 10
}).then(coupons => {});
// GET "/admin/plans/6/coupons/recent?page=4&foo=10&current-page=4"
```

## Fetching a single resource 💃

Loco-JS-Model provides `find` static method for fetching a single resource. The server's response should be in a plain JSON format with remote names of attributes as keys.

```javascript
Coupon.find(25).then(coupon => {});
// GET "/user/coupons/25"

// or pass an object

Coupon.find({id: 25}).then(coupon => {});
// GET "/user/coupons/25"

// You can also specify a resource and pass additional params

Coupon.find({id: 25, resource: "admin", planId: 8, foo: 12, bar: "baz"}).then(coupon => {});
// GET "/admin/plans/8/coupons/25?foo=12&bar=baz"
```

## Sending requests 🏹

Every model inherits from `Models.Base` static and instance methods for sending `get` `post` `put` `patch` `delete` requests to the server.

```javascript
Coupon.patch("used", {resource: "admin", planId: 9, ids: [1,2,3,4]}).then(resp => {});
// PATCH "/admin/plans/9/coupons/used"
// Parameters: {"ids"=>[1, 2, 3, 4], "current-page"=>1, "plan_id"=>"9"}

Coupon.find({id: 25, resource: "admin", planId: 8}).then(coupon => {
  coupon.planId = 8; // set planId explicitly if API does not return it
  coupon.patch("use", {foo: "bar", baz: 102}).then(resp => {});
  // PATCH "/admin/plans/8/coupons/25/use"
  // Parameters: {"foo"=>"bar", "baz"=>102, "plan_id"=>"8", "id"=>"25"}
});
```

## Validations ✅

If attributes' validations are specified, you can use the `isValid` / `isInvalid` methods to check whether the model instance is valid or not.

```javascript
const coupon = new Coupon;
coupon.isValid();   // false
coupon.isInvalid(); // true
coupon.errors; // {
               //   stripeId: ["can't be blank", "is not included in the list"],
               //   duration: ["can't be blank", "is invalid"]
               // }
```

Loco-JS-Model implements almost all built-in [Rails](http://guides.rubyonrails.org/active_record_validations.html) validators, except for _uniqueness_. And you can use them nearly identically.
You can also look at [source code](https://github.com/locoframework/loco-js-model/tree/master/src/validators) if you are looking for all available configuration options. They are pretty straightforward to decipher.

## Saving ✍️

Loco-JS-Model provides the `save` method that facilitates persisting resources on the server. This method requires responses in a specific JSON format. I recommend using the format below. But if you don't plan to use `UI.Form` from **Loco-JS-UI** for handling forms, the only requirement is a specified format of the **errors** key to having errors assigned to the object.

```javascript
const coupon = new Coupon({
  resource: "admin",
  planId: 19,
  percentOff: 50
});
coupon.save().then(resp => {
// POST "/admin/plans/19/coupons"
// Parameters: { "coupon" => { "stripe_id"=>nil, "percent_off"=>50, "amount_off"=>nil,
//                             "duration"=>nil, "redeem_by"=>nil
//                           },
//               "plan_id" => "19"
//             }
  resp; // { success: false,
        //   status: 400,
        //   errors: {
        //     stripe_id: ["can't be blank", "is invalid"],
        //     duration: ["can't be blank", "is not included in the list"]
        //   }
        // }
  coupon.errors; // { stripeId: ["can't be blank", "is not included in the list"],
                 //   duration: ["can't be blank", "is invalid"]
                 // }
});
```

## Reloading ♻️

Loco-JS-Model provides a convenient method for reloading an object. The following example is quite self-explanatory.

```javascript
Coupon.find({id: 25, resource: "admin", planId: 8}).then(coupon => {
// GET "/admin/plans/8/coupons/25"
  coupon.planId = 8; // set planId explicitly if API does not return it
  coupon; // Coupon { ... id: 25, duration: "once", percentOff: 30 }

  // change percent_off and duration on the server and after some time ...

  setTimeout(() => {
    coupon.reload().then(coupon => {
    // GET "/admin/plans/8/coupons/25"
      coupon; // Coupon { ... id: 25, duration: "forever", percentOff: 50 }
    });
  }, 5000);
});
```

## 💥 Dirty object 🧙🏽‍♂️

This feature looks like a pure magic when you look at how this works for the first time.

_Dirty object_ is an ability of model instances to express how attribute values have been changed between 2 moments in time - when an object was initialized and their current value on the server.

It is especially useful when you use `Connectivity` features from Loco-JS.

Just look at the example below and bare in mind the order of things 💥

```javascript
// IN THE 1ST ORDER
Coupon.find({id: 25, resource: "admin", planId: 8}).then(coupon => {
  coupon; // Coupon { ... id: 25, duration: "once", percentOff: 30 }

  // IN THE 3RD ORDER
  setTimeout(() => {
    coupon.changes(); // { percentOff: { is: "forever", was: "once" },
                      //   duration: { is: 50, was: 30 }
                      // }
    coupon.applyChanges();
    coupon; // Coupon { ... id: 25, duration: "forever", percentOff: 50 }
  }, 6000);
});

// change percent_off and duration on the server and after some time ...

// IN THE 2ND ORDER
setTimeout(() => {
  Coupon.find({id: 25, resource: "admin", planId: 8}).then(coupon => {
    coupon; // Coupon { ... id: 25, duration: "forever", percentOff: 50 }
  });
}, 3000);

```

# 🇵🇱 i18n

Loco-JS-Model supports internationalization. Following example shows how to display errors in a different language.

First, create a translation of the [base English file](https://github.com/locoframework/loco-js-model/blob/master/src/locales/en.coffee).

```javascript
// locales/pl.js

const pl = {
  variants: {},
  attributes: {},
  errors: {
    messages: {
      blank: "nie może być puste",
      inclusion: "nie jest na liście dopuszczalnych wartości",
      invalid: "jest nieprawidłowe",
      // ...
    }
  }
};

export default pl;
```

Loco-JS-Model must have all translations assigned to `I18n` object.

```javascript
import { Config, I18n } from "loco-js-model";

import pl from "locales/pl";

// remember to polyfill Object.assign or assign it in a different way
Object.assign(I18n, {
  pl
});

Config.locale = "pl";
```

```javascript
const coupon = new Coupon({ percentOff: 50 });
coupon.isValid(); // false
coupon.errors; // { duration: ["nie może być puste", "nie jest na liście dopuszczalnych wartości"]
               //   stripeId: ["nie może być puste", "jest nieprawidłowe"]
               // }
```

# 👩🏽‍🔬 Tests

```bash
npm run test
```

Like it's been said at the beginning, Loco-JS-Model has been extracted from Loco-JS. And Loco-JS is a front-end part of the whole Loco framework along with Loco-Rails.
Both Loco-JS and Loco-Rails are pretty well tested. And because they work in cooperation with each other, they must be tested as one library (Loco-Rails has a suite of integration / _"end to end"_ tests).

So every change made to Loco-JS-Model must be tested with Loco-JS' unit tests and then together as Loco framework it must be tested against Loco-Rails' integration test suite.

# 📈 Changelog

## Major releases 🎙

### 0.3.1

* 🎉 officially announced version 🎉

Informations about all releases are published on [Twitter](https://twitter.com/artofcode_co)

# 📜 License

Loco-JS-Model is released under the [MIT License](https://opensource.org/licenses/MIT).

# 👨‍🏭 Author

Zbigniew Humeniuk from [Art of Code](http://artofcode.co)