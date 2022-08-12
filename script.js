let data = [];
let selectedPostId = null;
let msg = document.getElementById("msg");
let msg2 = document.getElementById("msg2");
//add new item
document.getElementById("add").addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("textInput").value;
  const id = title;
  const desc = document.getElementById("textarea").value;
  const date = document.getElementById("dateInput").value;
  const priority = document.getElementById("priority").value;
  const tempData = { id, title, desc, date, priority };
  // msg.innerHTML = "*Yêu cầu nhập thông tin";
  
  if (isValid(tempData)) {
    data.push(tempData);

    showData();
    msg.innerHTML = "Thêm thành công";
    localStorage.setItem("data", JSON.stringify(data));
  }
  document.getElementById("myform").reset();
  
});

//update item
document.getElementById("updateBtn").addEventListener("click", (e) => {
  e.preventDefault();

  if (selectedPostId) {
    const tempPost = data.find((item) => item.id === selectedPostId);
    if (tempPost) {
      const newTitle = document.getElementById("textInputUpdate").value;
      const newDesc = document.getElementById("textareaUpdate").value;
      const newDate = document.getElementById("dateInputUpdate").value;
      const newPriority = document.getElementById("priorityUpdate").value;
      // msg2.innerHTML = "*Đã cập nhật thành công";
      data.splice(data.indexOf(tempPost), 1);
      tempPost.title = newTitle;
      tempPost.desc = newDesc;
      tempPost.date = newDate;
      tempPost.priority = newPriority;
      if (isValid(tempPost)) {
        data.push(tempPost);
        new Promise((resolve) => {
          resolve();
        })
          .then(() => {
            localStorage.setItem("data", JSON.stringify(data));
          })
          .then(() => {
            refreshData();
          });
      }
    }
  }
});

//validate form
const isValid = (data) => {
  if (data.title === "" || data.desc === "" || data.date === "") return false;
  return true;
};

const editPost = (id) => {
  selectedPostId = id;
  const tempPost = data.find((item) => item.id === id);
  document.getElementById("textInputUpdate").value = tempPost.title;
  document.getElementById("textareaUpdate").value = tempPost.desc;
  document.getElementById("dateInputUpdate").value = tempPost.date;
  document.getElementById("priorityUpdate").value = tempPost.priority;
};
const deletePost = (id) => {
  const tempIndex = data.indexOf(data.find((item) => item.id === id));
  console.log(tempIndex);
  data.splice(tempIndex, 1);
  localStorage.setItem("data", JSON.stringify(data));
  refreshData();
};

const renderRow = (data) => `
<div id=${data.id} class="row">
  <input type="checkbox" id="checkboxid" class="checkbox" value="${data.id}">
  <span class="fw-bold col">${data.title}</span>
    <p class="col text-center">${data.desc}</p>
      <span class="small text-secondary col text-center">${data.date}</span>
    <p class="col text-center">${data.priority}</p>
    <span class="options col d-flex justify-content-end">
    <i onClick= "editPost('${data.id}')" data-bs-toggle="modal" data-bs-target="#update" class="fas fa-edit"></i>
    <i onClick ="deletePost('${data.id}');createPosts()" data-bs-toggle="modal" data-bs-target="#deleteModal" class="fas fa-trash-alt mx-2"></i>
  </span>
</div>
`;

const showData = () => {
  const posts = document.getElementById("posts");
  posts.innerHTML = "";
  data.map((item) => {
    posts.innerHTML += renderRow(item);
  });
};

const refreshData = () => {
  new Promise((resolve) => {
    resolve();
  })
    .then(() => {
      data = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : [];
    })
    .then(() => {
      showData();
    });
};

refreshData();

const btn = document.querySelector(".done");
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".close");
const progress = document.querySelector(".progress");

btn.addEventListener("click", () => {
  $('.toast').toast('show')
  toast.classList.add("show");
  progress.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);

  setTimeout(() => {
    progress.classList.add("show");
  }, 5300);
})

closeIcon.addEventListener("click", () => {
  toast.classList.remove("show");

  setTimeout(() => {
    progress.classList.add("show");
  }, 300);
});

const btnremove = document.querySelector(".remove");
const toastremove = document.querySelector(".toast-remove");
const closeIconremove = document.querySelector(".close");
const progressremove = document.querySelector(".progress-remove");

btnremove.addEventListener("click", () => {
  $('.toast-remove').toast('show')
  toastremove.classList.add("show");
  progress.classList.add("show");

  setTimeout(() => {
    toastremove.classList.remove("show");
  }, 5100);

  setTimeout(() => {
    progressremove.classList.add("show");
  }, 5400);
})

closeIconremove.addEventListener("click", () => {
  toastremove.classList.remove("show");

  setTimeout(() => {
    progressremove.classList.add("show");
  }, 400);
});



function KiemtraForm() {
  var tittle = document.getElementById("textInput").value
  var des = document.getElementById("textarea").value
  var date = document.getElementById("dateInput").value
  var errorTitle = document.getElementById("err_title")
  var errorDes = document.getElementById("err_des")
  var errorDate = document.getElementById("err_date")

  errorTitle.innerText = errorDes.innerText = errorDate.innerText = ''

  if (tittle == "") {
    errorTitle.innerText = "*Chưa nhập tiêu đề"
  }
  if (des == "") {
    errorDes.innerText = "*Chưa nhập mô tả"
  }
  if (date == "") {
    errorDate.innerText = "*Chưa chọn ngày sinh"
  }
  return true
  
}

var search_input = document.querySelector("#searchItem")
search_input.addEventListener("keyup", function (e) {
  var search_item = e.target.value.toLowerCase();
  var span_items = document.querySelectorAll(".container")

  span_items.forEach(function (item) {
    if (item.textContent.toLocaleLowerCase().indexOf(search_item) != -1) {
      item.closest(".container").style.display = "block";
      console.log(item)
    }
    else {
      item.closest(".container").style.display = "none";
    }
  })
})

// function myFunction() {
//   var boxes = document.getElementsByClassName('col');
//   for(var i=0;i<boxes.length;i++){
//     boxes = boxes[i];
//     if(box.checked){
//       box.parentNode.removeChild(box);
//     }
//   }
// }

function myFunction(){
  const removeid = document.querySelectorAll(".checkbox:checked")
  removeid.forEach(item=>{
    const tempIndex = data.indexOf(data.find((item) => item.id === item.value));
    data.splice(tempIndex,1);
    
  });
  localStorage.setItem("data", JSON.stringify(data));
  refreshData();
}


// function bluckRemove() {
//   task_checkbox = document.querySelectorAll(".task_checkbox:checked")
//   task_checkbox.forEach(element => {
//       const tempIndex = data.indexOf(data.find((item) => item.id === element.value));
//       console.log(tempIndex);
//       data.splice(tempIndex, 1);
//   });
//   localStorage.setItem("data", JSON.stringify(data));
//   refreshData();
// }