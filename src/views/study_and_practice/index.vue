<template>
  <div class="s_a_p-contain">
    <div class="s_a_p-contain-head">
      <div class="left">
        <div class="title1">学习流程</div>
        <div class="title2">
          <span>常见问题</span>
          <ul>
            <li>如何查看成绩？</li>
            <li>如何查看进度？</li>
            <li>如何进行考核？</li>
            <li>如何进行评价？</li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="right-head">
          <div class="right-head1">学习练习</div>
          <div class="right-head2">综合考核</div>
        </div>
        <div class="right-body">
          <div class="right-body1">
            <div class="right-body1-img1">
              <img src="./imgs/学习.png" alt="" />
              <div class="text">学习</div>
            </div>
            <div class="right-body1-img2">
              <img src="./imgs/练习.png" alt="" />
              <div class="text">练习</div>
            </div>
          </div>
          <div class="right-body2">
            <img src="./imgs/考核.png" alt="" />
            <div class="text">考核</div>
          </div>
        </div>

        <div class="right-txt">
          <p>“学习练习”模块共分为“学习”与“练习”两大部分。</p>
          <p>
            “学习”部分即为工地安全手册内容。“练习”部分即配套的练习题。每个知识点的学习完成后，有5道练习题可供工人进行知识巩固。每个工人完成学习练习部分大约需5~10分钟。
          </p>
        </div>
      </div>
    </div>
    <div class="s_a_p-contain-body">
      <div class="head">
        <span>工人完成进度</span>
        <span>{{ process }}%</span>
      </div>
      <div class="item" v-for="(item, index) in modules_info" :key="index">
        <div class="item-content">
          <img :src="item.img" alt="" />
          <div class="item-text">
            <p style="color: #000000; font-size: 18px; font-weight: bolder">
              {{ item.name }}
            </p>
            <p style="color: #c79367; font-size: 16px">
              访问量：{{ item.views }}
            </p>
            <div class="btn">
              <el-button @click.prevent="toStudy(index)" type="danger">学习</el-button>
              <el-button @click.prevent="toPractice(index)" type="primary">练习</el-button>
            </div>
          </div>
        </div>
        <div class="item-status">
          <img v-if="item.status" src="./imgs/完成.png" alt="" />
          <img v-else src="./imgs/未完成.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getVisit, addVisit, getUserInfo } from "@/api/api.js";
const router = useRouter();
const toStudy = (id) => {
  // 访问量+1
  addVisit(
    {
      id: id + 1,
    },
    {
      "Content-Type": "application/json",
    }
  );
  // 跳转到学习页面
  router.push({
    path: "/study",
    query: {
      title: modules_info.value[id].name,
      id: id,
    },
  });
  // 滚动到页面顶部
  window.scrollTo(0, 0);
};
const toPractice = (id) => {
  // 访问量+1
  addVisit(
    {
      id: id + 1,
    },
    {
      "Content-Type": "application/json",
    }
  );
  router.push({ path: "/practice", query: { id: id } });
};
// 学习状态
const modules_info = ref([]);
// 完成度
const process = ref(0);
// 获取图片src
const getImgSrc = (name) => {
  return new URL(`../../assets/imgs/${name}.jpg`, import.meta.url).href;
};

// 预加载图片的函数
const preloadImages = (images) => {
  return Promise.all(
    images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    })
  );
};

// 使用 getImgSrc 函数获取图片 URL 并预加载
const imgSources = [getImgSrc(1), getImgSrc(2), getImgSrc(3), getImgSrc(4)];

