let user = {
  firstName: "John",
  lastName: "Smith",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  }
};

console.log(user.fullName); // John Smith (gọi getter)

user.fullName = "Alice Cooper"; // gọi setter
console.log(user.firstName); // Alice
console.log(user.lastName);  // Cooper
console.log(user.fullName);