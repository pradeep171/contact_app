if (localStorage.getItem("contacts") == null)
    localStorage.setItem("contacts", JSON.stringify([]));
tempindex = -1;
viewdata();

function addcontact() {
    var contact = getcontact();
    var contacts = getdatafromlocalstorage();
    contacts.push(contact);
    updatedatatolocalstorage(contacts);
    cleardata();
    viewdata();
}

function deletecontact(index) {
    var contacts = getdatafromlocalstorage();
    contacts.splice(index, 1);
    updatedatatolocalstorage(contacts)
    viewdata();
}

function editcontact(index) {
    var contacts = getdatafromlocalstorage();
    contact = contacts[index];
    tempindex = index;
    document.getElementById("cname").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("mobile").value = contact.mobile;
    document.getElementById("add").style.display = "none";
    document.getElementById("update").style.display = "block";
}

function updatecontact() {
    var contacts = getdatafromlocalstorage();
    contact = getcontact();
    contacts.splice(tempindex, 1, contact);
    updatedatatolocalstorage(contacts);
    cleardata();
    document.getElementById("add").style.display = "block";
    document.getElementById("update").style.display = "none";
    viewdata();
}

function viewdata() {
    var contacts = getdatafromlocalstorage();
    var data = "";
    if (contacts.length == 0) {
        data = "Contacts not yet added..."
    } else {
        data += "<table id='tablec'>";
        for (var i = 0; i < contacts.length; i++) {
            data += "<tr id='trc'>";
            data += "<td>" + contacts[i].name + "</td>";
            data += "<td>" + contacts[i].email + "</td>";
            data += "<td>" + contacts[i].mobile + "</td>";
            data += "<td><button onclick=editcontact(" + i + ")>Edit</button>";
            data += "<td><button onclick=deletecontact(" + i + ")>Delete</button>";
            data += "</tr>";
        }
        data += "</table>";
    }
    document.getElementById("content").innerHTML = data;

}

function cleardata() {
    document.getElementById("cname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mobile").value = "";
}

function getcontact() {
    var name = document.getElementById("cname").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;
    contact = {
        "name": name,
        "email": email,
        "mobile": mobile
    };
    return contact;
}

function getdatafromlocalstorage() {
    contacts = JSON.parse(localStorage.getItem("contacts"));
    return contacts;
}

function updatedatatolocalstorage(updateddata) {
    localStorage.setItem("contacts", JSON.stringify(updateddata));
}
