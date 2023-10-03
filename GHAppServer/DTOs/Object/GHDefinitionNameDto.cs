using Newtonsoft.Json;

namespace GHAppServer
{
    public class GHDefinitionNameDto
    {
        [JsonProperty("Name")]
        public string Name { get; set; }
    }
}
