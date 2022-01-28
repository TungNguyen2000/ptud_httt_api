using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Data;
using System.Data.Entity;

namespace doan_ptud_httt_api.Model
{
    public class Order
    {
        private int orderID { get; set; }
        private int orderQuantity { get; set; }
        private int orderprice { get; set; }
        private DateTime date { get; set; }
        private String address { get; set; }
        private String phone { get; set; }
        private int buyerid { get; set; }
        private int shipperid { get; set; }
    }

    public class datainstance:DbContext
    {
        public DbSet<Order> order { get; set; }
    }
}
