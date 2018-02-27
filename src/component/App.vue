<template>
    <div>
        <h2>{{msg}}</h2>
        <el-carousel :interval="2000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
            </el-carousel-item>
        </el-carousel>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: "vue脚手架测试"
            }
        }
    }
</script>

<style scoped>
    h2 {
        text-align: center;
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>