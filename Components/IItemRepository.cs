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
using System.Linq;
using DotNetNuke.Collections;

namespace DotNetNuclear.PBStarter.PersonaBar.Components
{
    public interface IItemRepository
    {

        int AddItem(Item t);

        void DeleteItem(int itemId, int portalId);

        void DeleteItem(Item t);

        Item GetItem(int itemId, int portalId);

        IQueryable<Item> GetItems(int portalId);

        IPagedList<Item> GetItems(string searchTerm, int porrtalId, int pageIndex, int pageSize);

        void UpdateItem(Item t);
    }
}