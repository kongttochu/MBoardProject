

$(function () {

    init();
})

let init = function () {

    login.init();
    $(".join_btn").on('click', function () {
        if (login.state) {
            alert("로그인 상태입니다. 로그아웃 후 회원가입이 가능합니다.");
        }
        else movepage("/Board/JoinView");
    });

    $(".createFeed_btn").on('click', function () {
        if (!login.state) {
            alert("로그아웃 상태입니다. 로그인 후 글쓰기가 가능합니다.");
        }
        else movepage("/Board/CreateView");
    });

    info.init();

    header.title = _title;
    header.init();
}





