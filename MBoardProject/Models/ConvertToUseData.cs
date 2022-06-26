using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MBoardProject.Models
{
    public class ConvertToUseData
    {
        public LOGIN UserJoin(LOGIN login)
        {
            DataForDB data = new DataForDB();
            login = data.ConfirmUserJoin(login);
            if (!login.isExist) 
            {
                data.UserJoin(login);
                login.isJoin = true;
            }
            else
            {
                login.isJoin = false;
            }
            return login;
        }

        public LOGIN UserLogin(LOGIN login)
        {
            DataForDB data = new DataForDB();
            login.isLogin = false;
            login = data.UserLogin(login);
            return login;
        }
    }
}