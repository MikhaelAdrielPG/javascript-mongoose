const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/ShopApp")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const personSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
});

personSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

personSchema.pre("save", async function () {
  this.firstName = "Luna";
  this.lastName = "Lovegood";
  console.log("persiapan menyimpan data");
});

personSchema.post("save", async function () {
  console.log("data berhasil di simpan");
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  firstName: "Ron",
  lastName: "Weasley",
});

// console.log(person.fullName);

console.log(person);

person
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
