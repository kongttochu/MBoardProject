
//header 
let header = {
    title: "",
    init: function () {
        this.setTitleView(this.title);
    },
    setTitleView: function (title) {
        $(".header_box>h2").val(title);
    }
}