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
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DotNetNuke.Collections;
using DotNetNuke.Common;
using DotNetNuke.Data;
using DotNetNuke.Framework;

namespace DotNetNuclear.PBStarter.PersonaBar.Components
{
    public class ItemRepository : ServiceLocator<IItemRepository, ItemRepository>, IItemRepository
    {

        protected override Func<IItemRepository> GetFactory()
        {
            return () => new ItemRepository();
        }

        public int AddItem(Item t)
        {
            Requires.NotNull(t);
            Requires.PropertyNotNegative(t, "PortalId");

            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Item>();
                rep.Insert(t);
            }
            return t.ItemId;
        }

        public void DeleteItem(Item t)
        {
            Requires.NotNull(t);
            Requires.PropertyNotNegative(t, "ItemId");

            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Item>();
                rep.Delete(t);
            }
        }

        public void DeleteItem(int itemId, int portalId)
        {
            Requires.NotNegative("ItemId", itemId);
            Requires.NotNegative("PortalId", portalId);

            var t = GetItem(itemId, portalId);
            DeleteItem(t);
        }

        public Item GetItem(int itemId, int portalId)
        {
            Requires.NotNegative("ItemId", itemId);
            Requires.NotNegative("PortalId", portalId);

            Item t;
            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Item>();
                t = rep.GetById(itemId, portalId);
            }
            return t;
        }

        public IQueryable<Item> GetItems(int portalId)
        {
            Requires.NotNegative("PortalId", portalId);

            IQueryable<Item> t = null;

            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Item>();

                t = rep.Get(portalId).AsQueryable();
            }

            return t;
        }

        public IPagedList<Item> GetItems(string searchTerm, int portalId, int pageIndex, int pageSize)
        {
            Requires.NotNegative("PortalId", portalId);

            var t = GetItems(portalId).Where(c => c.Name.Contains(searchTerm)
                                                || c.Description.Contains(searchTerm));


            return new PagedList<Item>(t, pageIndex, pageSize);
        }

        public void UpdateItem(Item t)
        {
            Requires.NotNull(t);
            Requires.PropertyNotNegative(t, "ItemId");

            using (IDataContext ctx = DataContext.Instance())
            {
                var rep = ctx.GetRepository<Item>();
                rep.Update(t);
            }
        }
    }
}