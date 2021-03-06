using MBoardProject.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MBoardProject.Controllers
{
    public class BoardController : Controller
    {
        // GET: Board
        public ActionResult BoardView()
        {
            ResetLoginInfo();
            ViewBag.Login = Session["Login"];
            return View();
        }

        [HttpPost]
        public JsonResult UserLogin(LOGIN login)
        {
            ConvertToUseData data = new ConvertToUseData();
            string jsonData = JsonConvert.SerializeObject(data.UserLogin(login));
            if (login.isLogin) Session["Login"] = jsonData;
            return Json(jsonData);
        }

        [HttpPost]
        public JsonResult UserLogout(LOGIN login)
        {
            login.isLogin = false;
            login.USERNM = "";
            login.USERID = "";
            login.USERPW = "";
            string jsonData = JsonConvert.SerializeObject(login);
            if (!login.isLogin) Session["Login"] = jsonData;
            return Json(jsonData);
        }

        public ActionResult JoinView()
        {
            ResetLoginInfo();
            ViewBag.Login = Session["Login"];
            return View();
        }

        [HttpPost]
        public JsonResult UserJoin(LOGIN login)
        {
            ConvertToUseData data = new ConvertToUseData();
            string jsonData = JsonConvert.SerializeObject(data.UserJoin(login));
            return Json(jsonData);
        }

        public ActionResult CreateView()
        {
            ResetLoginInfo();
            ViewBag.Login = Session["Login"];
            return View();
        }

        [HttpPost]
        public JsonResult FeedCreate(FEED feed)
        {
            ConvertToUseData data = new ConvertToUseData();
            feed = data.FeedCreate(feed);
            string jsonData = JsonConvert.SerializeObject(new { isSuccess = feed.isSuccess });
            //string jsonData = JsonConvert.SerializeObject(data.FeedCreate(feed)); // 타임아웃 에러 발생
            return Json(jsonData);
        }

        public ActionResult ReadView()
        {
            ResetLoginInfo();
            ViewBag.Login = Session["Login"];
            return View();
        }

        public ActionResult EditView()
        {
            ResetLoginInfo();
            ViewBag.Login = Session["Login"];
            return View();
        }

        public void ResetLoginInfo()
        {
            if (Session["Login"] == null)
            {
                LOGIN login = new LOGIN()
                {
                    isLogin = false,
                    USERID = "",
                    USERNM = "",
                    USERPW = ""
                };
                string jsonData = JsonConvert.SerializeObject(login);
                Session["Login"] = jsonData;
            }
        }
    }
}