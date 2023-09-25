using Microsoft.AspNetCore.Mvc;

namespace GHAppServer
{
    [ApiController]
    [Route("[controller]")]
    public class GHDefinitionsController : ControllerBase
    {
        private string GHDefinitionsDir => "../threereactfiber/src/assets/files/";

        public GHDefinitionsController() { }


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
                GHDefinitionList = resultFileNames.Select(f => new GHDefinitionDto()
                {
                    Name = f
                }).ToList()
            };

            return resp;
        }
    }
}
