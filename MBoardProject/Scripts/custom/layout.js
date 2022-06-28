//info
let info = {
    init: function () {
        $(".home_btn").on('click', function () {
            movepage("/Board/BoardView");
        });
    }
}

//header 
let header = {
    title: "",
    init: function () {
        this.setTitleView(this.title);
    },
    setTitleView: function (title) {
        $("#header_title").text(title);
    }
}