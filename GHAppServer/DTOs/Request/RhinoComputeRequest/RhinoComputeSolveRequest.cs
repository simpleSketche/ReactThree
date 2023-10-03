using Newtonsoft.Json;

namespace GHAppServer.DTOs.Request.RhinoComputeRequest
{
    public class RhinoComputeSolveRequest
    {
        [JsonProperty("inputs")]
        public List<RhinoInputRequest> Inputs { get; set; }

        [JsonProperty("inputNames")]
        public List<string> InputNames { get; set; }

        [JsonProperty("definitionPath")]
        public string DefinitionPath { get; set; }

    }
}
