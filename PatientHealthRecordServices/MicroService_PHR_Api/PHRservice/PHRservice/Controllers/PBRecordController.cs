﻿using BusinessLogic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PBRecordController : ControllerBase
    {
        ILogic _logic;
        public PBRecordController(ILogic logic)
        {
            _logic = logic;
        }

        /*[HttpGet("GetAllBasicRecords")]

        public ActionResult GetRecords()
        {
            try
            {
                var tara = _logic.GetBasicDetail();
                if (tara.Count() > 0)
                {
                    return Ok(tara);
                }
                else
                    return BadRequest($"There is no Records in database!");
            }
            catch (SqlException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }*/

        [HttpGet("Get/{id}")]
        public ActionResult GetById([FromRoute] string id)
        {
            try
            {
                var search = _logic.GetById(id);
                if (search != null)
                    return Ok(search);
                else
                    return NotFound($"Records with PatientId {id} not available, please try with different Id");
            }
            catch (SqlException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }



        [HttpPost("AddPBRecords")]
        public ActionResult Add([FromBody] Models.Patient_Basic_Record r)
        {
            try
            {
                r.Id = Guid.NewGuid();
                var add = _logic.AddBasicR(r);
                return CreatedAtAction("Add", add);
            }
            catch (SqlException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("modify/{Id}")]
        public ActionResult UpdateBasicRecord([FromRoute] string Id, [FromBody] Models.Patient_Basic_Record r)
        {
            try
            {
                if (Id != null)
                {
                    _logic.UpdateBR(Id, r);
                    return Ok(r);
                }
                else
                    return BadRequest($"something wrong with {Id}, please try again!");
            }
            catch (SqlException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
