using Newtonsoft.Json;

namespace GHAppServer
{
    public class RhinoInputRequest
    {

        [JsonConverter(typeof(ValueConverter))]
        public object Value { get; set; }

    }
}
