using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InversionesLtda.API.Models
{
    public class Producto
    {
        public int sku { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public int stock { get; set; }
        public int precio { get; set; }

    }
}
