function generateUsersList(data){
    let listel = document.getElementById("list-of-users")
    console.log(data)
    for(let i = 0; i < data.length; i++){
        let template = `<li class="user-line">
                    small${data[i][1]}</li>`
    }
}


function getUsers(){
    let cookies = document.cookie
    let jwttoken = document.cookie.match('(^|;)\\s*' + 'jwttoken' + '\\s*=\\s*([^;]+)')?.pop() || ''
    fetch('/users', {headers: {
        'jwttoken':jwttoken,
      }}
    ).then(response=>response.json()).then(data=> generateUsersList(data))
}
getUsers()