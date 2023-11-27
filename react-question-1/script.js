//* 1.
/**
There is an array, each item has such format:
{firstName: 'xxx', lastName: 'xxx', customerID: 'xxx', note: 'xxx',
profession: ‘xxx’}
lastName, note can be empty, customerID can only be a set of digital
numbers.
profession can only have ‘student’, ‘freelancer’, ‘productOwner’,
‘engineer’ or ‘systemAnalytics’.
**/

/**
Q1. Please follow the principle (‘firstName’ + ‘lastName’ + ‘customerID’)
to sort this array and print it out.
**/
function sortUserName(user) {
  return user.sort((a, b) => {
    const userAInfo = a.firstName + a.lastName + a.customerID;
    const userBInfo = b.firstName + b.lastName + b.customerID;

    return userAInfo < userBInfo ? -1 : 1;
  });
}

/**
 * /**
Q2. Please sort by ‘profession’ to follow the principle.
(‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ >
‘student’’)
**/
function sortByType(user) {
  const professionMap = {
    systemAnalytics: 0,
    engineer: 1,
    productOwner: 2,
    freelancer: 3,
    student: 4,
  };

  return user.sort((a, b) =>
    professionMap[a.profession] < professionMap[b.profession] ? -1 : 1
  );
}

//* 2.
/** HTML
<div class="container">
<div class="header">5/8 外出確認表</div>
<div class="content">
<ol class="shop-list">
<li class="item">麵包</li>
<li class="item">短袖衣服</li>
<li class="item">飲用水</li>
<li class="item">帳篷</li>
</ol>
<ul class="shop-list">
<li class="item">暈車藥</li>
<li class="item">感冒藥</li>
<li class="item">丹木斯</li>
<li class="item">咳嗽糖漿</li>
</ul>
</div>
<div class="footer">以上僅共參考</div>
</div>
**/

/** CSS
.container {
font-size: 14px;
}
.container .header {
font-size: 18px;
}
.container .shop-list {
list-style: none;
margin-left: -15px;
}
.container .shop-list li.item {
color: green;
}
.container .shop-list .item {
/* Explain why does this color not works, and how to fix make it work on
1st list */
// color: blue;
// }

//! Ans:
// This doesn't work because the calculated specificity is lower than `.container .shop-list li.item`, so it will be overwritten by it.
// To make this work, change the code to:

// .container ol.shop-list .item {
//   color: blue
// }

// This selector has the same specifity as `.container .shop-list li.item`. But because it appears later in the file, browser will apply this rule.

/* Write styling make every other line give background color to next one */
//?
//! Ans
// .container div + div {
//   background-color: #006edc;
// }

//* 3.
/**
let items = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1,
3, 2, 6, 7, 5, 4, 4, 7, 8, 8, 0, 1, 2, 3, 1];
Please write down a function to console log unique value from this array.
**/

function getUniqueNumber(items) {
  const map = {};

  items.forEach((item) => {
    map[item] ||= 0;
    map[item] += 1;
  });

  Object.entries(map).forEach(([key, value]) => {
    value === 1 && console.log(key);
  });
}

//* 4.
/** Can you explain about Interface and Enum, and where will you be using,
please make some examples. **/

//! 1.
//Interface is normally used for defining the structure and the type of each value of an object
//Let's take the user data in Q1 as an example.
//If we want to create an object containing user data, we can define an interface like this:
// interface User {
//   firstName: string;
//   lastName: string;
//   customerID: number;
//   note: string;
//   profession: string;
// }

// Then, we can simply create an object containing the right data:
// const user1:User = {
//   firstName: 'Mary',
//   lastName: 'Lu',
//   customerID: 1,
//   note: 'some note',
//   profession: 'student',
// }

// If the type of value is not the same as we defined in the `User` interface, typescript compiler will warn us.

//! 2.
//Enum is for defining a group of unchangeable constants
//for example, if we want to constraint the professions into following options: ‘student’, ‘freelancer’, ‘productOwner’,engineer’ or ‘systemAnalytics’
// then we can define an enum like this:

// enum PROFESSION {
//   STUDENT = "student",
//   FREELANCER = "freelancer",
//   PRODUCT_OWNER = "product owner",
//   ENGINEER = "engineer",
//   SYSTEM_ANALYTICS = "systemAnalytics"
// }

// We can then access the professions without concerning about typo.
// For example, we can use the enum when creating user data:
// const user2.profession = PROFESSION.STUDENT;

// We can also refine the `User` interface above like this to confine the type of `profession` data:
// interface User {
//   firstName: string;
//   lastName: string;
//   customerID: number;
//   note: string;
//   profession: PROFESSION;
// }

//* 5.
/** Can you explain the problem with the following code, and how to fix
it. **/
class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleAddCount = this.handleAddCount.bind(this);
  }
  handleAddCount() {
    //! Ans:
    // These state updates do not update state based on the previous state.
    // This is because state update is not synchronized.
    // Instead, when `setState` is called, React will push it into a queue.
    // The updates will then be grouped together (i.e. batching), which means these 3 updates might all updating the same old `count` state
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });

    //! TO FIX THIS:
    // Use function to update state based on previous state
    this.setState((prev) => ({ count: prev.state.count + 1 }));
  }
  render() {
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={this.handleAddCount}>Add</button>
      </div>
    );
  }
}
ReactDOM.render(<Count />, document.getElementById("root"));

//* 6.
/** Please write the sample code to debounce handleOnChange **/
var SearchBox = React.createClass({
  debounceTimer: null,

  render: function () {
    return <input type="search" name="p" onChange={this.handleOnChange} />;
  },
  handleOnChange: function (event) {
    clearTimeout(debounceTimer);

    this.debounceTimer = setTimeout(() => {
      // make ajax call
    }, 500);
  },
});