onMounted(async () => {
  // 调用 preloadImages 函数预加载图片
  await preloadImages(imgSources)
    .then(() => {
      console.log("所有图片预加载完成");
    })
    .catch((error) => {
      console.error("图片预加载失败:", error);
    });
  // 获取访问量
  await getVisit({
    "Content-Type": "application/json",
  })
    .then((res) => {
      console.log(res.data);
      modules_info.value = res.data.data;
    })
    .catch((err) => {
      // 若token未通过验证，跳转到登录页面
      if (err.response.status == 401) {
        router.push({ path: "/login" });
      }
    });
  // 获取用户信息
  await getUserInfo({
    "Content-Type": "application/json",
  })
    .then((res) => {
      console.log(res.data);
      if (res.data.data.module1 == 1) {
        modules_info.value[0].status = true;
      }
      if (res.data.data.module2 == 1) {
        modules_info.value[1].status = true;
      }
      if (res.data.data.module3 == 1) {
        modules_info.value[2].status = true;
      }
      if (res.data.data.module4 == 1) {
        modules_info.value[3].status = true;
      }
      // 添加模块图片信息
      modules_info.value[0].img = imgSources[0];
      modules_info.value[1].img = imgSources[1];
      modules_info.value[2].img = imgSources[2];
      modules_info.value[3].img = imgSources[3];
    })
    .then(() => {
      // 计算完成度
      let count = 0;
      for (let i = 0; i < modules_info.value.length; i++) {
        if (modules_info.value[i].status) {
          count++;
        }
      }
      process.value = count * 25;
    });
});
</script>

<style lang="scss" scoped>
.s_a_p-contain {
  margin-top: 20px;
  margin-left: 10%;
  width: 80%;
  height: 100%;

  // overflow: hidden;
  .s_a_p-contain-head {
    width: 100%;
    height: 600px;
    display: flex;

    .left {
      width: 20%;
      height: 600px;
      background-color: #f4f4f4;

      .title1 {
        padding-left: 30px;
        height: 60px;
        line-height: 60px;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
        background-color: #df0a0b;
        color: #fff;
      }

      .title2 {
        padding-left: 30px;
        font-size: 20px;

        span {
          margin-bottom: 20px;
        }

        ul {
          font-size: 16px;
          margin-top: 20px;

          li {
            margin-bottom: 10px;
          }
        }
      }
    }

    .right {
      margin-left: 30px;
      width: 75%;
      height: 100%;

      .right-head {
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: red;
        display: flex;
        font-weight: bold;
        gap: 30px;
        align-items: center;
        text-align: center;

        .right-head1 {
          flex: 2;
          background-color: #f4f4f4;
          font-size: 20px;
        }

        .right-head2 {
          flex: 1;
          background-color: #f4f4f4;
          font-size: 20px;
        }
      }

      .right-body {
        width: 100%;
        height: 400px;
        display: flex;
        gap: 30px;

        img {
          width: 100px;
          height: 100px;
        }

        .right-body1 {
          flex: 2;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border: 1px solid #f4f4f4;

          .right-body1-img1,
          .right-body1-img2 {
            text-align: center;

            .text {
              margin-top: 20px;
              font-size: 20px;
              font-weight: bold;
            }
          }
        }

        .right-body2 {
          flex: 1;
          text-align: center;
          align-content: center;
          border: 1px solid #f4f4f4;

          .text {
            margin-top: 20px;
            font-size: 20px;
            font-weight: bold;
          }
        }
      }

      .right-txt {
        margin-top: 20px;
        width: 100%;
        font-size: 16px;
        font-weight: lighter;
      }
    }
  }

  .s_a_p-contain-body {
    margin-top: 20px;
    width: 100%;
    background-color: #df0a0b;
    color: white;
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    padding-left: 40px;

    span {
      margin-right: 20px;
    }

    .item {
      width: 100%;
      display: flex;
      margin-top: 20px;
      justify-content: space-between;

      .item-content {
        flex: 1;
        height: 150px;
        display: flex;

        img {
          width: 200px;
          height: 100px;
        }

        .item-text {
          margin-left: 40px;
          font-size: 20px;

          .btn {

            .study-button,
            .practice-button {
              width: 80px;
              height: 40px;
              margin-right: 20px;
              background-color: #df0a0b;
              color: white;
              border: 1px solid white;
              border-radius: 5%;
            }

            .practice-button {
              background-color: #1c92dc;
            }
          }
        }
      }

      .el-button {
        width: 100px;
        height: 35px;
      }
    }
  }
}
</style>