export default ({ $request }, inject) => {
  inject("api", {
    /**
     * 轮播图接口
     * @returns
     */
    Banners() {
      return $request.$get("/banners");
    },
    /**
     * 宫格接口
     * @returns
     */
    GridList() {
      return $request.$get("/gridList");
    },
    /**
     * 运动专区接口
     * @returns
     */
    Sport() {
      return $request.$get("/sport");
    },
    /**
     * 一级分类
     * @returns
     */
    oneCategory() {
      return $request.$get("/oneCategory");
    },
    /**
     * 二级分类
     * @param {*} id 一级分类ID
     * @returns
     */
    towCategory(id) {
      return $request.$get("/towCategory", { id });
    }
  });
};
