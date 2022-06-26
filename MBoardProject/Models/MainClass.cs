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
        public int GRADE { get; set; }

        //DTO
        public bool isExist { get; set; }
        public bool isJoin { get; set; }
        public bool isLogin { get; set; }
    }

    public class FEED
    {
        //Entity
        public int IDX { get; set; }
        public int USERIDX { get; set; }
        public string TITLE { get; set; }
        public string CONTENTS { get; set; }
        public string LOCATION { get; set; }
        public DateTime REGDATE { get; set; }
        public bool USEYN { get; set; }

        //Dto
    }
}