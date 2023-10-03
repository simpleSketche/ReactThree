namespace GHAppServer
{
    public class GHDefinitionInputOutputResponse
    {

        public List<GHDefinitionInputAndOutputDto> Inputs { get; set; }

        public List<GHDefinitionInputAndOutputDto > Outputs { get; set; }

        public string Description { get; set; }

        public string CacheKey { get; set; }

        public List<string> InputNames { get; set; }

        public List<string> OutputNames { get; set; }

        public string Icon { get; set; }

        public List<string> Warnings { get; set; } = new List<string>();

        public List<string> Errors { get; set; } = new List<string>();

        public string DefinitionPath { get; set; }

    }
}
