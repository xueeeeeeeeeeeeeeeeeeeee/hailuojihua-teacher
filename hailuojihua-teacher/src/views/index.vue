<template>
  <div class="cards">
    <div class="card">
      <div class="card-left">
        <div class="card-title">儿童数量</div>
        <div class="carddetail">
          <div class="card-number">{{ childnumber }}人</div>
          <!-- <div class="card-change">+11%</div> -->
        </div>

      </div>
      <div class="card-right">
        <svg t="1709953427820" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2343" width="200" height="200">
          <path
            d="M907.295576 1023.702463H192.283184A107.636274 107.636274 0 0 1 76.958605 908.377883V723.858556a38.441526 38.441526 0 0 1 38.441526-38.441526 38.441526 38.441526 0 0 1 38.441526 38.441526v184.519327c0 23.064916 0 38.441526 38.441527 38.441527h715.012392a38.441526 38.441526 0 0 1 0 76.883053z"
            fill="#ffffff" p-id="2344"></path>
          <path
            d="M822.724218 893.001273H115.400131a38.441526 38.441526 0 0 1-38.441526-38.441527V116.482438A115.324579 115.324579 0 0 1 192.283184 1.157859h630.441034a107.636274 107.636274 0 0 1 123.012884 115.324579v661.194255a123.012885 123.012885 0 0 1-123.012884 115.32458z m-668.882561-76.883053h668.882561c15.376611 0 46.129832-7.688305 46.129832-38.441527V116.482438c0-30.753221-15.376611-38.441526-46.129832-38.441526H192.283184a38.441526 38.441526 0 0 0-38.441527 38.441526z"
            fill="#ffffff" p-id="2345"></path>
          <path
            d="M392.179121 708.481946h-30.753221a69.194748 69.194748 0 0 1-30.753221-61.506443L353.737595 539.339229l-76.883053-76.883053a61.506442 61.506442 0 0 1-15.37661-61.506442 61.506442 61.506442 0 0 1 53.818137-38.441527l99.947968-15.37661 46.129832-99.947969a61.506442 61.506442 0 0 1 107.636274 0L615.139975 339.443292l99.947969 15.37661a61.506442 61.506442 0 0 1 38.441526 38.441527 61.506442 61.506442 0 0 1-7.688305 61.506442l-76.883053 76.883053 15.376611 107.636274a61.506442 61.506442 0 0 1-23.064916 61.506442 61.506442 61.506442 0 0 1-61.506443 0l-92.259663-46.129831-84.571358 46.129831z m123.012885-61.506443zM384.490816 631.598893z m123.012885-53.818137h23.064916l76.883053 38.441526-15.376611-76.883053a61.506442 61.506442 0 0 1 15.376611-53.818137l61.506442-61.506442H584.386754c-7.688305-7.688305-30.753221-15.376611-38.441527-38.441527l-30.753221-76.883053-38.441526 69.194748c-15.376611 23.064916-30.753221 38.441526-46.129832 38.441527h-76.883053l53.818137 61.506442a53.818137 53.818137 0 0 1 23.064916 46.129832L415.244037 616.222282l69.194748-30.753221z m-146.077801-30.753222zM615.139975 347.131597z m-192.207632-7.688305z m76.883053-61.506443z m30.753221 0z"
            fill="#ffffff" p-id="2346"></path>
        </svg>
      </div>
    </div>
    <div class="card">
      <div class="card-left">
        <div class="card-title">帖子数量</div>
        <div class="carddetail">
          <div class="card-number">{{ tiezinumber }}条</div>
          <!-- <div class="card-change">政策</div> -->
        </div>

      </div>
      <div class="card-right">
        <svg t="1709953511551" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="3368" width="200" height="200">
          <path
            d="M928 538.656h-128v-177.344l86.08-82.176a32 32 0 1 0-44.192-46.304L750.624 320H273.376L182.08 232.864a31.968 31.968 0 1 0-44.16 46.272L224 361.344v177.344H96a32 32 0 0 0 0 64h128V640c0 52.96 14.304 102.592 39.232 145.216L137.92 904.864a32 32 0 1 0 44.192 46.304l119.712-114.272a287.104 287.104 0 0 0 178.208 89.344V544a32 32 0 0 1 64 0v382.24a287.424 287.424 0 0 0 178.208-89.344l119.712 114.272a32.032 32.032 0 0 0 44.192-46.304l-125.344-119.648A287.04 287.04 0 0 0 800 640v-37.344h128a32 32 0 0 0 0-64z"
            p-id="3369" fill="#ffffff"></path>
          <path d="M672 240a160 160 0 0 0-320 0v21.344h320V240z" p-id="3370" fill="#ffffff"></path>
        </svg>
      </div>
    </div>
    <div class="card">
      <div class="card-left">
        <div class="card-title">海螺数量</div>
        <div class="carddetail">
          <div class="card-number">{{ hailuonumber }}个</div>
          <!-- <div class="card-change">+120</div> -->
        </div>

      </div>
      <div class="card-right">
        <svg t="1709953617804" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4376" width="200" height="200">
          <path
            d="M756.184615 346.584615l-74.830769 70.892308s0-283.569231-244.184615-378.092308c0 0-23.630769 259.938462-145.723077 354.461539s-370.215385 378.092308 122.092308 590.769231c0 0-244.184615-259.938462 74.830769-448.984616 0 0-23.630769 94.523077 98.461538 189.046154s0 259.938462 0 259.938462 586.830769-141.784615 169.353846-638.03077z"
            p-id="4377" fill="#ffffff"></path>
        </svg>
      </div>
    </div>

  </div>
  <div class="charts">
    <div id="chart1">
    </div>

    <div id="chart2">

    </div>
  </div>
