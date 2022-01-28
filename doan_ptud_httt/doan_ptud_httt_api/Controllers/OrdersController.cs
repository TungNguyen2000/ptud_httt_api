using doan_ptud_httt_api.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace doan_ptud_httt_api.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private datainstance db = new datainstance();

        // GET: api/<OrdersController>
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IQueryable<Order> Get()
        {
            return db.order;
        }

        // GET api/<OrdersController>/5
        [Microsoft.AspNetCore.Mvc.HttpGet("{id}")]
        public async Task<IHttpActionResult> Get(int id)
        {
            Order order = await db.order.FindAsync(id);
            if (order == null)
                return (IHttpActionResult)NotFound();

            return (IHttpActionResult)Ok(order);
        }

        // POST api/<OrdersController>
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public void Post([Microsoft.AspNetCore.Mvc.FromBody] string value)
        {
        }

        // PUT api/<OrdersController>/5
        [Microsoft.AspNetCore.Mvc.HttpPut("{id}")]
        public void Put(int id, [Microsoft.AspNetCore.Mvc.FromBody] string value)
        {
        }

        // DELETE api/<OrdersController>/5
        [Microsoft.AspNetCore.Mvc.HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
