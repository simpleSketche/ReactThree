using GHAppServer.DTOs.Request.RhinoComputeRequest;
using Microsoft.AspNetCore.Mvc;
using Rhino;
using Rhino.Compute;

namespace GHAppServer
{
    [ApiController]
    [Route("[controller]")]
    public class GHDefinitionsController : ControllerBase
    {
        private string GHDefinitionsDir => "../threereactfiber/src/assets/files/";

        private APIUtilities _apiUtilty { get; set; }

        public GHDefinitionsController() 
        {

            _apiUtilty = APIUtilities.Instance;
        
        }


        [HttpGet("GetGHDefinitions")]
        public GHDefinitionFileInfoResponse GetGHDefinitions()
        {
            List<string> resultFileNames = new List<string>();

            bool isDirExist = Directory.Exists(GHDefinitionsDir);
            if(isDirExist)
            {
                resultFileNames = Directory.GetFiles(GHDefinitionsDir).Select(f => Path.GetFileName(f)).ToList();
            }

            GHDefinitionFileInfoResponse resp = new GHDefinitionFileInfoResponse()
            {
                GHDefinitionList = resultFileNames.Select(f => new GHDefinitionNameDto()
                {
                    Name = f
                }).ToList()
            };

            return resp;
        }

        [HttpPost("GetGHDefinitionInputOutput")]
        public async Task<GHDefinitionInputOutputResponse> GetGHDefinitionInputOutput([FromBody] GHParticularDefinitionRequest request)
        {

            string definitionName = request.DefinitionName;

            // locate the file on this server
            string fulleParentPath = Path.GetFullPath(GHDefinitionsDir);
            string definitionPath = Path.Combine(fulleParentPath, definitionName);

            Uri route = new Uri("http://localhost:8081/io");

            RhinoComputeDefinitionInfoRequest rhRequest = new RhinoComputeDefinitionInfoRequest()
            {
                pointer = definitionPath
            };

            ResponseObj result = await _apiUtilty.ApiRequestAsync(route, RequestType.POST, rhRequest);
            GHDefinitionInputOutputResponse deserializeResp = await result.TryParseJson<GHDefinitionInputOutputResponse, Exception>();

            deserializeResp.DefinitionPath = definitionPath;

            return deserializeResp;
            
        }

        [HttpPost("SolveCompute")]
        public async Task<GHDefinitionOutputResultResponse> SolveCompute([FromBody] RhinoComputeSolveRequest request)
        {

            List<string> inputNames = request.InputNames;

            List<GrasshopperDataTree> tree = new List<GrasshopperDataTree>();

            int numInputs = inputNames.Count();

            for(int i = 0; i < numInputs; i++)
            {

                GrasshopperObject inputVal = new GrasshopperObject();
                inputVal.Data = request.Inputs[i].Value.ToString();

                GrasshopperDataTree inputParam = new GrasshopperDataTree(inputNames[i]);
                inputParam.Add("0", new List<GrasshopperObject> { inputVal });

                tree.Add(inputParam);

            }

            GHDefinitionOutputResultResponse output = new GHDefinitionOutputResultResponse();
            var result = GrasshopperCompute.EvaluateDefinition(request.DefinitionPath, tree);

            output.OutputResult = result;

            return output;

        }
    }
}
