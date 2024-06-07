using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InversionesLtda.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InversionesLtda.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private static IList<Producto> lista = new List<Producto>();

        // GET: api/<ProductoController>
        [HttpGet]
        public IEnumerable<Producto> Get()
        {
            return lista;
        }

        // GET api/<ProductoController>/5
        [HttpGet("{id}")]
        public Producto Get(int id)
        {
            return lista.FirstOrDefault(x => x.sku == id);
        }

        // POST api/<ProductoController>
        [HttpPost]
        public void Post([FromBody] Producto value)
        {
            lista.Add(value);
        }

        // PUT api/<ProductoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Producto value)
        {
            Producto selection = lista.FirstOrDefault(x => x.sku == id);
            lista[lista.IndexOf(selection)] = value;
        }

        // DELETE api/<ProductoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            lista.Remove(lista.FirstOrDefault(x => x.sku == id));
        }
    }
}
