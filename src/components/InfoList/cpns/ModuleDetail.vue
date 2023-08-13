<template>
    <div class="detail">
        <div class="title">

        </div>
        <div class="desc">

        </div>
        <div class="link">

        </div>

    </div>
</template>

<script lang='ts' setup>
import { IDetail } from '../type'
const detail: IDetail = {
    title: 'vue@3.3.4',
    desc: 'The progressive JavaScript framework for building modern web UI.',
    link: ['npm', 'GitHubopen','package.json'],
}
console.log(detail)
</script>

<style lang='scss' scoped>

</style>