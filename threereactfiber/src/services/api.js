

export async function apiPost(endpoint, arglist, returnedJson=true){

    let request = {
        'method' : 'POST',
        'body': JSON.stringify(arglist),
        'headers':{
            Accept: 'application/json',
            'content-type': 'application/json; charset-UTF-8'
        }
    }

    let resp = await fetch(process.env.REACT_APP_API_URL + endpoint, request)
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
    
    let resp = fetch(process.env.REACT_APP_API_URL + endpoint, request)
    return resp.then(r => r.json())
}


export const fetchGHDefinitionFileNames = async () => {

    const endpoint = 'GHDefinitions/GetGHDefinitions'
    const result = await apiGet(endpoint);
    return result
  };


export const collectInputParams = async (arg) => {

    const endpoint = 'GHDefinitions/GetGHDefinitionInputOutput'
    const result = await apiPost(endpoint, arg)
    return result;

}

export const solveParams = async(args) => {

    const endpoint = 'GHDefinitions/SolveCompute'
    try{
        const result = await apiPost(endpoint, args)
        return result;
    }
    catch(e){
        console.log(e)
    }

}