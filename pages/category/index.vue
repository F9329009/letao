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
            span="12"
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
  async asyncData({ $api }) {
    let { data: oneCategoryList } = await $api.oneCategory();
    console.log("oneCategoryList", oneCategoryList, oneCategoryList[0].id);
    const { data: towCategoryList } = await $api.towCategory(
      oneCategoryList[0].id
    );
    oneCategoryList = oneCategoryList.map((item) => ({
      text: item.categoryName,
      ...item,
    }));
    console.log("towCategoryList", towCategoryList);

    return { oneCategoryList, towCategoryList };
  },
  methods: {
    async oneCategoryClick(i) {
      const { data: towCategoryList } = await this.$api.towCategory(
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
