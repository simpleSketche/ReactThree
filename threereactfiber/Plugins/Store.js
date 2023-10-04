import {create} from 'zustand'
import {fetchGHDefinitionFileNames, collectInputParams} from '../src/services/api.js'

export const useStore = create((set, get) => ({
    
    ghDefinitionList : ["test.gh"],
    setGhDefinitions: (ghList) => {
        set({ghDefinitionList: ghList})
    },
    getGhDefinitions: async() => {
        const resp = await fetchGHDefinitionFileNames();
        console.log("Load all the gh file names")
        set({
            ghDefinitionList: resp["ghDefinitionList"]
        })
    },

    selGhDefinition:{},
    getSelGhDefinition: async(definitionName) => {
        console.log("definitionName")
        let requestDefinition = {
            "DefinitionName":definitionName
          }
        const definitionInfo = await collectInputParams(requestDefinition)
        
        set({
                selGhDefinition: definitionInfo
        })
    },
    setSelGhDefinition: (gh) => {
        set({selGhDefinition: gh})
    }

  }))
