import * as THREE from 'three'

export default class Rhino{

    constructor(){
        
        if(Rhino.instance){
            return Rhino.instance
        }
        Rhino.instance = this;
    }

    GetRhinoFile3dm(){
        return new window.Rhino3dm.File3dm();
    }

    DecodeRhinoJson = function(rhinoModel){

        const data = JSON.parse(rhinoModel.data)

        if(rhinoModel.type === 'System.String'){
            // for draco meshes that come in as base64 string
            try{
                return window.Rhino3dm.DracoCompression.decompressBase64String(data)
            }
            catch(e){console.log(e)}
        }
        else if(typeof data === 'object'){
            return window.Rhino3dm.CommonObject.decode(data)
        }

        return null;
    }

}