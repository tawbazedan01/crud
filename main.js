const name = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");
const addBtn = document.querySelector("#click");

let courses = [];

if (localStorage.getItem(courses) != null) {
    courses = JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const course = {
        name: name.value,
        category: category.value,
        price: price.value,
        description: description.value,
        capacity: capacity.value,
    }
    Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 3000
    });
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
    displayCourses();
});

function displayCourses() {

    const result = courses.map((course, index) => {
        return `
        <tr>
         <td>${index}</td> 
         <td>${course.name}</td> 
         <td>${course.category}</td> 
         <td>${course.price}</td> 
         <td>${course.description}</td> 
         <td>${course.capacity}</td> 
        </tr>
        `
    }).join('');

    document.querySelector("#data").innerHTML = result;



}