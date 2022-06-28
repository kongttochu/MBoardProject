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

        public FEED FeedCreate(FEED feed)
        {
            DataForFile fileData = new DataForFile();
            DataForDB dbData = new DataForDB();

            feed.files = fileData.ConvertToFileList(feed.fileDatas);

            feed = dbData.InsertFeed(feed);
            if(feed.isSuccess) feed.files = GetFiles(feed.files, feed.IDX);

            return feed;
        }

        public List<FILE> GetFiles(List<FILE> files, int fIDX)
        {
            DataForDB dbData = new DataForDB();
            files.ForEach(file => file.FEEDIDX = fIDX);
            var fileList = files.Select( file => dbData.InsertFile(file)).ToList();
            return fileList;
        }
    }
}