</template>
<script lang="ts" setup>
import api from '../api/create'
import * as echarts from 'echarts';
import { ref, reactive, onMounted } from 'vue';
let childnumber = ref<number>();
let hailuonumber = ref<number>();
let tiezinumber = ref<number>();
let hailuoxinq = reactive<any>({});
let moodArray1 = reactive<any>({});
let totalHailuo = reactive<any>({});
let moodArray2 = reactive<any>({});
let totalPosts = reactive<any>({});
interface HailuoNumber {
  mood: number;
  totalHailuo: number;
}
interface postsNumber {
  mood: number;
  totalPosts: number;
}
onMounted(() => {
  api.getalluser().then((res) => {

    childnumber.value = res.data.userNumber["儿童"];
  })
  api.getallhailuoNumber().then((res) => {

    hailuonumber.value = res.data.hailuoNumber;
  })
  api.getallpostNumber().then((res) => {

    tiezinumber.value = res.data.postNumber;
  })
  api.getmoodPostHailuoNumber().then((res) => {
    console.log(res);
    hailuoxinq = res.data.hailuoNumber
    moodArray1 = hailuoxinq.map((item: HailuoNumber) => "心情" + item.mood);
    totalHailuo = hailuoxinq.map((item: HailuoNumber) => item.totalHailuo);
    moodArray2 = res.data.postsNumber.map((item: postsNumber) => "心情" + item.mood);
    totalPosts = res.data.postsNumber.map((item: postsNumber) => item.totalPosts);
    console.log(totalPosts);
    init();
  })

})
// 获取图表容器
function init() {
  // 基于准备好的dom，初始化echarts实例
  let Chart = echarts.init(document.getElementById("chart1"));
  // 绘制图表
  let options = {
    title: {
      text: "不同心情的人发送的海螺",
    },
    tooltip: {},
    xAxis: {
      data: moodArray1,
      axisLabel: {
        rotate: 45, // 将标签逆时针旋转 45 度
        interval: 0, // 设置所有标签都显示
        showMinLabel: true, // 显示第一个标签
        showMaxLabel: true // 显示最后一个标签
      }
    },
    yAxis: {},
    series: [
      {
        name: "访问量",
        type: "bar",
        data: totalHailuo,
      },
    ],
  };

  // 渲染图表
  Chart.setOption(options);
  // 基于准备好的dom，初始化echarts实例
  Chart = echarts.init(document.getElementById("chart2"));
  // 绘制图表
  options = {
    title: {
      text: "访问人数",
    },
    tooltip: {},
    xAxis: {
      data: moodArray2,
      axisLabel: {
        rotate: 45, // 将标签逆时针旋转 45 度
        interval: 0, // 设置所有标签都显示
        showMinLabel: true, // 显示第一个标签
        showMaxLabel: true // 显示最后一个标签
      }
    },
    yAxis: {},
    series: [
      {
        name: "访问量",
        type: "bar",
        data: totalPosts,
      },
    ],
  };

  // 渲染图表
  Chart.setOption(options);
}


</script>
<style scoped>
.cards {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 1rem 1rem 0.8rem 1rem;
  min-width: 230px;
}

.card-title {
  color: #7f7f7f;
  font-weight: 700;
  display: flex;
}

.card-left {
  display: flex;
  flex-direction: column;
}

.carddetail {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
}

.card-right {
  background: #1890ff;
  height: 45px;
  width: 45px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-right .icon {
  height: 60%;
  width: 60%;
}

.card-number {
  font-weight: 900;
  font-size: 20px;
}

.card-change {
  font-weight: 900;
  font-size: 15px;
  color: #52c41a;
}

.charts {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

#chart1 {
  width: 45%;
  height: 400px;
}

#chart2 {
  width: 55%;
  height: 400px;
}
</style>