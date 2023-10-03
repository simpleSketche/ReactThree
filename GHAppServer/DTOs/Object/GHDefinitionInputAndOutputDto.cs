using Newtonsoft.Json;

namespace GHAppServer
{
    public class GHDefinitionInputAndOutputDto
    {
        public string Name { get; set; } = "empty";
        public string Nickname { get; set; } = "empty";
        public string ParamType { get; set; } = "empty";
        public string Description { get; set; } = "empty";
        public int AtLeast { get; set; } = 1;
        public int AtMost { get; set; } = int.MaxValue;
        public bool TreeAccess { get; set; } = false;

        [JsonConverter(typeof(ValueConverter))]
        public object Default { get; set; }

        private object _minimum { get; set; }
        [JsonProperty(DefaultValueHandling= DefaultValueHandling.Ignore)]
        public object Minimum
        {
            get
            {
               return _minimum;
            }
            set
            {
                _minimum = (value == null) ? 0 : value;
            }
        }

        private object _maximum { get; set; }
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public object Maximum
        {
            get
            {
                return _maximum;
            }
            set
            {
                _maximum = (value == null) ? double.MaxValue : value;
            }
        }

        private object _value { get; set; }
        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public object Value
        {
            get
            {
                return _value;
            }
            set
            {
                _value = (value == null) ? double.MaxValue : value;
            }
        }

    }

}
