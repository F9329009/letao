<template>
  <div>
    <van-overlay :show="loadingShow">
      <div class="wrapper" @click.stop>
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["loadingShow", "token"]),
  },
};
</script>

<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
