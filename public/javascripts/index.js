async function Submit(){
    var name = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("email").value;
    var location = document.getElementById("location").value;

    const data = {name,email,phone,location};
    try {
        const response = await fetch('/api/insert',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        // console.log(await response.json());
        document.getElementById("username").value='';
        document.getElementById("email").value='';
        document.getElementById("email").value='';
        document.getElementById("location").value='';
    } catch (error) {
        console.log({error});
    }
}

async function edit(id){
    window.location.href = `http://localhost:3000/edit/${id}`;
}

async function update(id){
    var name = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("email").value;
    var location = document.getElementById("location").value;

    const data = {id,name,email,phone,location};
    try {
        const response = await fetch('/api/update',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const {msg} = await response.json();
        alert(msg);
        window.location.href = 'http://localhost:3000/view'
        
    } catch (error) {
        console.log({error});
    }
}

async function deleteRecord(id) {
    try {
        const response = await fetch(`/api/remove/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
        });
        const {msg} = await response.json();
        alert(msg);
        window.location.reload();
        
    } catch (error) {
        console.log({error});
    }
}

async function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const data = {username,password}
    const res = await fetch('/api/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
    const  {msg} = await res.json();
    alert(msg);
    window.location.href='http://localhost:3000';
}

async function signIn(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var cp = document.getElementById("confirmpassword").value;
    const data = {username,password}
    if(cp===password){
        const res = await fetch('/api/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const  {msg} = await res.json();
        alert(msg);
        window.location.href='http://localhost:3000/login';
    }else{
        alert("Password and Confirm Password do not match");
    }


}