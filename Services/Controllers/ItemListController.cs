/*
' Copyright (c) 2017 DotNetNuclear.com
'  All rights reserved.
' 
' THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
' TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
' THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
' CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
' DEALINGS IN THE SOFTWARE.
' 
*/

using System.Net;
using System.Net.Http;
using System.Web.Http;
using DotNetNuclear.PBStarter.PersonaBar.Components;
using DotNetNuke.Web.Api;
using DotNetNuke.Security;

namespace DotNetNuclear.PBStarter.PersonaBar.Services.Controllers
{
    [SupportedModules(FeatureController.MODULENAME)]
    [DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Anonymous)]
    public class ItemListController : DnnApiController
    {
        private readonly ItemController _baseController;

        public ItemListController()
        {
            _baseController = new ItemController();
        }

        /// <summary>
        /// HttpGet: ItemList
        /// </summary>
        /// <returns></returns>
        public HttpResponseMessage GetList()
        {
            var items = _baseController.GetItemList(0);

            return Request.CreateResponse(HttpStatusCode.OK, items);
        }

        private string GetCultureCode()
        {
            string setting1 = "";
            if (ActiveModule != null && ActiveModule.ModuleSettings.ContainsKey(FeatureController.MODSETTING_SETTING1))
                setting1 = ActiveModule.ModuleSettings[FeatureController.MODSETTING_SETTING1].ToString();

            return setting1;
        }

    }
}