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
        toast.classList.add("active");
        progress.classList.add("active");
        
        setTimeout(() => {
          toast.classList.remove("active");
        }, 5000);

        setTimeout(() => {
          progress.classList.add("active");
        }, 5300);
      })

      closeIcon.addEventListener("click", () => {
        toast.classList.remove("active");
        
        setTimeout(() => {
          progress.classList.add("active");
        }, 300);
      });


const searchFun = () => {
  let filter = document.getElementById('searchItem').value;
}

function KiemtraForm(){
  var tittle = document.getElementById("textInput").value
  var des = document.getElementById("textarea").value
  var date = document.getElementById("dateInput").value

  if(tittle == ""){
    alert("Chưa nhập tiêu đề")
    return false
  }
  if(des == ""){
    alert("chưa nhập mô tả")
    return false
  }
  if(date == ""){
    alert("chưa chọn ngày sinh")
    return false
  }
  return true
}

// function validation(){
//   var titler = document.getElementById('textInput').value;
  
//   if(titler == ""){
//     document.getElementById('username').innerHTML = "Please fill the title field";
//     return false;
//   }
// }

