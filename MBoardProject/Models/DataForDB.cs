using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MBoardProject.Models
{
    public class DataForDB
    {
        public LOGIN ConfirmUserJoin(LOGIN login)
        {
            dbconn dbconn = new dbconn();
            string queryString = string.Format("EXEC USP_GETCONFIRMJOIN '{0}', '{1}'", login.USERID, login.USERNM);
            var data = dbconn.ConnectDB(queryString);
            while (data.Read())
            {
                login.isExist = (int)data["COUNT"] != 0 ? true : false;
            }
            return login;
        }

        public void UserJoin(LOGIN login)
        {
            dbconn dbconn = new dbconn();
            string queryString = string.Format("EXEC USP_USERJOIN \'{0}\', \'{1}\', \'{2}\'", login.USERID, login.USERNM, login.USERPW);
            var data = dbconn.ConnectDB(queryString);
        }

        public LOGIN UserLogin(LOGIN login)
        {
            dbconn dbconn = new dbconn();
            string queryString = string.Format("EXEC USP_USERLOGIN '{0}', '{1}'", login.USERID, login.USERPW);
            var data = dbconn.ConnectDB(queryString);
            login.isLogin = false;
            while (data.Read())
            {
                login.USERNM = data["USERNM"].ToString();
                login.isLogin = true;
            }
            return login;
        }
    }
}