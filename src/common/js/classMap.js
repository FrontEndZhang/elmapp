// 定义一个混入对象
export default {
    data() {
        return {
            classMap : []
        }
    },
    created: function () {
        this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"]
    }
}