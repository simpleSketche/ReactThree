

export async function apiPost(endpoint, arglist, returnedJson=true){

    let request = {
        'method' : 'POST',
        'body': JSON.stringify(arglist),
        'headers':{
            Accept: 'application/json',
            'content-type': 'application/json; charset-UTF-8'
        }
    }

    let resp = await fetch('/api' + endpoint, request)
    if(returnedJson){
        return await resp.json()
    }
}

export async function apiGet(endpoint){

    let request = {
        'method':'GET',
        'headers':{
            Accept: 'application/json',
            'content-type': 'application/json; charset-UTF-8'
        }
    }

    let resp = fetch('http://localhost:9999/GHDefinitions/GetGHDefinitions', request)
    return resp.then(r => r.json())
}