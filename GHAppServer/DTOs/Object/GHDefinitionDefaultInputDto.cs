using Newtonsoft.Json;

namespace GHAppServer
{
    public class GHDefinitionDefaultInputDto
    {

        public bool IsValid { get; set; }

        public string TypeDescription { get; set; }

        public string TypeName { get; set; }    

        public int QC_Type { get; set; }

        [JsonConverter(typeof(ValueConverter))]
        public object Value { get; set; }

        public string IsValidWhyNot { get; set; }

    }
}
