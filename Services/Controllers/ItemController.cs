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
using System;
using System.Linq;
using System.Net.Http;
using DotNetNuclear.PBStarter.PersonaBar.Components;
using DotNetNuclear.PBStarter.PersonaBar.Services.ViewModels;
using DotNetNuke.Common;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using Dnn.PersonaBar.Library;
using Dnn.PersonaBar.Library.Attributes;
using DotNetNuke.Instrumentation;
using DotNetNuke.Security;
using DotNetNuke.Services.FileSystem;
using DotNetNuke.Web.Api;

namespace DotNetNuclear.PBStarter.PersonaBar.Services.Controllers
{
    [MenuPermission(MenuName = "DotNetNuclear.PBStarter")]
    public class ItemController : PersonaBarApiController
    {
        private static readonly ILog Logger = LoggerSource.Instance.GetLogger(typeof(ItemController));
        private readonly IItemRepository _repository;

        public string Setting1 { get; set; }

        public ItemController(IItemRepository repository)
        {
            Requires.NotNull(repository);
            this._repository = repository;
        }

        public ItemController() : this(ItemRepository.Instance)
        {
        }

        [HttpGet]  //[baseURL]/item/list
        [ActionName("list")]
        public HttpResponseMessage GetList()
        {
            int moduleId = 0;

            var items = GetItemList(moduleId);

            return Request.CreateResponse(HttpStatusCode.OK, new ItemListDto() { Results = items, TotalResults = items.Count });
        }


        [HttpPost]  //[baseURL]/item/upsert
        [ActionName("upsert")]
        public HttpResponseMessage Upsert(ItemViewModel item)
        {
            Item t = item.Id > 0 ? Update(item) : Create(item);

            item = new ItemViewModel(t);
            return Request.CreateResponse(HttpStatusCode.OK, item);
        }

        [HttpPost]  //[baseURL]/item/delete
        [ActionName("delete")]
        public HttpResponseMessage Delete(ItemViewModel item)
        {
            int portalId = 0;
            var delItem = _repository.GetItem(item.Id, portalId);

            _repository.DeleteItem(delItem);

            return Request.CreateResponse(HttpStatusCode.OK, new { itemId = delItem.ItemId });
        }

        /// <summary>
        /// This non-webapi method is used for both the PB Menu controller 
        /// and the module's item list controller
        /// </summary>
        /// <returns></returns>
        public List<ItemViewModel> GetItemList(int portalId)
        {
            List<ItemViewModel> items = _repository.GetItems(portalId)
                .Select(item => new ItemViewModel(item))
                .ToList();
            return items;
        }

        #region Private Methods

        private Item Create(ItemViewModel item)
        {
            Item t = new Item
            {
                Name = item.Name,
                Description = item.Description,
                AddedByUserId = UserInfo?.UserID ?? -1,
                ModifiedByUserId = UserInfo?.UserID ?? -1,
                DateAdded = DateTime.UtcNow,
                DateModified = DateTime.UtcNow,
                PortalId = 0
            };

            _repository.AddItem(t);

            return t;
        }

        private Item Update(ItemViewModel item)
        {
            int moduleId = 0;
            Item t = _repository.GetItem(item.Id, moduleId);
            if (t != null)
            {
                t.Name = item.Name;
                t.Description = item.Description;
                t.ModifiedByUserId = UserInfo?.UserID ?? -1;
                t.DateModified = DateTime.UtcNow;
            }
            _repository.UpdateItem(t);

            return t;
        }

        #endregion
    }

    public class ItemListDto
    {
        public List<ItemViewModel> Results { get; set; }
        public int TotalResults { get; set; }
    }
}
