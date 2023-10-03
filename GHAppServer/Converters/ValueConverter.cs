namespace GHAppServer
{
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public class ValueConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return true;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null)
            {
                return null;
            }

            if (reader.TokenType == JsonToken.StartObject)
            {
                JObject jsonObject = JObject.Load(reader);
                var valueToken = jsonObject["Value"];

                if (valueToken == null)
                {
                    return string.Empty; // Handle the case where 'Value' is missing
                }

                if (valueToken.Type == JTokenType.Integer)
                {
                    return new GHDefinitionDefaultInputDto
                    {
                        Value = valueToken.Value<int>()
                    };
                }
                else if (valueToken.Type == JTokenType.Float)
                {
                    return new GHDefinitionDefaultInputDto
                    {
                        Value = valueToken.Value<double>()
                    };
                }
                else if (valueToken.Type == JTokenType.String)
                {
                    return new GHDefinitionDefaultInputDto
                    {
                        Value = valueToken.Value<string>()
                    };
                }
                else
                {
                    return new GHDefinitionDefaultInputDto
                    {
                        Value = valueToken.Value<object>() // Handle other types as object
                    };
                }
            }
            else
            {
                // Handle the case where 'Value' is a simple value (e.g., integer, string)
                return new GHDefinitionDefaultInputDto
                {
                    Value = reader.Value // Read the current token value
                };
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException(); // This converter is for reading only
        }
    }
}
