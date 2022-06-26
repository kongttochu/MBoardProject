using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MBoardProject.Models
{
    public class LOGIN
    {
        //Entity
        public int IDX { get; set; }
        public string USERID { get; set; }
        public string USERNM { get; set; }
        public string USERPW{ get; set; }
        public DateTime REGDATE { get; set; }
        public string GRADE { get; set; }

        //DTO
        public bool isExist { get; set; }
        public bool isJoin { get; set; }
        public bool isLogin { get; set; }
    }
}