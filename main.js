const name = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");
const addBtn = document.querySelector("#click");
const invalidName = document.querySelector(".invalid-name");
const invalidCategory = document.querySelector(".invalid-category");
const invalidPrice = document.querySelector(".invalid-price");
const invalidDescription = document.querySelector(".invalid-description");
const invalidCapacity = document.querySelector(".invalid-capacity");
const search = document.querySelector("#search");
const deleteBtn = document.querySelector("#deleteBtn");

let courses = [];
let updateIndex = null;

if (localStorage.getItem("courses") != null) {
    courses = JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let isValid = true;
    const namePattern = /^[A-Z][a-z]{2,10}$/;

    if (!namePattern.test(name.value)) {
        invalidName.innerHTML = "This name is invalid. It must start with a capital letter and contain 2-10 small letters.";
        name.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidName.innerHTML = "";
        name.classList.remove("is-invalid");
        name.classList.add("is-valid");
    }

    const categoryPattern = /^[A-Z][a-z]{2,}$/;

    if (!categoryPattern.test(category.value)) {
        invalidCategory.innerHTML = "This category is invalid. It must start with a capital letter and contain at least 2 small letters.";
        category.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidCategory.innerHTML = "";
        category.classList.remove("is-invalid");
        category.classList.add("is-valid");
    }

    const pricePattern = /^(100|[1-4][0-9]{2}|500)$/;

    if (!pricePattern.test(price.value)) {
        invalidPrice.innerHTML = "The price is invalid. It must be a whole number.";
        price.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidPrice.innerHTML = "";
        price.classList.remove("is-invalid");
        price.classList.add("is-valid");
    }

    const descriptionPattern = /^[A-Z][a-zA-Z\s]{19,}$/;

    if (!descriptionPattern.test(description.value)) {
        invalidDescription.innerHTML = "The description is invalid. It must start with a capital letter and contain at least 20 characters.";
        description.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidDescription.innerHTML = "";
        description.classList.remove("is-invalid");
        description.classList.add("is-valid");
    }

    const capacityPattern = /^(1[0-9]|2[0-9]|30)$/;

    if (!capacityPattern.test(capacity.value)) {
        invalidCapacity.innerHTML = "The capacity is invalid. It must be a number between 10 and 30.";
        capacity.classList.add("is-invalid");
        isValid = false;
    } else {
        invalidCapacity.innerHTML = "";
        capacity.classList.remove("is-invalid");
        capacity.classList.add("is-valid");
    }

    if (isValid) {
        const course = {
            name: name.value,
            category: category.value,
            price: price.value,
            description: description.value,
            capacity: capacity.value,
        };

        if (updateIndex !== null) {
            courses[updateIndex] = course;
            updateIndex = null;
            addBtn.value = "Add Course";
            Swal.fire({
                position: "center-center",
                icon: "success",
                title: "Course updated successfully",
                showConfirmButton: false,
                timer: 3000
            });
        } else {
            courses.push(course);
            Swal.fire({
                position: "center-center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 3000
            });
        }

        localStorage.setItem("courses", JSON.stringify(courses));
        displayCourses();
    }
});

search.addEventListener("input", (e) => {
    const keyword = search.value;
    const coursesResult = courses.filter((course) => {
        return course.name.toLowerCase().includes(keyword.toLowerCase());
    });

    const result = coursesResult.map((course, index) => {
        return `
        <tr>
         <td>${index}</td> 
         <td>${course.name}</td> 
         <td>${course.category}</td> 
         <td>${course.price}</td> 
         <td>${course.description}</td> 
         <td>${course.capacity}</td> 
         <td> 
         <button class='btn btn-primary' onclick='updateCourse(${index})'>Update</button>
         </td>
         <td>
         <button class='btn btn-danger' onclick='deleteCourse(${index})'>Delete</button>
         </td>
        </tr>
        `
    }).join('');

    document.querySelector("#data").innerHTML = result;
});


function updateCourse(index) {
    const course = courses[index];
    name.value = course.name;
    category.value = course.category;
    price.value = course.price;
    description.value = course.description;
    capacity.value = course.capacity;

    addBtn.value = "Update Course";
    updateIndex = index;
}

function deleteCourse(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
}

deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    courses = [];
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
         <td> 
         <button class='btn btn-primary' onclick='updateCourse(${index})'>Update</button>
         </td>
         <td>
        <button class='btn btn-danger' onclick='deleteCourse(${index})'>Delete</button>
         </td>
        </tr>
        `;
    }).join('');

    document.querySelector("#data").innerHTML = result;
}
