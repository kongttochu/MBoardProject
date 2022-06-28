using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MBoardProject.Models
{
    public class DataForFile
    {
        public List<FILE> ConvertToFileList (List<HttpPostedFileBase> fileDatas)
        {
            var list = fileDatas.Select(fileData => ConvertToFile(fileData)).ToList();
            return list;
        }

        public FILE ConvertToFile(HttpPostedFileBase fileData)
        {
            return new FILE { 
                FILENAME = fileData.FileName,
                FILESIZE = fileData.ContentLength,
                FILEPATH = FileDataSave(fileData)
            };
        }

        public string FileDataSave(HttpPostedFileBase fileData)
        {
            string path = null;
#if DEBUG
            string filePath = @"C:\FileTest\MBoardFiles";
            string savePath = Path.Combine(filePath, fileData.FileName);

            if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);
            fileData.SaveAs(savePath);
            path = savePath;
#endif
            return path;
        }
    }
}