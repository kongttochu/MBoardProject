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
            DateTime dt = DateTime.Now;
            while (data.Read())
            {
                login.IDX = (int)data["IDX"];
                login.USERID = data["USERID"].ToString();
                login.USERNM = data["USERNM"].ToString();
                login.USERPW = data["USERPW"].ToString();
                login.REGDATE = DateTime.TryParse(data["REGDATE"].ToString(), out dt) ? dt : DateTime.Now;
                login.GRADE = (int)data["GRADE"];
                login.isLogin = true;
            }
            return login;
        }

        public LOGIN GetLogin(string userID)
        {
            dbconn dbconn = new dbconn();
            string queryString = string.Format("EXEC USP_USERLOGIN '{0}'", userID);
            var data = dbconn.ConnectDB(queryString);

            LOGIN login = new LOGIN();
            DateTime dt = DateTime.Now;
            while (data.Read())
            {
                login.IDX = (int)data["IDX"];
                login.USERNM = data["USERNM"].ToString();
            }
            return login;
        }

        public FEED InsertFeed(FEED feed)
        {
            dbconn dbconn = new dbconn();
            string queryString = string.Format("EXEC USP_FEEDCREATE {0}, \'{1}\',  \'{2}\'", feed.USERIDX, feed.TITLE, feed.CONTENTS);

            feed.isSuccess = false;
            
            var data = dbconn.ConnectDB(queryString);
            DateTime dt = DateTime.Now;
            while (data.Read())
            {
                feed.IDX = (int)data["IDX"];
                feed.USERIDX = (int)data["USERIDX"];
                feed.TITLE = data["TITLE"].ToString();
                feed.CONTENTS = data["CONTENTS"].ToString();
                feed.LOCATION = data["LOCATION"].ToString();
                feed.REGDATE = DateTime.TryParse(data["REGDATE"].ToString(), out dt) ? dt : DateTime.Now;

                feed.login = new LOGIN { 
                    USERNM = data["USERNM"].ToString()
                };
                feed.isSuccess = true;
            }
            return feed;
        }

        public FILE InsertFile(FILE file)
        {
            dbconn dbconn = new dbconn();
            string queryString = string.Format("EXEC USP_FILECREATE {0}, \'{1}\', {2},  \'{3}\'", file.FEEDIDX, file.FILENAME, file.FILESIZE, file.FILEPATH);

            file.isSuccess = false;

            var data = dbconn.ConnectDB(queryString);
            DateTime dt = DateTime.Now;
            while (data.Read())
            {
                file.IDX = (int)data["IDX"];
                file.FEEDIDX = (int)data["FEEDIDX"];
                file.FILENAME = data["FILENAME"].ToString();
                file.FILESIZE = (int)data["FILESIZE"];
                file.FILEPATH = data["FILEPATH"].ToString();
                file.isSuccess = true;
            }
            return file;
        }
    }
}