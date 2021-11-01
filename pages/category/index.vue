<template>
  <!-- 一级分类 -->
  <div>
    <van-tree-select
      height="calc(100vh - 46px)"
      :items="oneCategoryList"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      @click-nav="oneCategoryClick"
    >
      <template #content>
        <!-- 二级分类 -->
        <van-row>
          <van-col
            class="tow-category-col"
            span="8"
            v-for="item in towCategoryList"
            :key="item.id"
          >
            <img :src="item.brandLogo" alt="" />
            <p>{{ item.brandName }}</p>
          </van-col>
        </van-row>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeId: 1,
      activeIndex: 0,
    };
  },
  async asyncData({ $api, store, query }) {
    // 获取一级分类数据
    let { data: oneCategoryList } = await $api.OneCategory();
    // 处理一级分类数据
    oneCategoryList = oneCategoryList.map((item) => ({
      text: item.categoryName,
      ...item,
    }));
    // 默认获取第一个一级分类的二级分类数据
    const { data: towCategoryList } = await $api.TowCategory(
      query.active || oneCategoryList[0].id
    );
    store.state.loadingShow = false;
    return {
      oneCategoryList: oneCategoryList || [],
      towCategoryList: towCategoryList || [],
    };
  },
  methods: {
    async oneCategoryClick(i) {
      // 替换成带参数的路由
      this.$router.replace({
        path: `/category`,
        query: { active: this.oneCategoryList[i].id },
      });
      //  更新二级分类
      const { data: towCategoryList } = await this.$api.TowCategory(
        this.oneCategoryList[i].id
      );
      this.towCategoryList = towCategoryList;
    },
  },
};
</script>

<style>
.tow-category-col {
  text-align: center;
}

.tow-category-col img {
  width: 100%;
}
</style>
